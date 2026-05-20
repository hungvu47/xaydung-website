import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import clientPromise from "@/lib/mongodb";
import { Project, PROJECT_TYPE_LABELS } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("maunha_db");

  const raw = await db.collection("projects").findOne({ slug });
  if (!raw) notFound();

  const { _id, ...project } = raw as any;

  return {
    title: project.title,
    description: project.excerpt,
    alternates: { canonical: `/du-an/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("maunha_db");

  const project = await db.collection("projects").findOne({ slug });

  if (!project) notFound();

  const rawRelated = await db
    .collection("projects")
    .find({ slug: { $ne: slug } })
    .limit(3)
    .toArray();

  const related = rawRelated.map(({ _id, ...rest }) => rest as any);

  return (
    <InnerMain>
      <PageHeader
        eyebrow="Dự án"
        title={project.title}
        description={`${project.location} · ${project.year}`}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Dự án", href: "/du-an" },
          { label: project.title },
        ]}
      />
      <Container className="py-12 lg:py-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="mt-4 mb-6 flex flex-wrap gap-2">
              {project.categories.map((c: string) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/75"
                >
                  {c}
                </span>
              ))}
              <span className="rounded-full border border-[color:var(--qc-gold)]/40 bg-[color:var(--qc-gold)]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--qc-gold)]">
                {PROJECT_TYPE_LABELS[project.type as keyof typeof PROJECT_TYPE_LABELS]}
              </span>
            </div>

            <ProjectGallery
              images={project.images?.length ? project.images : [project.image]}
              title={project.title}
            />
          </div>

          <aside className="mt-10 space-y-6 text-sm leading-relaxed text-white/70 sm:text-base lg:-ml-8">
            <div className="mt-10 space-y-10">
              <article className="space-y-6 text-sm leading-relaxed text-white/70 sm:text-base">
                {project.body.map((p: string) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </article>
              <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)]">
                    Hạng mục
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {project.scope.map((s: string) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/lien-he"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--qc-gold)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--qc-bg-deep)] transition hover:bg-[color:var(--qc-gold-deep)]"
                >
                  Tư vấn dự án tương tự
                </Link>
                <p className="text-xs text-white/45">
                  Hotline:{" "}
                  <a className="text-white hover:underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                </p>
              </aside>
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">Dự án liên quan</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </InnerMain>
  );
}
