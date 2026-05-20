import fs from "node:fs/promises";
import path from "node:path";
import type { Project } from "@/data/projects";

const filePath = () => path.join(process.cwd(), "data", "projects.json");

export async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(filePath(), "utf-8");
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed as Project[];
}

export async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(filePath(), `${JSON.stringify(projects, null, 2)}\n`, "utf-8");
}
