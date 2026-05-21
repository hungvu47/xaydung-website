import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { isAdminAuthorized } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;

    const db = client.db("maunha_db");

    const collection = db.collection("projects");

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || "1");

    const limit = Number(searchParams.get("limit") || "20");

    const search = searchParams.get("search") || "";

    const type = searchParams.get("type") || "";

    const skip = (page - 1) * limit;

    const query: any = {};

    // search title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // filter type
    if (type) {
      query.type = type;
    }

    const [projects, total] = await Promise.all([
      collection
        .find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),

      collection.countDocuments(query),
    ]);

    const clean = projects.map(({ _id, ...rest }) => rest);

    return NextResponse.json({
      projects: clean,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}