"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { isProjectType, PROJECT_TYPE_LABELS, type Project } from "@/data/projects";

export default function DuAnPage() {
  const searchParams = useSearchParams();
  const loai = searchParams.get("loai");
  const page = Number(searchParams.get("page") || "1");

  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterLabel = useMemo(() => {
    if (!loai || !isProjectType(loai)) return null;
    return PROJECT_TYPE_LABELS[loai];
  }, [loai]);

  useEffect(() => {
    let cancelled = false;
    // const url =
    //   loai && isProjectType(loai) ? `/api/projects?loai=${encodeURIComponent(loai)}` : "/api/projects";
    const url =
      loai && isProjectType(loai)
        ? `/api/projects?loai=${encodeURIComponent(loai)}&page=${page}`
        : `/api/projects?page=${page}`;

    startTransition(() => {
      setLoading(true);
      setError(null);
    });

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{
          projects: Project[];
          total: number;
          page: number;
          totalPages: number;
        }>;
      })
      .then((data) => {
        if (!cancelled) {
          setProjects(Array.isArray(data.projects) ? data.projects : []);
          setTotal(data.total || 0);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Không tải được dữ liệu.");
      })
      .finally(() => {
        if (!cancelled) startTransition(() => setLoading(false));
      });

    return () => {
      cancelled = true;
    };
  }, [loai, page]);

  return (
    <InnerMain>
      <PageHeader
        // eyebrow="Portfolio"
        title="Dự án tiêu biểu"
        description={
          filterLabel
            ? `Đang lọc theo: ${filterLabel}.`
            : "Từ căn hộ đến biệt thự - mỗi công trình là một bản hòa ca giữa ánh sáng, vật liệu và công năng."
        }
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Dự án" },
        ]}
      />
      <Container className="grid gap-8 py-16 md:grid-cols-2 lg:py-6 xl:grid-cols-3">
        <p className="col-span-full text-sm text-white/50">
          Lọc nhanh:{" "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an">
            Tất cả
          </Link>
          {" · "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an?loai=nha-cap-4">
            Nhà cấp 4
          </Link>
          {" · "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an?loai=nha-2-tang">
            Nhà 2 tầng
          </Link>
          {" · "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an?loai=nha-3-tang">
            Nhà 3 tầng
          </Link>
          {" · "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an?loai=biet-thu">
            Biệt thự
          </Link>
          {" · "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/du-an?loai=nha-tro">
            Nhà trọ
          </Link>
        </p>

        {loading ? <p className="col-span-full text-sm text-white/50">Đang tải…</p> : null}
        {error ? <p className="col-span-full text-sm text-red-400">{error}</p> : null}

        {!loading && !error && projects.length === 0 ? (
          <p className="col-span-full text-sm text-white/60">Chưa có dự án phù hợp bộ lọc.</p>
        ) : null}

        {!loading && !error
          ? projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)
          : null}

        {!loading && !error && total > 12 ? (
          <div className="col-span-full mt-8 flex flex-wrap justify-center gap-2">
            {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => {
              const current = i + 1;

              return (
                <Link
                  key={current}
                  href={
                    loai
                      ? `/du-an?loai=${loai}&page=${current}`
                      : `/du-an?page=${current}`
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm transition ${page === current
                    ? "border-[color:var(--qc-gold)] bg-[color:var(--qc-gold)] text-black"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                >
                  {current}
                </Link>
              );
            })}
          </div>
        ) : null}
      </Container>
    </InnerMain>
  );
}
