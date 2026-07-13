"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { Marquee } from "@/components/ui/marquee";
import { MorphingText } from "@/components/ui/morphing-text";
import { Highlighter } from "@/components/ui/highlighter";
import { SpinningText } from "@/components/ui/spinning-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import Navbar from "@/components/Navbar";
import TeamPortrait from "@/components/team/TeamPortrait";
import { yearsInPractice } from "@/data/studio";
import { team, type TeamMember } from "@/data/team";
import { cn } from "@/lib/utils";
import {
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  ArrowRight,
  DraftingCompass,
  Factory,
  BookOpen,
  Gauge,
  Handshake,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

// Best projects for the marquee gallery (largest/highest quality)
const galleryImages = [
  { src: "/projects/project-10/photo-6.jpg",  label: "Mahindra Meridian – Club House (Alibaug)" },
  { src: "/projects/project-14/photo-1.png",  label: "Madanlal Chhaganlal Jewellers (Indore)" },
  { src: "/projects/project-18/photo-1.JPG",  label: "Mrs. Nitasha Gaurav (Karjat)" },
  { src: "/projects/project-5/photo-3.jpg",   label: "Mahindra Finance (Hyderabad)" },
  { src: "/projects/project-20/photo-1.png",  label: "Mr. Vishal Kampani (Prabhadevi)" },
  { src: "/projects/project-16/photo-2.jpg",  label: "Mahindra Meridian – Show Flat (Alibaug)" },
  { src: "/projects/project-9/photo-6.jpg",   label: "Vihang Club House (Thane West)" },
  { src: "/projects/project-1/photo-2.jpg",   label: "Mahindra Finance (Hyderabad)" },
  { src: "/projects/project-8/photo-1.jpg",   label: "IDFC Bank (Airoli)" },
  { src: "/projects/project-17/photo-3.jpg",  label: "Mr. Rishikesh Shah (Parel)" },
];

const morphWords = [
  "Design",
  "Execute",
  "Deliver",
  "Craft",
  "Build",
  "Create",
];

const reviews = [
  {
    name: "Mahindra Meridian",
    username: "@alibaug",
    body: "Axiom Design Studio captured our vision perfectly. The attention to detail is stunning.",
  },
  {
    name: "Vihang Club House",
    username: "@thane",
    body: "The execution team was incredibly professional. Handover was flawless.",
  },
  {
    name: "IDFC Bank",
    username: "@airoli",
    body: "They delivered the corporate space exactly on schedule without a single compromise.",
  },
  {
    name: "Axis Asset Mgmt",
    username: "@pune",
    body: "Our new office space has transformed the way we work. Exceptional craftsmanship.",
  },
  {
    name: "Jio Credit Ltd.",
    username: "@bangalore",
    body: "Axiom's in-house team is phenomenal. Everything fits together perfectly.",
  },
  {
    name: "Kohar By Kanika",
    username: "@retail",
    body: "Our boutique has never looked better. The aesthetic is incredibly premium.",
  },
  {
    name: "Mrs. Nitasha Gaurav",
    username: "@karjat",
    body: "Our residential project was handled with immense care and precision.",
  },
  {
    name: "Mr. Vishal Kampani",
    username: "@prabhadevi",
    body: "A truly luxurious finish. We recommend Axiom to anyone looking for perfection.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function GalleryCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative w-[320px] h-[220px] mx-3 rounded-md overflow-hidden flex-shrink-0 group">
      <Image
        src={src}
        alt={label}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 md:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400" />
      <span className="absolute bottom-3 left-4 text-paper text-xs tracking-widest uppercase opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 font-[family-name:var(--font-ui)]">
        {label}
      </span>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-4 p-8 border border-hairline rounded-md bg-paper-2 hover:-translate-y-1 transition-transform duration-300"
    >
      <Icon size={30} strokeWidth={1.5} className="text-signal" aria-hidden="true" />
      <h3 className="font-[family-name:var(--font-ui)] text-base tracking-wide uppercase text-ink-deep">
        {title}
      </h3>
      <p className="font-[family-name:var(--font-body)] text-sm text-muted leading-relaxed">{body}</p>
    </motion.div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <div className="w-full aspect-[3/4] rounded-md overflow-hidden bg-paper-3">
        <TeamPortrait member={member} />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <p className="font-[family-name:var(--font-ui)] text-base text-ink-deep font-medium">{member.name}</p>
        <p className="font-[family-name:var(--font-ui)] text-xs tracking-widest uppercase text-signal">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

/** Client initials, drawn in the brand's own type. Replaces the generated
 *  stand-in avatars these cards used to pull from avatar.vercel.sh — a
 *  third-party request on every load, for artwork that read as placeholder. */
const initialsOf = (name: string) =>
  name
    .replace(/^(Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const ReviewCard = ({
  name,
  username,
  body,
}: {
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-hairline bg-paper hover:bg-paper-3 transition-colors",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.06em]"
        >
          {initialsOf(name)}
        </span>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-ink-deep font-[family-name:var(--font-ui)]">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-stone font-[family-name:var(--font-ui)]">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-ink font-[family-name:var(--font-body)] leading-relaxed">{body}</blockquote>
    </figure>
  );
};

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Autoplay is only permitted while muted, so that is where every visitor
  // starts; the control below lets them opt into the soundtrack.
  const [isMuted, setIsMuted] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    // Unmuting a video that autoplayed muted needs an explicit nudge in Safari.
    if (!next) void video.play().catch(() => {});
    setIsMuted(next);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="relative w-full min-h-screen bg-paper text-ink font-[family-name:var(--font-body)]">

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-paper"
      >
        <motion.div ref={videoContainerRef} style={{ y: heroY }} className="absolute inset-0 group bg-ink-deep">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            // The poster paints on the first frame, so the section is never an
            // empty box while 18MB of video streams in behind it.
            poster="/hero/mahindra-poster.jpg"
            preload="metadata"
            src="/hero/mahindra.mp4"
            className={cn(
              "w-full h-full",
              // Cover crops the frame to fill the hero; in fullscreen the point
              // is to watch the film, so show all of it.
              isFullscreen ? "object-contain" : "object-cover"
            )}
          />

          {/* Legibility scrims. Both exist to hold the headline over the footage
              and melt the section into the page — neither has any purpose once
              the video is fullscreen, where they only dim the film. */}
          {!isFullscreen && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper pointer-events-none" />
            </>
          )}

          {/* Playback controls. Kept visible on touch, where there is no hover. */}
          <div className="absolute top-24 right-6 md:top-32 md:right-10 z-50 flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleMuted}
              className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-[10%] left-[18px] md:left-[44px]"
        >
          <p className="u-eyebrow font-[family-name:var(--font-ui)] text-paper/80 mb-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Axiom Design Studio
          </p>
          <div className="flex items-center gap-10">
            <h1 className="font-[family-name:var(--font-heading)] font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-paper drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
              About Us
            </h1>
            <SpinningText
              className="text-paper uppercase tracking-widest font-[family-name:var(--font-ui)] font-medium text-xs hidden md:block"
              radius={3.5}
            >
              Mumbai • India • Since 2016 •
            </SpinningText>
          </div>
        </motion.div>
      </section>

      {/* ── STUDIO STORY ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 py-[clamp(80px,10vw,140px)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-[family-name:var(--font-heading)] font-light text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tight text-ink-deep"
            >
              <Highlighter color="rgba(192,0,0,0.16)" action="highlight" padding={4}>A Legacy</Highlighter> of<br />Built Excellence.
            </motion.h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6 justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-[family-name:var(--font-body)] text-[clamp(1.1rem,2vw,1.4rem)] text-ink leading-relaxed"
            >
              For over <NumberTicker value={yearsInPractice()} className="text-signal font-medium" /> years, Axiom Design Studio has operated at the intersection of architectural vision and meticulous execution. We are not just designers — we are custodians of the design intent, from the first sketch to the final handover.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="font-[family-name:var(--font-body)] text-sm text-muted leading-relaxed"
            >
              Our work spans corporate headquarters, hospitality destinations, flagship retail spaces, and personal residences — all bound by the same commitment to craft. We design and we implement. Every surface, every joint, every detail is handled in-house, ensuring that no layer of translation exists between the design intent and what gets built.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="font-[family-name:var(--font-body)] text-sm text-muted leading-relaxed"
            >
              Our foundation rests almost entirely on a word-of-mouth client base — a testament to the trust we&apos;ve built among India&apos;s leading corporations, hospitality groups, and discerning homeowners. Since 2016, that trust has defined how we work.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MORPHING HEADLINE ─────────────────────────────────────────────── */}
      <section className="w-full py-20 flex flex-col items-center justify-center border-y border-hairline overflow-hidden">
        <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-6">
          What we do
        </p>
        <div className="flex flex-col items-center justify-center px-5 text-center gap-0">
          <span className="font-[family-name:var(--font-heading)] font-light text-[50px] md:text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight text-ink-deep">
            We
          </span>
          {/* signal-deep rather than signal: the words crossfade through partial
              opacity, and the lighter red dropped to 2.6:1 against the cream at
              the midpoint of every transition. */}
          <MorphingText
            className="font-[family-name:var(--font-heading)] font-medium text-[60px] md:text-[clamp(4rem,8vw,6.5rem)] leading-none tracking-tight text-signal-deep !w-full !h-[80px] md:!h-[130px] my-1"
            texts={morphWords}
          />
          <span className="font-[family-name:var(--font-heading)] font-light text-[50px] md:text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight text-ink-deep">
            Spaces.
          </span>
        </div>
      </section>

      {/* ── GALLERY MARQUEE ───────────────────────────────────────────────── */}
      <section className="w-full py-20 overflow-hidden">
        <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-10 px-5 md:px-14 max-w-[1360px] mx-auto">
          Selected Work
        </p>
        <Marquee pauseOnHover className="[--duration:40s]">
          {galleryImages.map((img, i) => (
            <GalleryCard key={i} src={img.src} label={img.label} />
          ))}
        </Marquee>
      </section>

      {/* ── SCROLL VELOCITY TEXT ──────────────────────────────────────────── */}
      <div className="py-10 border-y border-hairline overflow-hidden">
        <ScrollVelocityRow
          className="font-[family-name:var(--font-heading)] font-medium text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-stone uppercase"
          baseVelocity={3}
        >
          Axiom Design Studio — Design. Execute. Deliver. —
        </ScrollVelocityRow>
      </div>

      {/* ── VALUES GRID ───────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 py-[clamp(80px,10vw,140px)]">
        <div className="mb-16">
          <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-4">
            Our Principles
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight text-ink-deep">
            What guides every project.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ValueCard
            icon={DraftingCompass}
            title="Design Integrity"
            body="The design intent is sacred. From concept to completion, every decision is made in service of the original vision — not budget shortcuts or supply-chain convenience."
          />
          <ValueCard
            icon={Factory}
            title="In-House Execution"
            body="We design and build. Our in-house execution team means zero translation loss between the design drawing and the finished surface."
          />
          <ValueCard
            icon={BookOpen}
            title="Technical Depth"
            body="Deep expertise in materials, construction systems, and finishing — accumulated over hundreds of projects across every typology."
          />
          <ValueCard
            icon={Gauge}
            title="Delivery Discipline"
            body="Streamlined project management and a coordinated workforce ensure deadlines are honoured and handovers are clean."
          />
          <ValueCard
            icon={Handshake}
            title="Client Trust"
            body="Our business is almost entirely referral-based. That trust is our most valued asset, and we protect it on every project."
          />
          <ValueCard
            icon={BadgeCheck}
            title="No Compromise"
            body="We don't cut corners. We don't substitute materials. We don't approximate. The standard is the standard."
          />
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 py-[clamp(80px,10vw,140px)] border-t border-hairline">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Link href="/collective" className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">
            <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-4">
              The Team
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight text-ink-deep group-hover:text-signal transition-colors">
              The people behind the work.
            </h2>
          </Link>
          <Link
            href="/collective"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-ui)] font-medium text-[13px] leading-none tracking-[0.14em] uppercase text-ink hover:text-signal transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            Meet the collective <span aria-hidden="true">→</span>
          </Link>
        </div>
        {/* Teaser: portraits and roles only. The bios live on /collective. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* ── PROJECT MARQUEE (Testimonials) ───────────────────────────────── */}
      <section className="w-full py-20 border-t border-hairline bg-paper-2 flex flex-col items-center">
        <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-10 px-5 md:px-14 w-full max-w-[1360px] mx-auto">
          Projects We&apos;re Proud Of
        </p>

        <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s] mb-4">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>

          {/* Gradients for fading effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-paper-2 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-paper-2 to-transparent"></div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 py-[clamp(80px,10vw,140px)] border-t border-hairline">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-4">
              Start a Conversation
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.8rem,3.5vw,3.5rem)] leading-tight tracking-tight text-ink-deep max-w-xl">
              Have a space in mind? Let&apos;s talk.
            </h2>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-signal text-signal font-[family-name:var(--font-ui)] text-sm tracking-widest uppercase rounded hover:bg-signal hover:text-paper transition-all duration-300"
          >
            Get in Touch
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
