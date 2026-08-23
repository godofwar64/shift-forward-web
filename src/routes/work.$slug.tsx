import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useSite, getProject, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — ${p.ar_title} | SHIFT` : "Case study | SHIFT";
    const desc = p?.ar_summary ?? "دراسة حالة من أعمال SHIFT.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${p?.name ?? "Case study"} — ${p?.en_title ?? ""} | SHIFT` },
        { property: "og:description", content: p?.en_summary ?? desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p?.name,
            headline: p?.en_title,
            description: p?.en_summary,
            creator: { "@type": "Organization", name: "SHIFT" },
          }),
        },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const { t, lang } = useSite();

  return (
    <main>
      <section className="bg-sky">
        <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
          <Link to="/work" className="label-mono inline-flex items-center gap-2 hover:text-foreground">
            <ArrowLeft className="size-3.5 rtl:rotate-180" /> {t("كل الأعمال", "All work")}
          </Link>
          <p className="label-mono mt-8">
            {project.name} · {t(project.ar_tag, project.en_tag)} · {project.year}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.06] font-bold md:text-6xl">
            {t(project.ar_title, project.en_title)}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t(project.ar_summary, project.en_summary)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                {t("زور المنصة", "Visit the platform")} <ArrowUpRight className="size-4" />
              </a>
            )}
            <span className="inline-flex items-center rounded-full border border-border bg-background/70 px-5 py-3 text-sm">
              {t(project.role_ar, project.role_en)}
            </span>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-20">
        <h2 className="text-2xl font-bold md:text-3xl">{t("النتائج", "Outcomes")}</h2>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {project.outcomes.map((o) => (
            <div key={o.k} className="surface p-6">
              <dt className="font-display text-3xl font-bold text-primary">{o.k}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{t(o.ar, o.en)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Challenge / approach */}
      <section className="mx-auto max-w-[1100px] px-5 pb-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="surface p-7">
            <h2 className="text-xl font-bold">{t("المشكلة", "The challenge")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t(project.ar_challenge, project.en_challenge)}
            </p>
          </div>
          <div className="surface p-7">
            <h2 className="text-xl font-bold">{t("طريقة الحل", "Our approach")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t(project.ar_approach, project.en_approach)}
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 md:px-8">
        <h2 className="text-2xl font-bold md:text-3xl">{t("التقنيات", "Stack")}</h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs tracking-wide"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20 md:px-8">
        <h2 className="text-2xl font-bold md:text-3xl">{t("من داخل المنتج", "Gallery")}</h2>
        <div className="mt-8 grid gap-6">
          {project.gallery.map((g) => (
            <figure key={g.src} className="surface overflow-hidden p-2">
              <img
                src={g.src}
                alt={t(g.ar_alt, g.en_alt)}
                loading="lazy"
                width={1600}
                height={1008}
                className="w-full rounded-xl object-cover"
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                {t(g.ar_alt, g.en_alt)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1100px] px-5 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-2xl font-bold md:text-4xl">
            {t("عندك مشروع شبه كده؟", "Have a project like this?")}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" hash="contact" className="btn-primary px-7 py-3.5 text-sm font-semibold">
              {t("املا الفورم", "Fill the form")}
            </Link>
            <a
              href={whatsappLink(lang, { Project: project.name })}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
            >
              {t("واتساب", "WhatsApp")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
