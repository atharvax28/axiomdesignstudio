/**
 * Canonical studio facts. Anything stated in more than one place on the site
 * should live here, so the copy can't drift out of step with itself.
 */

/**
 * The year Aruna founded the studio.
 *
 * The site previously claimed "Since 2006". That was wrong: Aruna's own bio puts
 * her at 18 years in the industry and "the past 10 years" leading her own firm,
 * which dates the studio to ~2016. Corrected on the client's confirmation.
 *
 * Aruna's personal experience (18+ years) is a separate figure and lives on her
 * team card, not here.
 */
export const FOUNDING_YEAR = 2016;

/**
 * Years in practice, derived rather than hard-coded. Both `Stats` and `/about`
 * used to carry their own hand-written figures ("15+" and 18), which disagreed.
 */
export function yearsInPractice(): number {
  return new Date().getFullYear() - FOUNDING_YEAR;
}
