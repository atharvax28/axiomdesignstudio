"use client";

import { motion } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";

const clients = ["MAHINDRA", "JIO", "KIA"];

export default function TrustedBy() {
  return (
    <section className="py-[clamp(60px,8vw,100px)] border-y border-hairline bg-paper-2">
      <div className="max-w-[1360px] mx-auto px-5 md:px-14 flex flex-col items-center">
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="u-eyebrow font-[family-name:var(--font-ui)] text-stone mb-10 md:mb-14 text-center"
        >
          Trusted By
        </TextAnimate>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-[clamp(40px,7vw,100px)]">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="font-[family-name:var(--font-heading)] font-bold text-lg md:text-2xl text-muted tracking-wide uppercase transition-colors hover:text-signal"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
