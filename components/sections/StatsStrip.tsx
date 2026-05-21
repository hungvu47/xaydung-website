import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/site";

export function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-[color:var(--qc-bg-elevated)]">
      <Container className="py-10">
        <div className="flex flex-wrap justify-between gap-y-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="w-1/2 px-7 py-4 text-center lg:w-1/4"
            >
              <Reveal
                delay={i * 0.05}
                className="text-center"
              >
                <p className="text-4xl text-[color:var(--qc-gold)]">
                  {s.value}
                </p>

                <p className="mt-2 text-sm text-white/80">
                  {s.label}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
