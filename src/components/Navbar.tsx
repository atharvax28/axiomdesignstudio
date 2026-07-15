"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

interface NavbarProps {
  /**
   * Whether the bar starts transparent with light text. True for pages that open
   * on a full-bleed scrimmed photo (home, /about, /project/[id]); false for pages
   * that open on cream, where light-on-cream links would be invisible.
   */
  transparentAtTop?: boolean;
}

export default function Navbar({ transparentAtTop = true }: NavbarProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Solid cream bar once scrolled (or when the mobile menu is open); otherwise
  // transparent with light text while sitting over the dark hero image.
  const solid = isScrolled || isMenuOpen || !transparentAtTop;

  const navLinks = [
    { label: "Studio", href: "/#studio" },
    { label: "Work", href: "/projects" },
    { label: "Collective", href: "/collective" },
    { label: "About", href: "/about" }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const linkContainerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
          solid
            ? "bg-paper/90 backdrop-blur-md border-b border-hairline"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-14 h-[84px] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Axiom Design Studio — home"
            className="relative z-50 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            <Logo variant={solid ? "dark" : "light"} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-9 relative z-50">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-[family-name:var(--font-ui)] text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
                  solid
                    ? "text-muted hover:text-ink"
                    : "text-paper/80 hover:text-paper"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-ui)] text-[13px] tracking-[0.16em] uppercase font-medium px-6 py-3 rounded-sm bg-signal text-paper transition-colors duration-300 hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-deep"
            >
              Work With Us
            </Link>
          </div>

          {/* Bespoke Mobile Hamburger Button */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-end w-10 h-10 gap-[5px] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal rounded-sm"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("w-8 h-[1px] block", solid ? "bg-ink" : "bg-paper")}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("w-6 h-[1px] block", solid ? "bg-ink" : "bg-paper")}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6, width: "32px" } : { rotate: 0, y: 0, width: "24px" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("h-[1px] block", solid ? "bg-ink" : "bg-paper")}
            />
          </button>
        </div>
      </motion.nav>

      {/* Elegant Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-paper flex flex-col justify-center px-8 md:hidden"
          >
            <motion.div
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-6"
            >
              {navLinks.map((item) => (
                <motion.div key={item.label} variants={linkVariants} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-4xl sm:text-5xl font-[family-name:var(--font-heading)] tracking-tight text-ink hover:text-signal transition-colors duration-300 py-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="overflow-hidden pt-2">
                <Link
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] text-[14px] leading-none tracking-[0.14em] uppercase font-medium px-8 py-4 rounded-sm bg-signal text-paper transition-colors duration-300 hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-deep"
                >
                  Work With Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Menu Footer */}
            <motion.div
              variants={linkVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-10 left-8 right-8 flex justify-between items-end border-t border-hairline pt-6"
            >
              <div className="flex flex-col gap-1">
                <span className="u-eyebrow text-stone">Location</span>
                <span className="text-sm text-muted font-[family-name:var(--font-ui)]">Mumbai, India</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="u-eyebrow text-stone">Socials</span>
                <a href="https://www.instagram.com/axiom_designstudio" target="_blank" rel="noopener noreferrer" className="text-sm text-muted font-[family-name:var(--font-ui)] hover:text-signal transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/company/axiom-design-studio" target="_blank" rel="noopener noreferrer" className="text-sm text-muted font-[family-name:var(--font-ui)] hover:text-signal transition-colors">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
