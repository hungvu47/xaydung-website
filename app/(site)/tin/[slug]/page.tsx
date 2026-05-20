import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { categoryLabels, getArticleBySlug, articles } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Không tìm thấy" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/tin/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <InnerMain>
      <PageHeader
        eyebrow={categoryLabels[article.category]}
        title={article.title}
        description={`${article.date} · ${article.readTime}`}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tạp chí", href: "/tin-hoat-dong" },
          { label: article.title },
        ]}
      />
      {/* <Container className="py-12 lg:py-16">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-white/10">
          <Image src={article.cover} alt={article.title} fill className="object-cover" priority sizes="100vw" />
        </div>
        <article className="mx-auto mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-white/70 sm:text-base">
          {article.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </article>
        <div className="mx-auto mt-12 max-w-3xl border-t border-white/10 pt-8">
          <Link href="/tin-hoat-dong" className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)] hover:text-white">
            ← Quay lại danh sách
          </Link>
        </div>
      </Container> */}
      <Container className="py-12 lg:py-16">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <article className="mx-auto mt-12 max-w-7xl space-y-8 text-lg leading-9 text-white/90">
          {article.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </article>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 text-white pt-8">
          <Link
            href="/tin-hoat-dong"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)] hover:text-white"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </Container>
    </InnerMain>
  );
}
