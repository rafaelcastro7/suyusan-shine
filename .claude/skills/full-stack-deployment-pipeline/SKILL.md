---
name: Full-Stack Deployment Pipeline
description: Complete production deployment system for FastAPI + React with Docker, PostgreSQL, and automated testing
type: skill
category: devops
difficulty: advanced
tags: [docker, deployment, fastapi, react, ci-cd, postgresql, nginx]
created: 2026-05-22
version: 1.0.0
---

# Full-Stack Deployment Pipeline

A comprehensive guide to deploying full-stack applications to production with automated testing, database migrations, health checks, and rollback capabilities.

## Architecture

```
Development (Local)
├── SQLite database
├── npm dev server (port 5173)
└── FastAPI dev server (port 8000)
         ↓
         ↓
Version Control (Git)
         ↓
         ↓
CI Pipeline (GitHub Actions)
├── Run tests
├── Type checking
├── Build Docker image
└── Push to registry
         ↓
         ↓
Production Server
├── Docker Compose services
│   ├── PostgreSQL (db)
│   ├── FastAPI (backend)
│   ├── Nginx (reverse proxy)
│   └── Optional: Ollama (AI)
├── Monitoring & Logs
└── Automated backups
```

## Key Components

### 1. Docker Setup

#### Dockerfile.prod (Multi-stage optimized)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client curl git \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn uvicorn[standard]

