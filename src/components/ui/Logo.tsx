// TODO: replace wordmark with client's official Axiom logo SVG (#C00000).
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * "light" -> light/ivory text for placement over the dark hero image.
   * "dark"  -> ink text for placement on the cream paper background.
   */
  variant?: "light" | "dark";
};

export default function Logo({ className, variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <span
      aria-label="Axiom Design Studio"
      role="img"
      className={cn(
        "inline-flex items-center gap-2.5 leading-none select-none",
        isLight ? "text-paper" : "text-ink-deep",
        className
      )}
    >
      {/* #C00000 signature mark */}
      <svg
        aria-hidden="true"
        className="shrink-0 text-signal w-[10px] h-[10px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L22 20H2L12 2Z" />
      </svg>

      {/* The full name always reads "AXIOM DESIGN STUDIO"; "AXIOM" carries the
          weight, with the qualifier set small beneath it. */}
      <span aria-hidden="true" className="inline-flex flex-col items-start">
        <span className="font-[family-name:var(--font-heading)] font-semibold text-[clamp(15px,2.4vw,19px)] tracking-[0.16em]">
          AXIOM
        </span>
        <span
          className={cn(
            // Tracking tuned so "DESIGN STUDIO" sits at roughly the same optical
            // width as "AXIOM" above it.
            "font-[family-name:var(--font-ui)] font-medium text-[clamp(6px,0.8vw,7.5px)] tracking-[0.18em] mt-[4px]",
            isLight ? "text-paper/70" : "text-muted"
          )}
        >
          DESIGN STUDIO
        </span>
      </span>
    </span>
  );
}
