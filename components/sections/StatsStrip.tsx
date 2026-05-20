import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/site";

export function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-[color:var(--qc-bg-elevated)]">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="text-center">
            <p className="text-4xl text-[color:var(--qc-gold)] sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
