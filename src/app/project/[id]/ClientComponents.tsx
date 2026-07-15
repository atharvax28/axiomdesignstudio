"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

type ImageMeta = { url: string; altText?: string; description?: string };

export function ScrollDot({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("w-3 h-3 md:w-4 md:h-4 rounded-full bg-signal shrink-0", className)}
      whileInView={{ scale: [0, 1] }}
      transition={{ duration: 0.5 }}
    />
  );
}

export function TransitionFrame({ image }: { image: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-paper-2">
      <ScrollDot className="absolute z-10" />
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute top-0 right-0 w-2/3 md:w-1/3 h-[120%] opacity-50 origin-top-right"
      >
        <Image src={image} alt="Transition" fill sizes="(max-width: 768px) 66vw, 33vw" className="object-cover" />
      </motion.div>
    </section>
  );
}

export function ProjectGallery({ photos, imageMetadata, galleryLabels }: { photos: string[], imageMetadata: ImageMeta[], galleryLabels: string[] }) {
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxType, setLightboxType] = useState<"photo" | null>(null);

  const lightboxItems = photos;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setLightboxType(null);
      }
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % lightboxItems.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + lightboxItems.length) % lightboxItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, lightboxItems.length]);

  if (photos.length === 0) return null;

  return (
    <>
      <section className="w-full px-[18px] md:px-[44px] py-32">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-24 max-w-6xl mx-auto w-full md:w-[75%]">
          <ScrollDot className="mt-4 hidden md:block" />
          <div>
            <blockquote className="font-[family-name:var(--font-display)] italic text-[clamp(1.25rem,3vw,3rem)] leading-[1.15] font-light text-ink-strong mb-6">
              &ldquo;A closer look at the details.&rdquo;
            </blockquote>
            <p className="u-eyebrow text-stone">Project Gallery</p>
          </div>
        </div>

        <div className="w-full md:w-[75%] mx-auto flex flex-col gap-24">
          {photos.map((photo, i) => {
            const imgMeta = (imageMetadata as ImageMeta[]).find((m) => m.url === photo);
            const altText = imgMeta?.altText || `Project Detail ${i+1}`;
            const description = imgMeta?.description || "";

            return (
              <div key={`gallery-photo-${i}`} className="w-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 border-b border-hairline pb-4">
                  <span className="font-[family-name:var(--font-ui)] font-normal text-sm tracking-widest text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-ui)] font-normal text-sm md:text-base tracking-widest uppercase text-muted">
                    {galleryLabels[i % galleryLabels.length]}
                  </h3>
                </div>

                <div
                  className="relative w-full bg-paper-2 rounded-sm overflow-hidden group cursor-pointer"
                  tabIndex={0}
                  onClick={() => {
                    setLightboxType("photo");
                    setLightboxIndex(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxType("photo");
                      setLightboxIndex(i);
                    }
                  }}
                >
                  <Image
                    src={photo}
                    alt={altText}
                    width={1920}
                    height={1080}
                    className="w-full h-auto max-h-[85vh] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-ink-deep/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 flex items-center justify-center text-paper scale-90 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                {description && (
                  <p className="mt-6 font-light text-[clamp(1rem,1.4vw,1.2rem)] text-muted leading-relaxed max-w-4xl tracking-wide">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal (Apple Photos Style) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-paper/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => {
              setLightboxIndex(null);
              setLightboxType(null);
            }}
          >
            <button
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
                setLightboxType(null);
              }}
              aria-label="Close gallery"
              className="absolute top-6 right-6 md:top-10 md:right-10 text-muted hover:text-signal transition-colors z-50 p-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + lightboxItems.length) % lightboxItems.length); }}
              aria-label="Previous image"
              className="absolute left-4 md:left-10 text-stone hover:text-signal transition-colors z-50 p-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % lightboxItems.length); }}
              aria-label="Next image"
              className="absolute right-4 md:right-10 text-stone hover:text-signal transition-colors z-50 p-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="w-full h-full p-4 md:p-24 flex items-center justify-center select-none">
              <motion.img
                key={`${lightboxType}-${lightboxIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src={lightboxItems[lightboxIndex]}
                alt="Gallery View"
                className="max-w-full max-h-[75vh] object-contain drop-shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[family-name:var(--font-ui)] text-stone text-sm tracking-widest uppercase font-medium">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(lightboxItems.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
