import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudy from "./CaseStudy";

/**
 * Server shell for the case study. The page itself is a client component (it
 * runs a lightbox, parallax and scroll-linked motion), but the route around it
 * does not need to be: the portfolio is a fixed list, so every case study is
 * prerendered at build time rather than rendered per request, and each one gets
 * its own title, description and preview image.
 */

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }));
}

/** Anything outside the fixed list of projects is a 404, not a fallback render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return {};

  const title = `${project.title} — Axiom Design Studio`;
  const description =
    project.description ??
    `${project.category} interiors in ${project.location}${
      project.size ? `, ${project.size}` : ""
    }, designed and built by Axiom Design Studio.`;
  const preview = project.image ?? project.photos?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: preview ? [{ url: preview }] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) notFound();

  return <CaseStudy id={project.id} />;
}
