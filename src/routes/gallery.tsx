import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Suyusan Solutions Inc." },
      { name: "description", content: "View our professional cleaning work across residential, commercial, and senior care facilities." },
    ],
  }),
});

// 15 gallery images
const galleryImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/Galeria/${String(i + 1).padStart(2, '0')}.jpeg`,
  alt: `Professional cleaning service ${i + 1}`,
}));

function GalleryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedImage = selectedId ? galleryImages.find(img => img.id === selectedId) : null;

  const goPrev = useCallback(() => {
    setSelectedId((id) => (id === null ? null : id === 1 ? galleryImages.length : id - 1));
  }, []);
  const goNext = useCallback(() => {
    setSelectedId((id) => (id === null ? null : id === galleryImages.length ? 1 : id + 1));
  }, []);

  // Keyboard navigation: ← → Esc
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

      {/* Hero */}
      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Gallery</div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Our work speaks for itself
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              From sparkling kitchens to pristine office spaces, here's a glimpse of the transformation we bring to every project.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <FadeIn
              key={image.id}
              variant="fade-up"
              delay={index * 50}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border aspect-[4/3]"
              onClick={() => setSelectedId(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-xl"
            />
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-sm font-medium text-white">
              {`${selectedImage.id} / ${galleryImages.length}`}
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map(img => (
                <button
                  key={img.id}
                  onClick={() => setSelectedId(img.id)}
                  className={`h-2 rounded-full transition ${
                    img.id === selectedImage.id
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60 w-2'
                  }`}
                  aria-label={`View image ${img.id}`}
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
