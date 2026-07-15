"use client";

import { useReveal } from "@/lib/reveal";
import { team } from "@/data/team";
import TeamPortrait from "@/components/team/TeamPortrait";

export default function TeamShowcase() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 pt-[clamp(120px,15vw,180px)] pb-[clamp(90px,11vw,150px)]">
      <div ref={containerRef}>
        <p
          data-reveal
          className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-6"
        >
          The Collective
        </p>
        <h1
          data-reveal
          className="font-[family-name:var(--font-heading)] font-light text-[clamp(40px,6vw,80px)] leading-none text-ink-strong mb-6"
        >
          The people behind the{" "}
          <span className="font-[family-name:var(--font-display)] italic font-normal text-signal">
            work
          </span>
          .
        </h1>
        <p
          data-reveal
          className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-16 md:mb-24"
        >
          Axiom is a studio of designers and builders who stay with a project from the
          first brief to the final handover. The same people who draw it are the people
          accountable for it on site.
        </p>

        {/* One full-width profile per person, divided by hairlines. */}
        <div className="flex flex-col">
          {team.map((member) => (
            <article
              key={member.name}
              data-reveal
              className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-8 sm:gap-12 md:gap-16 items-start py-12 md:py-16 border-b border-hairline first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="w-full max-w-[280px] aspect-[3/4] rounded-md overflow-hidden bg-paper-3">
                <TeamPortrait member={member} />
              </div>

              <div className="flex flex-col">
                <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[34px] leading-tight text-ink-deep">
                  {member.name}
                </h2>
                <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mt-2 mb-6">
                  {member.role}
                </p>

                {/* Rendered only where the client has supplied the data. */}
                {(member.experience || member.specialty) && (
                  <p className="font-[family-name:var(--font-ui)] text-[15px] leading-[1.6] text-ink mb-5">
                    {member.experience}
                    {member.experience && member.specialty && <br />}
                    {member.specialty}
                  </p>
                )}

                <p className="text-[15px] md:text-base text-muted leading-[1.75] max-w-[70ch]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
