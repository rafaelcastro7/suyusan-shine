import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Suyusan Solutions" },
      { name: "description", content: "Photos of our cleaning work across homes, offices and retirement residences in the GTA." },
      { property: "og:title", content: "Gallery — Suyusan Solutions" },
      { property: "og:description", content: "Photos of our residential, commercial and senior-care cleaning work." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/gallery" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/gallery" },
    ],
  }),
});

const galleryIds = Array.from({ length: 15 }, (_, i) => i + 1);

function GalleryPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.gallery.title", "meta.gallery.description");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const total = galleryIds.length;
  const selected = selectedId ? { id: selectedId, src: `/Galeria/${String(selectedId).padStart(2, '0')}.jpeg` } : null;

  const goPrev = useCallback(() => {
    setSelectedId((id) => (id === null ? null : id === 1 ? total : id - 1));
  }, [total]);
  const goNext = useCallback(() => {
    setSelectedId((id) => (id === null ? null : id === total ? 1 : id + 1));
  }, [total]);

  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, goPrev, goNext]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("gallery.kicker")}</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">{t("gallery.title")}</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{t("gallery.lead")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryIds.map((id, index) => (
            <FadeIn
              key={id}
              variant="fade-up"
              delay={index * 50}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border aspect-[4/3]"
              onClick={() => setSelectedId(id)}
            >
              <img
                src={`/Galeria/${String(id).padStart(2, '0')}.jpeg`}
                alt={t("gallery.imageAlt", { n: id })}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </FadeIn>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.src} alt={t("gallery.imageAlt", { n: selected.id })} className="w-full h-auto rounded-xl" />
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label={t("common.close")}
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-sm font-medium text-white">
              {`${selected.id} / ${total}`}
            </div>

            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label={t("common.prev")}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label={t("common.next")}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryIds.map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  className={`h-2 rounded-full transition ${
                    id === selected.id
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60 w-2'
                  }`}
                  aria-label={t("gallery.imageAlt", { n: id })}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
