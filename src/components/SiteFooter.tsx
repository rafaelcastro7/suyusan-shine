import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-[var(--gradient-soft)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" width={88} height={88} className="h-20 w-auto object-contain" />
            <div className="font-display font-bold text-xl text-brand-green-deep">Suyusan Solutions Inc.</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Professional residential and commercial cleaning services across Canada.
            Insured, bonded and committed to a spotless, healthier space.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 grid place-items-center transition" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-primary" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 grid place-items-center transition" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> (416) 555-0123</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /><span>info@suyusansolutions.ca</span></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Greater Toronto Area, ON</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <div>© {new Date().getFullYear()} Suyusan Solutions Inc. All rights reserved.</div>
          <div>Insured & Bonded · Serving Canada</div>
        </div>
      </div>
    </footer>
  );
}
