import Link from "next/link";
import { footerColumns, site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--qc-bg-deep)]">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-[color:var(--qc-gold)]">
              <img className="rounded-full overflow-hidden" src="https://res.cloudinary.com/dymstje4v/image/upload/q_auto/f_auto/v1778833327/631021229_122156384366894616_1835816143252707347_n_nyvjwk.jpg" alt="" />
            </span>
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl text-white">
                {site.name}
              </p>
              <p className="text-sm text-white/55">{site.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">{site.description}</p>
          <div className="space-y-2 text-sm text-white/70">
            <p>{site.address}</p>
            <p>
              <a className="hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {site.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-[color:var(--qc-gold)]/50 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--qc-gold)]">
                {col.title}
              </p>
              <ul className="space-y-3 text-sm text-white/65">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link className="transition hover:text-white" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Mọi quyền được bảo lưu.</p>
        </Container>
      </div>
    </footer>
  );
}
