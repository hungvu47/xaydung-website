"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  index: number;
};

export function ServiceCard({ title, description, href, index }: ServiceCardProps) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        whileHover={
          reduce
            ? undefined
            : { y: -6, transition: { type: "spring", stiffness: 260, damping: 22 } }
        }
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[color:var(--qc-gold)]/10 blur-3xl" />
        </div>
        <div className="relative space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">{title}</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/65">{description}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--qc-gold)] transition hover:gap-3"
          >
            Xem chi tiết
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.div>
    </Reveal>
  );
}
