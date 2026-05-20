import { Project, isProjectType } from "@/data/projects";

export function normalizeProject(doc: any): Project {
  return {
    slug: doc.slug ?? "",
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    categories: Array.isArray(doc.categories) ? doc.categories : [],
    type: isProjectType(doc.type) ? doc.type : "nha-2-tang",
    image: doc.image ?? "",
    images: Array.isArray(doc.images) ? doc.images : [],
    year: doc.year ?? "",
    location: doc.location ?? "",
    scope: Array.isArray(doc.scope) ? doc.scope : [],
    body: Array.isArray(doc.body) ? doc.body : [],
  };
}