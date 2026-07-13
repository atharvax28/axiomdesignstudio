"use client";

import { motion } from "framer-motion";
import DecryptedText from "@/components/ui/DecryptedText";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <>
      <section id="contact" className="py-[clamp(90px,11vw,150px)] text-center">
        <div className="max-w-[1360px] mx-auto px-5 md:px-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[family-name:var(--font-heading)] font-light text-[clamp(40px,7vw,104px)] text-ink-strong"
          >
            Let&apos;s build{" "}
            <span className="italic text-signal inline-block font-[family-name:var(--font-display)]">
              <DecryptedText
                text="together."
                animateOn="view"
                revealDirection="center"
              />
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4 justify-center flex-wrap mt-11"
          >
            <a
              href="mailto:studio@axiomdesign.in"
              className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] font-medium text-[14px] leading-none tracking-[0.14em] uppercase px-8 py-4 rounded-sm cursor-pointer transition-colors duration-300 bg-signal text-paper hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-deep"
            >
              studio@axiomdesign.in
            </a>
            <a
              href="tel:+919820999296"
              className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] font-medium text-[14px] leading-none tracking-[0.14em] uppercase px-8 py-4 rounded-sm cursor-pointer transition-colors duration-300 bg-transparent border border-hairline text-ink hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              Call Us
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-paper-3">
        <div className="w-full py-16 px-5 md:px-14 flex flex-col md:flex-row justify-between items-start gap-12 max-w-[1360px] mx-auto">
          <div className="flex flex-col gap-6">
            <Logo variant="dark" />

            <div className="flex flex-col gap-2 font-[family-name:var(--font-ui)] text-[13px] md:text-sm text-muted">
              <span className="block max-w-[300px] leading-relaxed">Mumbai Studio: 51, Adityaraj Group, Vikhroli, Mumbai, Maharashtra</span>
              <span className="block mt-2">Contact: Aruna Swamy | Ameya Wani</span>
              <span className="flex gap-2">
                <a href="tel:+919820999296" className="hover:text-signal transition-colors">+91 98209-99296</a>
                <span className="text-stone">|</span>
                <a href="tel:+919870576945" className="hover:text-signal transition-colors">+91 98705-76945</a>
              </span>
              <a href="mailto:studio@axiomdesign.in" className="hover:text-signal transition-colors">studio@axiomdesign.in</a>
            </div>
          </div>

          <div className="flex flex-col font-[family-name:var(--font-ui)] text-xs md:text-[13px] text-stone mt-1 md:mt-2">
            <span>© {new Date().getFullYear()} Axiom Design Studio. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