# Application
COPY . .

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["gunicorn", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:8000", "main_v3_02:app"]
```

#### docker-compose.prod.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: oceanwindow_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: always

  backend:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/oceanwindow_prod
      SECRET_KEY: ${SECRET_KEY}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ../oceanwindow-frontend/dist:/var/www/html:ro
    depends_on:
      - backend
    restart: always

volumes:
  postgres_data:
    driver: local
```

### 2. Deployment Scripts

#### Backend: deploy-prod.sh
```bash
#!/bin/bash

# 1. Pre-flight checks
if [ ! -f ".env.production" ]; then exit 1; fi

# 2. Build and start containers
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml down || true
docker-compose -f docker-compose.prod.yml up -d

# 3. Database migrations
docker-compose -f docker-compose.prod.yml exec -T backend \
    python -m alembic upgrade head

# 4. Health checks
sleep 5
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health)

if [ "$HEALTH" = "200" ]; then
    echo "✅ Deployment successful"
else
    echo "❌ Health check failed"
    exit 1
fi

# 5. Generate report
docker-compose -f docker-compose.prod.yml ps > deployment.log
curl -s http://localhost:8000/health >> deployment.log
```

#### Frontend: deploy-prod.sh
```bash
#!/bin/bash

# 1. Type checking
npx tsc --noEmit || exit 1

# 2. Build
npm run build || exit 1

# 3. Deploy (Cloudflare Pages / S3 / Nginx)
case "$1" in
    cloudflare)
        wrangler publish
        ;;
    s3)
        aws s3 sync dist/ s3://oceanwindow-prod --delete
        aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
        ;;
    nginx)
        sudo cp -r dist/* /var/www/oceanwindow
        sudo systemctl reload nginx
        ;;
esac
```

### 3. Database Management

#### Alembic Migration
```python
# alembic/env.py
from src.models.database import Base

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=Base.metadata,
        )
        
        with context.begin_transaction():
            context.run_migrations()
```

#### Migration Workflow
```bash
# Create migration (auto-detects changes)
python -m alembic revision --autogenerate -m "Add user roles table"

# Apply migrations
python -m alembic upgrade head

# Rollback to previous version
python -m alembic downgrade -1

# View migration history
python -m alembic history
```

### 4. Environment Configuration

#### .env.production
```
# Database (PostgreSQL)
DATABASE_URL=postgresql://user:pass@db:5432/oceanwindow_prod

# Security
SECRET_KEY=your-secure-32-character-key

# Email Service
SENDGRID_API_KEY=SG.xxx
FROM_EMAIL=hello@oceanwindow.com
FRONTEND_URL=https://oceanwindow.com

# Logging
LOG_LEVEL=INFO
```

#### .env.local (Frontend)
```
VITE_API_URL=https://api.oceanwindow.com
VITE_SENTRY_DSN=
```

### 5. Nginx Configuration

```nginx
upstream backend {
    server backend:8000;
}

server {
    listen 443 ssl http2;
    server_name oceanwindow.com www.oceanwindow.com;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    root /var/www/html;
    index index.html;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://backend/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name oceanwindow.com www.oceanwindow.com;
    return 301 https://$server_name$request_uri;
}
```

### 6. Health Checks & Monitoring

```python
@app.get("/health")
async def health(db: Session = Depends(get_db)):
    """Comprehensive health check endpoint."""
    try:
        # Database check
        db.execute("SELECT 1")
        
        # Cache check (if using Redis)
        redis_status = await check_redis()
        
        return {
            "status": "healthy",
            "database": "ok",
            "cache": "ok" if redis_status else "degraded",
            "timestamp": datetime.utcnow().isoformat(),
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat(),
        }, 503
```

### 7. Automated Backups

```bash
#!/bin/bash
# backup.sh - Automated PostgreSQL backup

BACKUP_DIR="/var/backups/oceanwindow"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/oceanwindow_$TIMESTAMP.backup"

# Create backup
pg_dump -h localhost -U oceanwindow_user oceanwindow_prod > "$BACKUP_FILE"

# Compress
gzip "$BACKUP_FILE"

# Upload to S3 (optional)
aws s3 cp "$BACKUP_FILE.gz" s3://oceanwindow-backups/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.backup.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

Add to crontab:
```bash
0 2 * * * /app/backup.sh  # Daily at 2 AM
```

### 8. Rollback Strategy

```bash
#!/bin/bash
# rollback.sh - Quick rollback to previous version

echo "Rolling back to previous deployment..."

# Stop current services
docker-compose -f docker-compose.prod.yml down

# Pull previous image
docker pull oceanwindow-backend:previous
docker tag oceanwindow-backend:previous oceanwindow-backend:latest

# Restore database from backup
LATEST_BACKUP=$(ls -t /var/backups/oceanwindow/*.backup.gz | head -1)
gunzip -c "$LATEST_BACKUP" | psql -U oceanwindow_user -d oceanwindow_prod

# Restart services
docker-compose -f docker-compose.prod.yml up -d

# Verify
sleep 5
curl http://localhost:8000/health

echo "✅ Rollback complete"
```

### 9. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd oceanwindow-backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd oceanwindow-backend
          pytest tests/ -v
      
      - name: Type checking
        run: |
          cd oceanwindow-frontend
          npx tsc --noEmit
      
      - name: Build frontend
        run: |
          cd oceanwindow-frontend
          npm install
          npm run build
      
      - name: Build Docker image
        run: |
          cd oceanwindow-backend
          docker build -t oceanwindow-backend:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          docker tag oceanwindow-backend:${{ github.sha }} oceanwindow-backend:latest
          docker push oceanwindow-backend:latest
      
      - name: Deploy
        run: ./scripts/deploy-prod.sh
```

### 10. Monitoring Dashboard

```python
@app.get("/metrics")
async def metrics():
    """Prometheus-compatible metrics endpoint."""
    return {
        "uptime_seconds": uptime,
        "api_requests_total": request_counter,
        "api_request_duration_seconds": avg_response_time,
        "database_connections": active_connections,
        "cache_hits": cache_hits,
        "cache_misses": cache_misses,
    }
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] TypeScript type checking: 0 errors
- [ ] No security vulnerabilities
- [ ] Database migrations reviewed
- [ ] Environment variables configured
- [ ] SSL certificate ready
- [ ] Backup verified

### Deployment Day
- [ ] Database backup taken
- [ ] Services started successfully
- [ ] Health checks passing
- [ ] API responding correctly
- [ ] Frontend loads
- [ ] Email verification working
- [ ] Monitoring active

### Post-Deployment
- [ ] Monitor error logs (24h)
- [ ] Check user metrics
- [ ] Verify email delivery
- [ ] Performance baseline established
- [ ] Rollback plan documented

## Performance Metrics

| Metric | Target | Tool |
|--------|--------|------|
| API Response Time (p99) | < 500ms | Datadog/New Relic |
| Error Rate | < 0.1% | Sentry |
| Database Query Time | < 50ms | pg_stat_statements |
| Container Memory Usage | < 500MB | Docker stats |
| Uptime | > 99.9% | Monitoring service |

## Disaster Recovery

| Scenario | RTO | Recovery Steps |
|----------|-----|-----------------|
| API crash | 1 min | Restart container, check logs |
| Database down | 5 min | Restore from backup |
| Disk full | 10 min | Cleanup old logs, extend volume |
| Complete failure | 30 min | Failover to standby server |

## Security Best Practices

✅ **Secrets Management**: Use `.env.production`, never commit secrets
✅ **SSL/TLS**: Always use HTTPS in production
✅ **Network**: Firewall rules, restrict database access
✅ **Backups**: Daily encrypted backups, tested recovery
✅ **Updates**: Regular OS and dependency updates
✅ **Monitoring**: Alert on anomalies
✅ **Logging**: Centralized logging with retention

## Files Included

```
oceanwindow-backend/
├── Dockerfile.prod
├── docker-compose.prod.yml
├── .env.production
├── deploy-prod.sh
└── backup.sh

oceanwindow-frontend/
├── deploy-prod.sh
└── .env.production

infrastructure/
├── nginx.conf
└── rollback.sh

.github/workflows/
└── deploy.yml
```

## Related Skills

- `/docker-infrastructure` - Advanced Docker patterns
- `/express-ts-fullstack` - Alternative backend
- `/tunnel-manager` - Cloudflare deployment
- `/quality-check` - Pre-deployment validation

## References

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [PostgreSQL Backup](https://www.postgresql.org/docs/current/backup.html)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Created**: 2026-05-22  
**Last Updated**: 2026-05-22  
**Status**: Production Ready ✅
