import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { articles, categoryLabels } from "@/data/articles";

export function PressSection() {
  const items = articles.slice(0, 4);
  return (
    <section className="bg-[color:var(--qc-bg-deep)] py-20 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Báo chí & chia sẻ" title="Cập nhật mới nhất" />
          <Link
            href="/tin-hoat-dong"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)] hover:text-white"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--qc-bg-elevated)]">
                <Link href={`/tin/${a.slug}`} className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.cover}
                    alt={a.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/85 backdrop-blur-md">
                    {categoryLabels[a.category]}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {a.date} · {a.readTime}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-white transition group-hover:text-[color:var(--qc-gold)]">
                    <Link href={`/tin/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm text-white/60">{a.excerpt}</p>
                  <Link
                    href={`/tin/${a.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--qc-gold)]"
                  >
                    Đọc tiếp
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
