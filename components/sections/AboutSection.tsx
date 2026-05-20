import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutIntro } from "@/data/site";

const side =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80";

export function AboutSection() {
  return (
    <section id="gioi-thieu" className="bg-[color:var(--qc-surface)] py-20 text-[color:var(--qc-ink)] lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <Image src={side} alt="Không gian nội thất" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
              <div className="absolute inset-0 ring-1 ring-black/5" />
            </div>
          </Reveal>
          <div className="pointer-events-none absolute -bottom-8 -right-6 hidden h-40 w-40 rounded-full border border-[color:var(--qc-gold)]/40 lg:block" />
        </div>

        <div className="space-y-8">
          <SectionTitle
            eyebrow={aboutIntro.eyebrow}
            title={aboutIntro.title}
            tone="dark"
            className="!max-w-none"
          />
          <div className="space-y-5 text-[color:var(--qc-ink-muted)]">
            {aboutIntro.paragraphs.map((p) => (
              <Reveal key={p.slice(0, 24)}>
                <p className="leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="flex flex-wrap gap-3">
            <Button href="/gioi-thieu" variant="primary" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
              Về chúng tôi
            </Button>
            <Button href="/tuyen-dung" variant="outlineDark" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
              Tuyển dụng
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
