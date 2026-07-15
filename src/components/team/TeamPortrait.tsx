"use client";

import { cn } from "@/lib/utils";
import { initials, type TeamMember } from "@/data/team";
import Image from "next/image";

/**
 * A member's portrait, or a typographic monogram where no photograph exists yet.
 * A monogram reads as deliberate; a stock avatar reads as an oversight.
 *
 * Portraits render in full colour at rest — no hover de-saturation.
 */
export default function TeamPortrait({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  if (!member.photo) {
    return (
      <div
        className={cn(
          "w-full h-full bg-paper-3 flex items-center justify-center",
          className
        )}
        aria-label={`${member.name} — portrait pending`}
        role="img"
      >
        <span className="font-[family-name:var(--font-heading)] font-light text-[clamp(30px,4vw,48px)] tracking-[0.14em] text-signal/60 select-none">
          {initials(member.name)}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        fill
        src={member.photo}
        alt={member.name}
        className="object-cover object-top"
      />
    </div>
  );
}
