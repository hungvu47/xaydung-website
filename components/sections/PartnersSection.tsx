import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { partners } from "@/data/site";

export function PartnersSection() {
  return (
    <section className="border-y border-white/10 bg-[color:var(--qc-bg-elevated)] py-16 lg:py-20">
      <Container>
        <SectionTitle eyebrow="Đối tác" title="Đơn vị hợp tác" align="center" className="mx-auto mb-10" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {partners.map((p, i) => (
            <Reveal key={p} delay={i * 0.03}>
              <span className="inline-flex min-w-[140px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                {p}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
