import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { team } from "@/data/site";

export function TeamSection() {
  return (
    <section className="bg-[color:var(--qc-bg-deep)] py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="Con người"
          title="Đội ngũ nhân sự"
          align="center"
          className="mx-auto mb-14"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <figure className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <blockquote className="text-lg leading-relaxed text-white/80">“{m.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-6">
                  <p className="font-[family-name:var(--font-display)] text-2xl text-white">{m.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[color:var(--qc-gold)]">{m.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
