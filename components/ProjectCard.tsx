"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--qc-bg-elevated)]"
    >
      <Link href={`/du-an/${project.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.categories.slice(0, 2).map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/85 backdrop-blur-md"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-3 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/45">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug text-white transition group-hover:text-[color:var(--qc-gold)] sm:text-2xl">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm text-white/60">{project.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--qc-gold)]">
            Xem dự án
            <span aria-hidden className="transition group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
