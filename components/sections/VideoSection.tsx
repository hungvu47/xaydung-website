import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { videoHighlights } from "@/data/site";
import Image from "next/image";

const poster =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80";

export function VideoSection() {
  const item = videoHighlights[0];
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,165,116,0.12),_transparent_55%)]" />
      <Container className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <SectionTitle eyebrow="Trải nghiệm" title={item.title} />
          <Reveal>
            <p className="max-w-xl text-sm leading-relaxed text-white/65">{item.subtitle}</p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            <Button href={item.href} variant="primary" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
              {item.cta}
            </Button>
            <Button href="/du-an" variant="ghost" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
              Thư viện hình ảnh
            </Button>
          </Reveal>
        </div>
        <Reveal>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-video overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <Image src={poster} alt="" fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition group-hover:scale-105">
                <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
              </span>
            </div>
            <span className="sr-only">Mở video trên YouTube</span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
