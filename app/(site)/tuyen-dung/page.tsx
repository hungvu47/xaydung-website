import type { Metadata } from "next";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { jobs } from "@/data/recruitment";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: `Cơ hội nghề nghiệp tại ${site.name} — kiến trúc, giám sát và vận hành.`,
  alternates: { canonical: "/tuyen-dung" },
};

export default function CareersPage() {
  return (
    <InnerMain>
      <PageHeader
        eyebrow="Con người"
        title="Gia nhập đội ngũ QT Concept"
        description="Chúng tôi đang tìm kiếm những cá nhân yêu thích chất lượng, kỷ luật và sự tinh tế trong từng chi tiết."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tuyển dụng" },
        ]}
      />
      <Container className="space-y-8 py-16 lg:py-20">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="rounded-3xl border border-white/10 bg-[color:var(--qc-bg-elevated)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-white">{job.title}</h2>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  {job.location} · {job.type}
                </p>
                <p className="max-w-2xl text-sm leading-relaxed text-white/65">{job.description}</p>
              </div>
              <Button href="/lien-he" variant="ghost" className="shrink-0 px-6 py-3 text-xs uppercase tracking-[0.2em]">
                Ứng tuyển
              </Button>
            </div>
          </article>
        ))}
      </Container>
    </InnerMain>
  );
}
