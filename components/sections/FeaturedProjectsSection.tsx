"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import {
  PROJECT_TAB_OPTIONS,
  type Project,
  type ProjectTabKey,
} from "@/data/projects";

export function FeaturedProjectsSection() {
  const [all, setAll] = useState<Project[]>([]);
  const [tab, setTab] = useState<ProjectTabKey>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    const url =
      tab && tab.length > 0
        ? `/api/projects?loai=${tab}&page=1`
        : "/api/projects?page=1";

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setAll(Array.isArray(data.projects) ? data.projects : []);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab]);

  // filter trực tiếp (KHÔNG cần filterProjectsByLoai nữa)
  // const filtered = useMemo(() => {
  //   if (!tab) return all;
  //   return all.filter((p) => p.type === tab);
  // }, [all, tab]);

  return (
    <section id="du-an" className="bg-[color:var(--qc-ink)] py-10 lg:py-10">
      <Container>
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Portfolio" title="Mẫu nhà nổi bật" />

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {PROJECT_TAB_OPTIONS.map((opt) => {
              const active = opt.key === tab;

              return (
                <button
                  key={opt.key || "all"}
                  type="button"
                  onClick={() => setTab(opt.key)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${active
                    ? "border-[color:var(--qc-gold)] bg-[color:var(--qc-gold)]/15 text-[color:var(--qc-gold)]"
                    : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-white/50">Đang tải dự án…</p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {all.length === 0 ? (
                <p className="col-span-full rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-sm text-white/60">
                  Chưa có dự án trong danh mục này.{" "}
                  <a
                    className="text-[color:var(--qc-gold)] underline-offset-4 hover:underline"
                    href="/lien-he"
                  >
                    Liên hệ tư vấn
                  </a>
                  .
                </p>
              ) : (
                all.slice(0, 6).map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))
              )}
            </div>

            {all.length > 6 && (
              <div className="mt-12 flex justify-center">
                <Link
                  href="/du-an"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black"
                >
                  Xem thêm dự án
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}