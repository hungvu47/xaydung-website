import Link from "next/link";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHeader({ eyebrow, title, description, crumbs }: PageHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[color:var(--qc-bg-deep)] pb-12 pt-10 lg:pb-4 lg:pt-4">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-white/25">/</span> : null}
                  {c.href ? (
                    <Link className="transition hover:text-white" href={c.href}>
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--qc-gold)]">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{description}</p> : null}
      </div>
    </header>
  );
}
