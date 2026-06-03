import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      sessionStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // sessionStorage unavailable — ignore
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={mounted ? (isDark ? t("theme.toLight") : t("theme.toDark")) : t("theme.toggle")}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground/90 transition hover:bg-muted hover:text-foreground"
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
