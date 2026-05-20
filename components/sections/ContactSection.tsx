"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [loading, setLoading] = useState(false);

  return (
    <section id="lien-he" className="bg-[color:var(--qc-surface)] py-20 text-[color:var(--qc-ink)] lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionTitle eyebrow="Liên hệ" title="Bắt đầu dự án của bạn" tone="dark" />
            <Reveal>
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--qc-ink-muted)]">
                Để lại thông tin - chúng tôi sẽ phản hồi trong vòng 24h làm việc. Hotline:{" "}
                <a className="text-[color:var(--qc-gold-deep)] hover:underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </p>
            </Reveal>
            <Reveal className="space-y-3 text-sm text-[color:var(--qc-ink-muted)]">
              <p>{site.address}</p>
              <p>
                Email:{" "}
                <a className="text-[color:var(--qc-gold-deep)] hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal>
            <form
              className="grid gap-4 rounded-[2rem] border border-[color:var(--qc-line-dark)] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-8"
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget;

                const data = {
                  name: form.name.value,
                  phone: form.phone.value,
                  type: form.type.value,
                  service: form.service.value,
                  note: form.note.value,
                };

                try {
                  setLoading(true); // ✅ bắt đầu gửi

                  await fetch("https://script.google.com/macros/s/AKfycbyHnGrjjrP7XfL1h8VGXA5ocoHtYxe5l3FN-vkYmNWACkedUqSjVSJKq2DK5G34TKA0/exec", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(data),
                  });

                  setStatus("sent");
                  form.reset();
                } catch (err) {
                  alert("Lỗi gửi form");
                } finally {
                  setLoading(false); // ✅ kết thúc
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--qc-ink-muted)]">
                  Họ tên
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-2xl border border-[color:var(--qc-line-dark)] bg-[color:var(--qc-surface-muted)] px-4 py-3 text-sm outline-none ring-[color:var(--qc-gold)]/40 focus:ring-2"
                    placeholder="Nguyễn Văn A"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--qc-ink-muted)]">
                  Số điện thoại
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="mt-2 w-full rounded-2xl border border-[color:var(--qc-line-dark)] bg-[color:var(--qc-surface-muted)] px-4 py-3 text-sm outline-none ring-[color:var(--qc-gold)]/40 focus:ring-2"
                    placeholder="0900 000 000"
                  />
                </label>
              </div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--qc-ink-muted)]">
                Loại dự án
                <select
                  name="type"
                  className="mt-2 w-full rounded-2xl border border-[color:var(--qc-line-dark)] bg-[color:var(--qc-surface-muted)] px-4 py-3 text-sm outline-none ring-[color:var(--qc-gold)]/40 focus:ring-2"
                  defaultValue="apartment"
                >
                  <option value="Nhà 2 tầng">Nhà 2 tầng</option>
                  <option value="Nhà 3 tầng">Nhà 3 tầng</option>
                  <option value="Nhà phố">Nhà phố</option>
                  <option value="Không gian thương mại">Không gian thương mại</option>
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--qc-ink-muted)]">
                Dịch vụ quan tâm
                <select
                  name="service"
                  className="mt-2 w-full rounded-2xl border border-[color:var(--qc-line-dark)] bg-[color:var(--qc-surface-muted)] px-4 py-3 text-sm outline-none ring-[color:var(--qc-gold)]/40 focus:ring-2"
                  defaultValue="both"
                >
                  <option value="Xây nhà trọn gói">Xây nhà trọn gói</option>
                  <option value="Cải tạo nhà">Cải tạo nhà</option>
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--qc-ink-muted)]">
                Ghi chú
                <textarea
                  name="note"
                  rows={4}
                  className="mt-2 w-full resize-y rounded-2xl border border-[color:var(--qc-line-dark)] bg-[color:var(--qc-surface-muted)] px-4 py-3 text-sm outline-none ring-[color:var(--qc-gold)]/40 focus:ring-2"
                  placeholder="Mô tả ngắn về nhu cầu của bạn…"
                />
              </label>
              {status === "sent" ? (
                <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800">
                  Cảm ơn bạn! Chúng tôi đã nhận thông tin và sẽ liên hệ sớm.
                </p>
              ) : null}
              <Button type="submit" variant="primary" className="w-full py-3 text-xs uppercase tracking-[0.22em]">
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
