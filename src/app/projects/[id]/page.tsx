import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ProjectArticle } from "@/components/ProjectArticle";
import type { Project } from "@/components/ProjectModal";
import { StickyContact } from "@/components/StickyContact";
import { SubpageHeader } from "@/components/SubpageHeader";
import { getPublicProject, projectPath, publicProjects, relatedProjects } from "@/data/projects";

export const dynamicParams = false;

type Params = { params: Promise<{ id: string }> };

function caseTitle(project: Project) {
  if (project.category === "horeca") {
    return `${project.name} — мебель для ${project.kind?.toLowerCase() ?? "кафе"} в Краснодаре`;
  }
  if (project.category === "interior") {
    return `${project.name} — предмет мебели на заказ`;
  }
  return project.name;
}

function caseDescription(project: Project) {
  const text = [project.details?.lead, project.details?.brief].filter(Boolean).join(" ");
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}

export function generateStaticParams() {
  return publicProjects.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = getPublicProject(id);
  if (!project) return {};

  const title = caseTitle(project);
  const description = caseDescription(project);

  return {
    title,
    description,
    alternates: { canonical: projectPath(project) },
    openGraph: {
      type: "article",
      url: projectPath(project),
      title,
      description,
      images: [{ url: project.image, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const project = getPublicProject(id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background">
      <SubpageHeader source={`case_${project.id}`} />
      <ProjectArticle project={project} related={relatedProjects(project)} asPage />
      <Footer />
      <StickyContact />
    </main>
  );
}
