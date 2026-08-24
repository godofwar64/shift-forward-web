import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSite, projects, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "أعمال SHIFT — منصات ومواقع شغّالة" },
      {
        name: "description",
        content: "أعمال SHIFT: KupeCut، منصة قطع كابينيت بحوالي 14,000 مستخدم حقيقي في الإنتاج.",
      },
      { property: "og:title", content: "SHIFT Work — Live platforms and websites" },
      {
        property: "og:description",
        content: "KupeCut: a cutting platform with ~14,000 real users, in production.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: Work,
});

function Work() {
  const { t, lang } = useSite();

  return (
    <main>
      <section className="border-b border-border bg-sky/40">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <span className="label-mono">{t("الأعمال", "Work")}</span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold md:text-6xl">
            {t("شغل شغّال، مش عرض تصاميم", "Live products, not design mockups")}
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            {t(
              "كل حالة هنا منتج في الإنتاج بمستخدمين حقيقيين — بنحكي المشكلة، الطريقة، والنتيجة.",
              "Every case here is a product in production with real users — the problem, the approach, the outcome.",
            )}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-16 md:px-8 md:py-24">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="surface group grid overflow-hidden md:grid-cols-2"
            >
              <img
                src={p.gallery[0]?.src}
                alt={t(p.gallery[0]?.ar_alt ?? "", p.gallery[0]?.en_alt ?? "")}
                className="h-56 w-full object-cover md:h-full"
                loading="lazy"
              />
              <div className="p-8 md:p-12">
                <span className="label-mono">
                  {p.name} · {t(p.ar_tag, p.en_tag)}
                </span>
                <h2 className="mt-4 text-2xl font-bold md:text-4xl">{t(p.ar_title, p.en_title)}</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(p.ar_summary, p.en_summary)}
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-5">
                  {p.outcomes.slice(0, 2).map((o) => (
                    <div key={o.k}>
                      <dt className="font-mono text-xl font-medium">{o.k}</dt>
                      <dd className="label-mono mt-1">{t(o.ar, o.en)}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t("اقرأ دراسة الحالة", "Read the case study")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
          <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">
            {t("مشروعك يقدر يكون الحالة الجاية", "Your project can be the next case")}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" hash="contact" className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold">
              {t("ابدأ مشروع", "Start a project")}
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors hover:border-primary"
            >
              {t("واتساب", "WhatsApp")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
