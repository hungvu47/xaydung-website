import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/data/articles";
import { categoryLabels } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--qc-bg-elevated)]">
      <Link href={`/tin/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/85 backdrop-blur-md">
          {categoryLabels[article.category]}
        </div>
      </Link>
      <div className="space-y-3 p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          {article.date} · {article.readTime}
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl text-white transition group-hover:text-[color:var(--qc-gold)]">
          <Link href={`/tin/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="line-clamp-3 text-sm text-white/60">{article.excerpt}</p>
        <Link
          href={`/tin/${article.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--qc-gold)]"
        >
          Đọc tiếp
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
