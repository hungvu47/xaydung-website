import { NextResponse } from "next/server";
import {
  isProjectType,
  type Project,
} from "@/data/projects";
import { isAdminAuthorized } from "@/lib/admin-auth";
// import { readProjects, writeProjects } from "@/lib/projects-store";
import { slugFromTitle } from "@/lib/slug";
import clientPromise from "@/lib/mongodb";

function parseProjectPayload(input: unknown): Project | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const slug = typeof o.slug === "string" ? o.slug.trim() : "";
  const title = typeof o.title === "string" ? o.title.trim() : "";
  const excerpt = typeof o.excerpt === "string" ? o.excerpt.trim() : "";
  const typeRaw = typeof o.type === "string" ? o.type.trim() : "";
  const image = typeof o.image === "string" ? o.image.trim() : "";
  const year = typeof o.year === "string" ? o.year.trim() : "";
  const location = typeof o.location === "string" ? o.location.trim() : "";



  if (!title || !isProjectType(typeRaw) || !image) return null;

  const categories = Array.isArray(o.categories)
    ? o.categories.map((c) => String(c).trim()).filter(Boolean)
    : [];
  const scope = Array.isArray(o.scope)
    ? o.scope.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const body = Array.isArray(o.body)
    ? o.body.map((b) => String(b).trim()).filter(Boolean)
    : [];

  const finalSlug = slug || slugFromTitle(title);
  if (!finalSlug) return null;

  const images = Array.isArray(o.images)
    ? o.images.map((img) => String(img).trim()).filter(Boolean)
    : [];

  return {
    slug: finalSlug,
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

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("maunha_db");
    const collection = db.collection("projects");

    const { searchParams } = new URL(request.url);

    const loai = searchParams.get("loai");
    const page = Number(searchParams.get("page") || "1");

    const PER_PAGE = 12;
    const skip = (page - 1) * PER_PAGE;

    // filter nếu có loai
    const query = loai
      ? {
        $or: [
          { type: loai },
          { categories: loai }
        ]
      }
      : {};

    // const data = await collection
    //   .find(query)
    //   .sort({ _id: -1 }) // mới nhất lên đầu
    //   .toArray();

    const [projects, total] = await Promise.all([
      collection
        .find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(PER_PAGE)
        .toArray(),

      collection.countDocuments(query),
    ]);

    // loại bỏ _id cho sạch response (optional)
    // const clean = data.map(({ _id, ...rest }) => rest);
    const clean = projects.map(({ _id, ...rest }) => rest);


    return NextResponse.json({
      projects: clean,
      total,
      page,
      totalPages: Math.ceil(total / PER_PAGE),
    });

  } catch (e) {
    console.error("GET projects error:", e);
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json: unknown = await request.json();
    const project = parseProjectPayload(json);

    if (!project) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("maunha_db");
    const collection = db.collection("projects");

    // check trùng slug
    const existing = await collection.findOne({ slug: project.slug });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    await collection.insertOne(project);

    return NextResponse.json(project, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}
