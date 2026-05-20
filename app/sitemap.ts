import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { site } from "@/data/site";
import { readProjects } from "@/lib/projects-store";

const staticPaths = [
  "",
  "/gioi-thieu",
  "/du-an",
  "/lien-he",
  "/tuyen-dung",
  "/tin-hoat-dong",
  "/cam-nang-noi-that",
  "/phong-thuy-noi-that",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const lastModified = new Date();
  const projects = await readProjects();

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${base}/du-an/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${base}/tin/${a.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
