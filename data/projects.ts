export const PROJECT_TYPES = ["nha-cap-4", "nha-2-tang", "nha-3-tang", "biet-thu", "nha-tro"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "nha-cap-4": "Nhà cấp  4",
  "nha-2-tang": "Nhà 2 tầng",
  "nha-3-tang": "Nhà 3 tầng",
  "biet-thu": "Biệt thự",
  "nha-tro": "Nhà trọ",
};

export type ProjectTabKey = "" | ProjectType;

export const PROJECT_TAB_OPTIONS: ReadonlyArray<{ key: ProjectTabKey; label: string }> = [
  { key: "", label: "Tất cả" },
  ...PROJECT_TYPES.map((key) => ({ key, label: PROJECT_TYPE_LABELS[key] })),
];

const TYPE_SET = new Set<string>(PROJECT_TYPES);

export function isProjectType(value: string): value is ProjectType {
  return TYPE_SET.has(value);
}

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  type: ProjectType;
  image: string;     // thumbnail
  images: string[];  // gallery
  year: string;
  location: string;
  scope: string[];
  body: string[];
};

