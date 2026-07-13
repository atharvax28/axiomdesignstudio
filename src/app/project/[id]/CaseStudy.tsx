"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ZoomIn, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import imageMetadata from "@/data/imageMetadata.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ImageMeta = { url: string; altText?: string; description?: string };

// --------------------------------------------------------
// SHARED COMPONENTS
// --------------------------------------------------------

function ScrollDot({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("w-3 h-3 md:w-4 md:h-4 rounded-full bg-signal shrink-0", className)}
      whileInView={{ scale: [0, 1] }}
      transition={{ duration: 0.5 }}
    />
  );
}

// --------------------------------------------------------
// SECTION COMPONENTS
// --------------------------------------------------------

function Hero({ title, image }: { title: string, image: string }) {
  const titleParts = title.split(",");
  const main = titleParts[0].trim();
  const sub = titleParts.length > 1 ? titleParts[1].trim() : "";
  return (
    <section className="relative w-full h-screen overflow-hidden bg-paper">
      <div className="absolute inset-0">
        {/* LCP for the case study — never lazy, and it gets the full viewport. */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Legibility scrim: darkest toward the bottom, where the title sits, so
            the light type clears 4.5:1 over the photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/55 to-ink-deep/20" />
        {/* Page melt: the bottom edge dissolves into the cream page below. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="absolute top-[65%] left-[18px] md:left-[44px] w-full max-w-[90%] md:max-w-[70%] -translate-y-1/2">
        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(3.15rem,8.5vw,9rem)] leading-[0.95] font-light tracking-tight text-paper drop-shadow-[0_2px_16px_rgba(15,23,42,0.55)]">
          {main}
          {sub && (
            <>
              <br />
              <span className="font-[family-name:var(--font-display)] italic font-normal text-paper/75">
                {sub}
              </span>
            </>
          )}
        </h1>
      </div>
    </section>
  );
}

function SplitSection({
  image,
  imageAlign = "left",
  statementText,
  paragraphText,
  meta,
  fullBleedImage = false
}: {
  image: string;
  imageAlign?: "left" | "right";
  statementText?: string;
  paragraphText: string;
  meta?: { location: string; details?: string; category: string; style?: string };
  fullBleedImage?: boolean;
}) {
  const isLeft = imageAlign === "left";

  return (
    <section className="relative w-full text-ink">
      {statementText && (
        <div className="px-[18px] md:px-[44px] pt-32 pb-16 md:py-32">
          <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.75rem,4vw,4rem)] leading-[1.05] max-w-5xl tracking-tight text-ink-strong">
            {statementText}
          </h2>
        </div>
      )}

      <div className="flex flex-col md:flex-row relative w-full justify-between">
        <div className={cn(
          "w-full md:w-[40%] h-[50vh] md:h-screen md:sticky top-0 flex-shrink-0 overflow-hidden",
          isLeft ? "md:order-1" : "md:order-3"
        )}>
          <Image
            src={image}
            alt="Section visual"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-[10%] md:order-2 sticky top-0 h-screen">
          {!fullBleedImage && <ScrollDot />}
        </div>

        <div className={cn(
          "w-full md:w-[50%] flex flex-col justify-center min-h-[50vh] md:min-h-[150vh] py-16 md:py-0",
          isLeft ? "md:order-3 pr-[18px] md:pr-[44px]" : "md:order-1 pl-[18px] md:pl-[44px]"
        )}>
          <div className="flex items-start gap-6">
            {fullBleedImage && <ScrollDot className="mt-4 hidden md:block" />}
            <p className="text-[clamp(1.25rem,2.5vw,2.5rem)] leading-[1.3] font-light text-ink">
              {paragraphText}
            </p>
          </div>

          {meta && (
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-[1rem] leading-[1.6]">
              <div>
                <p className="u-eyebrow text-stone mb-3">Location / Area</p>
                <p className="text-ink">{meta.location}</p>
                {meta.details && <p className="text-muted">{meta.details}</p>}
              </div>
              <div>
                <p className="u-eyebrow text-stone mb-3">Category</p>
                <ul className="space-y-1">
                  <li className="text-ink">{meta.category}</li>
                  {meta.style && <li className="text-muted">{meta.style}</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TransitionFrame({ image }: { image: string }) {
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
        <Image
          src={image}
          alt="Transition"
          fill
          sizes="(max-width: 768px) 67vw, 33vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}

/**
 * Closes every case study by handing the reader the next one, so the journey
 * through the portfolio never dead-ends at the contact block. Wraps around from
 * the last project to the first.
 */
function NextProject({ project }: { project: Project }) {
  const preview = project.image ?? project.photos?.[0];
  const meta = [project.location, project.category, project.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="relative w-full border-t border-hairline bg-paper-3">
      <Link
        href={`/project/${project.id}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal"
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-14 py-[clamp(64px,8vw,110px)] flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          <div className="relative w-full md:w-[38%] aspect-[4/3] rounded-md overflow-hidden shrink-0 bg-paper">
            {preview && (
              <Image
                src={preview}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            )}
          </div>

          <div className="flex flex-col items-start">
            <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-5">
              Next Project
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(32px,4.6vw,64px)] leading-[1.05] text-ink-deep group-hover:text-signal transition-colors duration-300">
              {project.title}
            </h2>
            <p className="u-eyebrow font-[family-name:var(--font-ui)] text-stone mt-5">
              {meta}
            </p>
            <span className="inline-flex items-center gap-3 mt-9 font-[family-name:var(--font-ui)] font-medium text-[13px] leading-none tracking-[0.14em] uppercase text-ink group-hover:text-signal transition-colors">
              View case study
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

// --------------------------------------------------------
// MAIN PAGE EXPORT
// --------------------------------------------------------

export default function ProjectCaseStudy({ id }: { id: number }) {
  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex] ?? projects[0];

  // Follows the running order of the portfolio, wrapping past the last project
  // back to the first so the sequence has no end.
  const nextProject =
    projects[((currentIndex === -1 ? 0 : currentIndex) + 1) % projects.length];

  // Completely remove CAD drawings by filtering them out of the photos array
  // (Assuming CAD files use .wdp/.wmf or have 'cad' in their filename based on previous naming conventions)
  const isPhoto = (url: string) => !url.toLowerCase().includes('cad') && !url.toLowerCase().endsWith('.wdp') && !url.toLowerCase().endsWith('.wmf');

  const photos = (project.photos || []).filter(isPhoto);
  // We completely ignore project.drawings as per request

  const heroImage = photos.length > 0 ? photos[0] : "";

  // Determine layout images for the top editorial section
  const img1 = photos.length > 1 ? photos[1] : null;
  const img2 = photos.length > 2 ? photos[2] : null;
  const img3 = photos.length > 3 ? photos[3] : null;

  // Category-specific text generation to avoid inappropriate descriptions (e.g. "brand" for residential)
  const getParagraph1 = (category: string, title: string) => {
    const name = title.split(",")[0].trim();
    if (category === "Residential") {
      return `The design for ${name} focuses on creating a deeply personal and comfortable sanctuary, balancing bespoke aesthetics with everyday functionality.`;
    }
    if (category === "Hospitality") {
      return `The design for ${name} crafts an immersive and memorable guest experience, seamlessly integrating luxurious comfort with a strong spatial identity.`;
    }
    if (category === "Retail") {
      return `The design for ${name} translates the brand's vision into a compelling physical space, enhancing customer engagement and elevating the retail experience.`;
    }
    return `The design for ${name} acts as an architectural amplifier: creating a dynamic workspace that translates the brand's identity into a highly functional and inspiring environment.`;
  };

  const getParagraph2 = (category: string) => {
    if (category === "Residential") {
      return "Moving into the private spaces, the environment transitions seamlessly into a curated experience tailored to the residents' lifestyle.";
    }
    return "Moving deeper into the space, the environment transitions seamlessly into a curated experience, blending functional requirements with bespoke aesthetics.";
  };

  // Prefer the real fields over parsing the title. `venue` narrows the city where
  // the company profile names a building or complex.
  const projectLocation = [project.venue, project.location].filter(Boolean).join(", ");

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

  // Safe, abstract labels that apply to any interior/architectural shot without assuming the specific room type
  const galleryLabels = [
    "SPATIAL VIEW",
    "INTERIOR DETAIL",
    "PERSPECTIVE",
    "AMBIENCE",
    "MATERIALITY",
    "DESIGN ELEMENT",
    "VIEWPOINT",
    "COMPOSITION"
  ];

  return (
    <div className="relative w-full min-h-screen bg-paper text-ink font-[family-name:var(--font-body)] selection:bg-signal selection:text-paper">
      <Navbar />

      <main>
        {heroImage && <Hero title={project.title} image={heroImage} />}

        {img1 && (
          <SplitSection
            image={img1}
            imageAlign="left"
            statementText={`A signature execution in the ${project.category} sector.`}
            // The studio's own account of the project, where the company profile
            // gives one; otherwise the generated fallback.
            paragraphText={project.description ?? getParagraph1(project.category, project.title)}
            meta={{
              location: projectLocation,
              details: project.size,
              category: project.category,
              style: project.style,
            }}
          />
        )}

        {img2 && (
          <TransitionFrame image={img2} />
        )}

        {img3 && (
          <SplitSection
            image={img3}
            imageAlign="right"
            fullBleedImage={true}
            paragraphText={getParagraph2(project.category)}
          />
        )}

        {/* Project Gallery at 75% Full Capacity */}
        {photos.length > 0 && (
          <section className="w-full px-[18px] md:px-[44px] py-32">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-24 max-w-6xl mx-auto w-full md:w-[75%]">
              <ScrollDot className="mt-4 hidden md:block" />
              <div>
                <blockquote className="font-[family-name:var(--font-display)] italic text-[clamp(1.5rem,3vw,3rem)] leading-[1.15] font-light text-ink-strong mb-6">
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
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8 border-b border-hairline pb-4">
                      <span className="font-[family-name:var(--font-ui)] font-normal text-sm tracking-widest text-signal">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-[family-name:var(--font-ui)] font-normal text-sm md:text-base tracking-widest uppercase text-muted">
                        {galleryLabels[i % galleryLabels.length]}
                      </h3>
                    </div>

                    {/* Image with Hover Effect */}
                    <div
                      /* Fixed ratio rather than the image's natural height: the
                         photos vary from 3:2 to 4:5, and letting each one size
                         itself was shifting everything below it as they decoded. */
                      className="relative w-full aspect-[3/2] bg-paper-2 rounded-sm overflow-hidden group cursor-pointer"
                      onClick={() => {
                        setLightboxType("photo");
                        setLightboxIndex(i);
                      }}
                    >
                      <Image
                        src={photo}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 75vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-ink-deep/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-paper/15 backdrop-blur-md border border-paper/30 flex items-center justify-center text-paper scale-90 group-hover:scale-100 transition-transform duration-500">
                          <ZoomIn size={32} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    {/* Editorial Description below image */}
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
        )}

        {nextProject && nextProject.id !== project.id && (
          <NextProject project={nextProject} />
        )}
      </main>

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
              <motion.div
                key={`${lightboxType}-${lightboxIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full h-full max-h-[75vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxItems[lightboxIndex]}
                  alt="Gallery View"
                  fill
                  sizes="90vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Editorial Metadata Overlay Removed per user request */}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[family-name:var(--font-ui)] text-stone text-sm tracking-widest uppercase font-medium">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(lightboxItems.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
