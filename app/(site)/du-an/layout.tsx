import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Dự án",
  description: `Thư viện công trình thực tế và phối cảnh nội thất — ${site.name}.`,
  alternates: { canonical: "/du-an" },
};

export default function DuAnSegmentLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p className="px-4 py-24 text-center text-sm text-white/50">Đang tải…</p>}>{children}</Suspense>;
}
