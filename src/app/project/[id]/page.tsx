import Image from "next/image";
import { projects } from "@/data/projects";
import imageMetadata from "@/data/imageMetadata.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ScrollDot, TransitionFrame, ProjectGallery } from "./ClientComponents";

// Prerender every case study at build time. The project set is static, so each
// page becomes SSG — cached at the edge with near-zero TTFB, no per-request work.
export function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.id === Number(resolvedParams.id)) || projects[0];
  
  return {
    title: `${project.title} - Axiom Design Studio`,
    description: project.description || `View the stunning interior design and architecture details of ${project.title}.`,
    alternates: {
      canonical: `/project/${project.id}`,
    },
    openGraph: {
      title: `${project.title} - Axiom Design Studio`,
      description: project.description || `Explore ${project.title} by Axiom Design Studio.`,
      images: project.photos && project.photos.length > 0 ? [{ url: project.photos[0] }] : [],
      url: `https://axiomdesignstudio.in/project/${project.id}`,
    },
  };
}

// --------------------------------------------------------
// SECTION COMPONENTS
// --------------------------------------------------------

function Hero({ title, image }: { title: string, image: string }) {
  const titleParts = title.split(",");
  const main = titleParts[0].trim();
  const sub = titleParts.length > 1 ? titleParts[1].trim() : "";
  return (
    <section className="relative w-full h-screen overflow-hidden bg-paper">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/55 to-ink-deep/20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="absolute top-[65%] left-[18px] md:left-[44px] w-full max-w-[90%] md:max-w-[70%] -translate-y-1/2">
        <h1 className="font-[family-name:var(--font-heading)] text-[clamp(3.15rem,8.5vw,9rem)] leading-[0.95] font-light tracking-tight text-paper drop-shadow-[0_2px_16px_rgba(15,23,42,0.55)]">
          {main}
          {sub && (
            <>
              <br />
              <span className="font-[family-name:var(--font-display)] italic font-normal text-paper/75">
                {sub}
              </span>
            </>
          )}
        </h1>
      </div>
    </section>
  );
}

function SplitSection({
  image,
  imageAlign = "left",
  statementText,
  paragraphText,
  meta,
  fullBleedImage = false
}: {
  image: string;
  imageAlign?: "left" | "right";
  statementText?: string;
  paragraphText: string;
  meta?: { location: string; details?: string; category: string; style?: string };
  fullBleedImage?: boolean;
}) {
  const isLeft = imageAlign === "left";

  return (
    <section className="relative w-full text-ink">
      {statementText && (
        <div className="px-[18px] md:px-[44px] pt-32 pb-16 md:py-32">
          <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.75rem,4vw,4rem)] leading-[1.05] max-w-5xl tracking-tight text-ink-strong">
            {statementText}
          </h2>
        </div>
      )}

      <div className="flex flex-col md:flex-row relative w-full justify-between">
        <div className={cn(
          "relative w-full md:w-[40%] h-[50vh] md:h-screen md:sticky top-0 flex-shrink-0 overflow-hidden",
          isLeft ? "md:order-1" : "md:order-3"
        )}>
          <Image
            src={image}
            alt="Section visual"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-[10%] md:order-2 sticky top-0 h-screen">
          {!fullBleedImage && <ScrollDot />}
        </div>

        <div className={cn(
          "w-full md:w-[50%] flex flex-col justify-center min-h-[50vh] md:min-h-[150vh] py-16 md:py-0",
          isLeft ? "md:order-3 pr-[18px] md:pr-[44px]" : "md:order-1 pl-[18px] md:pl-[44px]"
        )}>
          <div className="flex items-start gap-6">
            {fullBleedImage && <ScrollDot className="mt-4 hidden md:block" />}
            <p className="text-[clamp(1.25rem,2.5vw,2.5rem)] leading-[1.3] font-light text-ink">
              {paragraphText}
            </p>
          </div>

          {meta && (
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-[1rem] leading-[1.6]">
              <div>
                <p className="u-eyebrow text-stone mb-3">Location / Area</p>
                <p className="text-ink">{meta.location}</p>
                {meta.details && <p className="text-muted">{meta.details}</p>}
              </div>
              <div>
                <p className="u-eyebrow text-stone mb-3">Category</p>
                <ul className="space-y-1">
                  <li className="text-ink">{meta.category}</li>
                  {meta.style && <li className="text-muted">{meta.style}</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------
// MAIN PAGE EXPORT
// --------------------------------------------------------

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.id === Number(resolvedParams.id)) || projects[0];

  const isPhoto = (url: string) => !url.toLowerCase().includes('cad') && !url.toLowerCase().endsWith('.wdp') && !url.toLowerCase().endsWith('.wmf');

  const photos = (project.photos || []).filter(isPhoto);

  const heroImage = photos.length > 0 ? photos[0] : "";
  const img1 = photos.length > 1 ? photos[1] : null;
  const img2 = photos.length > 2 ? photos[2] : null;
  const img3 = photos.length > 3 ? photos[3] : null;

  const getParagraph1 = (category: string, title: string) => {
    const name = title.split(",")[0].trim();
    if (category === "Residential") {
      return `The design for ${name} focuses on creating a deeply personal and comfortable sanctuary, balancing bespoke aesthetics with everyday functionality.`;
    }
    if (category === "Hospitality") {
      return `The design for ${name} crafts an immersive and memorable guest experience, seamlessly integrating luxurious comfort with a strong spatial identity.`;
    }
    if (category === "Retail") {
      return `The design for ${name} translates the brand's vision into a compelling physical space, enhancing customer engagement and elevating the retail experience.`;
    }
    return `The design for ${name} acts as an architectural amplifier: creating a dynamic workspace that translates the brand's identity into a highly functional and inspiring environment.`;
  };

  const getParagraph2 = (category: string) => {
    if (category === "Residential") {
      return "Moving into the private spaces, the environment transitions seamlessly into a curated experience tailored to the residents' lifestyle.";
    }
    return "Moving deeper into the space, the environment transitions seamlessly into a curated experience, blending functional requirements with bespoke aesthetics.";
  };

  const projectLocation = [project.venue, project.location].filter(Boolean).join(", ");

  const galleryLabels = [
    "SPATIAL VIEW",
    "INTERIOR DETAIL",
    "PERSPECTIVE",
    "AMBIENCE",
    "MATERIALITY",
    "DESIGN ELEMENT",
    "VIEWPOINT",
    "COMPOSITION"
  ];

  return (
    <div className="relative w-full min-h-screen bg-paper text-ink font-[family-name:var(--font-body)] selection:bg-signal selection:text-paper">
      <Navbar />

      <main>
        {heroImage && <Hero title={project.title} image={heroImage} />}

        {img1 && (
          <SplitSection
            image={img1}
            imageAlign="left"
            statementText={`A signature execution in the ${project.category} sector.`}
            paragraphText={project.description ?? getParagraph1(project.category, project.title)}
            meta={{
              location: projectLocation,
              details: project.size,
              category: project.category,
              style: project.style,
            }}
          />
        )}

        {img2 && (
          <TransitionFrame image={img2} />
        )}

        {img3 && (
          <SplitSection
            image={img3}
            imageAlign="right"
            fullBleedImage={true}
            paragraphText={getParagraph2(project.category)}
          />
        )}

        <ProjectGallery photos={photos} imageMetadata={imageMetadata} galleryLabels={galleryLabels} />

      </main>

      <Footer />
    </div>
  );
}
