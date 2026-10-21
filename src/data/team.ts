/**
 * The studio's people. Shared by /about (teaser grid) and /collective (full page)
 * so the same bios cannot drift apart between the two.
 */
export interface TeamMember {
  name: string;
  role: string;
  /**
   * `null` where the client has not yet supplied a portrait. Cards render a
   * typographic monogram rather than a stock avatar.
   */
  photo: string | null;
  bio: string;
  /**
   * Not yet supplied by the client — see IMPLEMENTATION.md, Phase 5b. Cards
   * render these only when present, so no placeholder text ships.
   */
  experience?: string;
  specialty?: string;
}

export const team: TeamMember[] = [
  {
    name: "Aruna Swamy",
    role: "Founder",
    photo: "/team/aruna.jpg",
    // Supplied by the client in the first person; rendered in the third to match
    // the other bios. NOTE: "18 years in the industry" and "the past 10 years
    // leading her own firm" both contradict the site's "Since 2006" claim.
    experience: "18+ Years",
    specialty: "Design Development & Execution",
    bio: "With over 18 years in the interior design industry, Aruna has delivered commercial, corporate, hospitality, and residential projects across their full arc — design development, space planning, project management, client coordination, and execution. For the past decade she has led her own studio, taking on end-to-end delivery, business operations, client relationships, and multidisciplinary teams. Her focus is on functional, innovative, and aesthetically refined spaces, delivered on time and within budget.",
  },
  {
    name: "Ameya Wani",
    role: "Design Director",
    photo: "/team/ameya.jpg",
    // From Ameya's CV: ~16 years, and a portfolio built almost entirely of
    // large-scale corporate offices. Those named projects (HSBC, Google, Citi,
    // Morgan Stanley…) were delivered at a previous firm and must NOT be
    // presented as Axiom's work.
    experience: "16+ Years",
    specialty: "Corporate & Workplace Interiors",
    bio: "Ameya leads the design team with an eye for precision and a deep understanding of how spatial decisions translate to human comfort. His background is in large-format corporate workplaces — space planning, detailed drawings for site execution, and coordination across consultants and services. He oversees creative direction across all studio projects: corporate, hospitality, and residential alike.",
  },
  {
    name: "PRANILL PAANCHHAL",
    role: "Head – Projects",  
    photo: "/team/pranil.webp",
    bio: "PRANILL oversees site execution with a hands-on approach. With deep technical knowledge of construction and finishing, he ensures that the design vision is faithfully translated into the built environment.",
  },
];

/** "Aruna Swamy" -> "AS". Used for the monogram when no portrait exists. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
