"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, startTransition } from "react";
import { ADMIN_PASSWORD, ADMIN_PASSWORD_HEADER } from "@/lib/admin-auth";
import type { Project, ProjectType } from "@/data/projects";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS } from "@/data/projects";
import { slugFromTitle } from "@/lib/slug";
import { uploadToCloudinary } from "@/lib/cloudinary";

const STORAGE_KEY = "qc-admin-projects-pw";

function authHeaders(): HeadersInit {
  const pw = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) ?? "" : "";
  return { [ADMIN_PASSWORD_HEADER]: pw };
}

export default function AdminProjectsPage() {
  const [gateInput, setGateInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoriesCsv, setCategoriesCsv] = useState("");
  const [type, setType] = useState<ProjectType>("nha-2-tang");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [scopeCsv, setScopeCsv] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    queueMicrotask(() => {
      if (saved && saved === ADMIN_PASSWORD) {
        startTransition(() => setUnlocked(true));
      }
    });
  }, []);

  // const loadProjects = useCallback(async () => {
  //   setError(null);

  //   try {
  //     const r = await fetch("/api/admin", {
  //       headers: authHeaders(),
  //     });

  //     if (!r.ok) {
  //       throw new Error(`HTTP ${r.status}`);
  //     }

  //     const data = await r.json();

  //     console.log("RAW API:", data);

  //     if (!Array.isArray(data)) {
  //       throw new Error("projects is not array");
  //     }

  //     setProjects(data);

  //   } catch (e) {
  //     console.error(e);

  //     setError(
  //       e instanceof Error
  //         ? e.message
  //         : "Không tải được danh sách."
  //     );
  //   }
  // }, []);

  const loadProjects = useCallback(async () => {
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
      });

      if (search) {
        params.append("search", search);
      }

      if (typeFilter) {
        params.append("type", typeFilter);
      }

      const r = await fetch(
        `/api/admin/projects?${params.toString()}`,
        {
          headers: authHeaders(),
        }
      );

      if (!r.ok) {
        throw new Error(`HTTP ${r.status}`);
      }

      const data = await r.json();


      setProjects(data.projects || []);

      setTotalPages(data.totalPages || 1);

    } catch (e) {
      console.error(e);

      setError(
        e instanceof Error
          ? e.message
          : "Không tải được danh sách."
      );
    }
  }, [page, search, typeFilter]);

  useEffect(() => {
    if (!unlocked) return;
    queueMicrotask(() => {
      void loadProjects();
    });
  }, [unlocked, loadProjects]);

  const resetForm = () => {
    setEditingSlug(null);
    setSlug("");
    setTitle("");
    setExcerpt("");
    setCategoriesCsv("");
    setType("nha-2-tang");
    setImage("");
    setYear("");
    setLocation("");
    setScopeCsv("");
    setBodyText("");
    setFiles([]);
    setPreviewUrls([]);
    setThumbnailIndex(0);
  };

  const toPayload = useMemo(
    () => ({
      slug: slug.trim() || slugFromTitle(title.trim()),
      title: title.trim(),
      excerpt: excerpt.trim(),
      categories: categoriesCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      type,
      image: image,
      year: year.trim(),
      location: location.trim(),
      scope: scopeCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      body: bodyText
        .split(/\n\s*\n/)
        .map((s) => s.trim())
        .filter(Boolean),
    }),
    [slug, title, excerpt, categoriesCsv, type, image, year, location, scopeCsv, bodyText],
  );

  const unlock = () => {
    if (gateInput !== ADMIN_PASSWORD) {
      setMessage(null);
      setError("Sai mật khẩu.");
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, gateInput);
    setUnlocked(true);
    setError(null);
    setMessage("Đã đăng nhập.");
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
    resetForm();
    setMessage(null);
    setError(null);
  };

  const startEdit = (p: Project) => {
    setEditingSlug(p.slug);
    setSlug(p.slug);
    setTitle(p.title);
    setExcerpt(p.excerpt);
    setCategoriesCsv(p.categories.join(", "));
    setType(p.type);
    setImage(p.image);
    setYear(p.year);
    setLocation(p.location);
    // setPreviewUrls(p.images || [p.image]);
    setPreviewUrls(
      Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : [p.image]
    );
    setScopeCsv(p.scope.join(", "));
    setBodyText(p.body.join("\n\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      let finalImage = image;
      let finalImages: string[] = [];

      if (files.length > 0) {
        setUploading(true);

        const uploaded = await Promise.all(
          files.map((file) => uploadToCloudinary(file))
        );

        setUploading(false);

        finalImages = uploaded;
        finalImage = uploaded[thumbnailIndex];
      }
      const payload = {
        ...toPayload,
        image: finalImage,
        images: finalImages,
      };
      if (editingSlug) {
        const r = await fetch(`/api/projects/${encodeURIComponent(editingSlug)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(payload)
        });
        if (r.status === 401) throw new Error("Hết phiên — đăng nhập lại.");
        if (!r.ok) throw new Error(await r.text());
        setMessage("Đã cập nhật.");
      } else {
        const r = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(payload),
        });
        if (r.status === 401) throw new Error("Hết phiên — đăng nhập lại.");
        if (!r.ok) throw new Error(await r.text());
        setMessage("Đã thêm dự án.");
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định.");
    }
  };

  const remove = async (slugToDelete: string) => {
    if (!window.confirm(`Xoá dự án "${slugToDelete}"?`)) return;
    setMessage(null);
    setError(null);
    try {
      const r = await fetch(`/api/projects/${encodeURIComponent(slugToDelete)}`, {
        method: "DELETE",
        headers: { ...authHeaders() },
      });
      if (r.status === 401) throw new Error("Hết phiên — đăng nhập lại.");
      if (!r.ok) throw new Error(await r.text());
      if (editingSlug === slugToDelete) resetForm();
      setMessage("Đã xoá.");
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi xoá.");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-dvh bg-zinc-50 px-4 py-16 text-zinc-900">
        <div className="mx-auto max-w-md space-y-4 rounded border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold">Admin - Quản lý dự án</h1>
          <p className="text-sm text-zinc-600">Nhập mật khẩu để tiếp tục (mặc định: <code className="rounded bg-zinc-100 px-1">qtconcept-admin</code>).</p>
          <input
            type="password"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            value={gateInput}
            onChange={(e) => setGateInput(e.target.value)}
            placeholder="Mật khẩu"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="button" className="rounded bg-zinc-900 px-4 py-2 text-sm text-white" onClick={unlock}>
            Vào trang quản trị
          </button>
          <p className="text-xs text-zinc-500">
            <Link className="text-blue-600 underline" href="/du-an">
              ← Xem trang dự án
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-50 px-4 py-10 text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Quản lý dự án</h1>
            <p className="text-sm text-zinc-600">Dữ liệu lưu tại <code className="rounded bg-zinc-100 px-1">data/projects.json</code></p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link className="text-blue-600 underline" href="/du-an">
              Xem /du-an
            </Link>
            <button type="button" className="text-zinc-600 underline" onClick={logout}>
              Đăng xuất
            </button>
          </div>
        </header>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <form onSubmit={submit} className="space-y-4 rounded border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {editingSlug ? `Sửa: ${editingSlug}` : "Thêm dự án mới"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-medium">Slug</span>
              <input
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Để trống → tự tạo từ tiêu đề"
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Tiêu đề *</span>
              <input
                required
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>

          <label className="text-sm">
            <span className="font-medium">Mô tả ngắn</span>
            <textarea className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-medium">Danh mục (CSV)</span>
              <input
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                value={categoriesCsv}
                onChange={(e) => setCategoriesCsv(e.target.value)}
                placeholder="Biệt thự, Thiết kế nội thất"
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Loại *</span>
              <select className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value as ProjectType)}>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {PROJECT_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="text-sm">
            <span className="font-medium">Ảnh (chọn nhiều)</span>
            <label className="mt-1 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm transition hover:border-zinc-400 hover:bg-zinc-100">
              <div className="text-center">
                <p className="font-medium text-zinc-700">
                  Chọn ảnh dự án
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  PNG, JPG, WEBP • Chọn nhiều ảnh
                </p>

                {files.length > 0 && (
                  <p className="mt-2 text-xs text-blue-600">
                    Đã chọn {files.length} ảnh
                  </p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files
                    ? Array.from(e.target.files)
                    : [];

                  setFiles(selected);

                  const previews = selected.map((file) =>
                    URL.createObjectURL(file)
                  );

                  setPreviewUrls(previews);

                  setThumbnailIndex(0);
                }}
              />
            </label>

            {previewUrls.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {previewUrls.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setThumbnailIndex(i)}
                    className={`relative overflow-hidden rounded border-2 cursor-pointer transition ${thumbnailIndex === i
                      ? "border-blue-500"
                      : "border-transparent hover:border-zinc-300"
                      }`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="h-24 w-full object-cover"
                    />

                    {thumbnailIndex === i && (
                      <span className="absolute left-1 top-1 rounded bg-blue-500 px-1 text-xs text-white">
                        Ảnh đại diện
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-medium">Năm</span>
              <input className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label className="text-sm">
              <span className="font-medium">Địa điểm</span>
              <input className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
          </div>

          <label className="text-sm">
            <span className="font-medium">Phạm vi (CSV)</span>
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              value={scopeCsv}
              onChange={(e) => setScopeCsv(e.target.value)}
              placeholder="Thiết kế, Thi công"
            />
          </label>

          <label className="text-sm">
            <span className="font-medium">Nội dung (đoạn cách nhau bằng dòng trống)</span>
            <textarea className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm" rows={6} value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={uploading}
              className="cursor-pointer rounded bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {uploading ? "Đang upload..." : editingSlug ? "Lưu thay đổi" : "Thêm mới"}
            </button>
            {editingSlug ? (
              <button type="button" className="cursor-pointer rounded border border-zinc-300 px-4 py-2 text-sm" onClick={resetForm}>
                Huỷ sửa
              </button>
            ) : null}
          </div>
        </form>

        <section className="rounded border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Danh sách</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Tìm theo tên..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="rounded border border-zinc-300 px-3 py-2 text-sm"
            />

            <select
              value={typeFilter}
              onChange={(e) => {
                setPage(1);
                setTypeFilter(e.target.value);
              }}
              className="rounded border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value="">Tất cả loại</option>

              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {PROJECT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>
          <ul className="mt-4 divide-y divide-zinc-200">
            {projects.map((p: Project) => (
              <li key={p.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-zinc-500">
                    {p.slug} · {PROJECT_TYPE_LABELS[p.type as keyof typeof PROJECT_TYPE_LABELS] ?? p.type}
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <button type="button" className="cursor-pointer rounded border border-zinc-300 px-3 py-1" onClick={() => startEdit(p)}>
                    Sửa
                  </button>
                  <button type="button" className="cursor-pointer rounded border border-red-200 px-3 py-1 text-red-700" onClick={() => remove(p.slug)}>
                    Xoá
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="cursor-pointer rounded border border-zinc-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Trước
            </button>

            <span className="text-sm">
              Trang {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer rounded border border-zinc-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
