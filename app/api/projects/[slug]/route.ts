import { NextResponse } from "next/server";
import { type Project, isProjectType } from "@/data/projects";
import { isAdminAuthorized } from "@/lib/admin-auth";
// import { readProjects, writeProjects } from "@/lib/projects-store";
import { slugFromTitle } from "@/lib/slug";
import clientPromise from "@/lib/mongodb";

type Ctx = { params: Promise<{ slug: string }> };

function mergeProject(existing: Project, input: unknown): Project | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;

  const title = typeof o.title === "string" ? o.title.trim() : existing.title;
  const excerpt = typeof o.excerpt === "string" ? o.excerpt.trim() : existing.excerpt;
  const typeRaw = typeof o.type === "string" ? o.type.trim() : existing.type;
  const image = typeof o.image === "string" ? o.image.trim() : existing.image;
  const year = typeof o.year === "string" ? o.year.trim() : existing.year;
  const location = typeof o.location === "string" ? o.location.trim() : existing.location;

  if (!title || !isProjectType(typeRaw) || !image) return null;

  const categories = Array.isArray(o.categories)
    ? o.categories.map((c) => String(c).trim()).filter(Boolean)
    : existing.categories;
  const scope = Array.isArray(o.scope)
    ? o.scope.map((s) => String(s).trim()).filter(Boolean)
    : existing.scope;
  const body = Array.isArray(o.body)
    ? o.body.map((b) => String(b).trim()).filter(Boolean)
    : existing.body;

  const slugInput = typeof o.slug === "string" ? o.slug.trim() : "";
  const nextSlug = slugInput || slugFromTitle(title) || existing.slug;

  const images = Array.isArray(o.images)
    ? o.images.map((img) => String(img).trim()).filter(Boolean)
    : existing.images;

  return {
    slug: nextSlug,
    title,
    excerpt,
    categories,
    type: typeRaw,
    image,
    images,
    year,
    location,
    scope,
    body,
  };
}

export async function PUT(request: Request, context: Ctx) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: paramSlug } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("maunha_db");
    const collection = db.collection("projects");

    const existing = await collection.findOne({ slug: paramSlug });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const json: unknown = await request.json();
    const { _id, ...cleanExisting } = existing as any;
    const merged = mergeProject(cleanExisting, json);

    if (!merged) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // check slug trùng nếu đổi slug
    if (merged.slug !== paramSlug) {
      const duplicate = await collection.findOne({ slug: merged.slug });
      if (duplicate) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    const { _id: _, ...dataToUpdate } = merged as any;

    await collection.updateOne(
      { slug: paramSlug },
      { $set: dataToUpdate }
    );

    return NextResponse.json(merged);

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Ctx) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: paramSlug } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("maunha_db");
    const collection = db.collection("projects");

    const result = await collection.deleteOne({ slug: paramSlug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
