import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/data/site";

import {
  MessageCircle,
  Search,
  PenTool,
  FileText,
  Hammer,
  Key,
  ShieldCheck,
} from "lucide-react";

const icons = [
  MessageCircle,
  Search,
  PenTool,
  FileText,
  Hammer,
  Key,
  ShieldCheck,
];

export function ProcessSection() {
  return (
    <section className="relative bg-[color:var(--qc-bg-elevated)] py-24 lg:py-12">
      <Container>
        <SectionTitle
          eyebrow="Quy trình"
          title="Quy trình làm việc"
          align="center"
          className="mx-auto mb-20"
        />

        <div className="relative">
          {/* line */}
          {/* <div className="absolute left-0 top-9 hidden h-px w-full bg-white/20 xl:block" /> */}

          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => {
              const Icon = icons[i] || MessageCircle;

              return (
                <Reveal key={step} delay={i * 0.06}>
                  <div className="group relative text-center ">

                    {/* số */}
                    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-[80px] font-bold leading-none text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* dot + label */}
                    <div className="mb-5 flex items-center justify-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--qc-gold)] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                      <span className="text-xs uppercase tracking-[0.25em] text-white/70">
                        Bước {i + 1}
                      </span>
                    </div>

                    {/* card */}
                    <div className="min-h-[180px] rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-300 group-hover:border-[color:var(--qc-gold)] group-hover:bg-white/[0.08] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

                      {/* ✅ ICON thật */}
                      <div className="mb-4 flex justify-center text-[color:var(--qc-gold)] opacity-90">
                        <Icon size={40} strokeWidth={1.5} />
                      </div>

                      {/* text */}
                      <p className="font-[family-name:var(--font-display)] text-[20px] leading-relaxed text-white/90">
                        {step}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}