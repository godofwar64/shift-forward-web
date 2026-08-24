import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Quote, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { useSite, services, steps, projects, testimonials } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHIFT — برمجيات تحرّك الأعمال للأمام" },
      {
        name: "description",
        content:
          "SHIFT شركة برمجيات متخصصة في حلول الويب: لاندينج بيدج، مواقع أعمال، متاجر إلكترونية ومنصات تعليمية. أسعار واضحة وتنفيذ بمعايير إنتاج.",
      },
      { property: "og:title", content: "SHIFT — Software that moves business forward" },
      {
        property: "og:description",
        content:
          "Web solutions for businesses with real traction — from landing pages to custom platforms.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SHIFT",
          slogan: "Software that moves business forward",
          url: "/",
          email: "hello@shift.software",
          areaServed: "EG",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useSite();
  const featured = projects[0]!;

  return (
    <main>
      <Hero />

      {/* Services */}
      <Section
        id="services"
        index="01"
        title={t("الخدمات", "Services")}
        lead={t(
          "تخصص واحد: حلول ويب. بنعملها صح بدل ما نعمل كل حاجة نص نص.",
          "One specialty: web solutions. Done properly instead of everything half-way.",
        )}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.en} className="surface p-7">
              <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-semibold">{t(s.ar, s.en)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(s.ar_desc, s.en_desc)}
              </p>
              <p className="mt-6 font-mono text-sm text-primary">
                {s.price
                  ? t(`يبدأ من ${s.price} جنيه`, `from EGP ${s.price}`)
                  : t("حسب المشروع", "project-based")}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section
        index="02"
        title={t("طريقة الشغل", "How we work")}
        lead={t(
          "أربع مراحل واضحة. مفيش مرحلة تبدأ قبل اللي قبلها تخلص.",
          "Four clear stages. No stage starts before the previous one closes.",
        )}
      >
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.en_title} className="surface p-7">
              <span className="font-mono text-3xl font-medium text-primary">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold">{t(s.ar_title, s.en_title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(s.ar, s.en)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Work preview */}
      <Section
        index="03"
        title={t("عمل مختار", "Selected work")}
        lead={t(
          "منصة شغّالة بمستخدمين حقيقيين، مش موك أب.",
          "A live platform with real users, not a mockup.",
        )}
      >
        <Link
          to="/work/$slug"
          params={{ slug: featured.slug }}
          className="surface group block overflow-hidden"
        >
          <img
            src={featured.gallery[0]?.src}
            alt={t(featured.gallery[0]?.ar_alt ?? "", featured.gallery[0]?.en_alt ?? "")}
            className="h-56 w-full object-cover md:h-80"
            loading="lazy"
          />
          <div className="flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-12">
            <div>
              <span className="label-mono">
                {featured.name} · {t(featured.ar_tag, featured.en_tag)}
              </span>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                {t(featured.ar_title, featured.en_title)}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(featured.ar_summary, featured.en_summary)}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-3xl font-medium">{featured.outcomes[0]?.k}</p>
                <p className="label-mono mt-1">
                  {t(featured.outcomes[0]?.ar ?? "", featured.outcomes[0]?.en ?? "")}
                </p>
              </div>
              <ArrowUpRight className="size-8 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </Link>
      </Section>

      {/* Testimonials */}
      <Section
        index="04"
        title={t("رأي العملاء", "Client feedback")}
        lead={t(
          "كلام ناس البرمجيات بتاعتنا شغّالة عندهم كل يوم.",
          "From people running our software every single day.",
        )}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((r) => (
            <figure key={r.en_name} className="surface flex flex-col p-7">
              <Quote className="size-6 text-primary" />
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(r.ar, r.en)}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="text-sm font-semibold">{t(r.ar_name, r.en_name)}</p>
                <p className="label-mono mt-1">{t(r.ar_role, r.en_role)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <span className="label-mono">05 — {t("الأسعار", "Pricing")}</span>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold md:text-5xl">
            {t("أسعار واضحة من البداية", "Clear pricing from the start")}
          </h2>
          <div className="surface mt-12 divide-y divide-border p-2">
            {services.map((s) => (
              <div
                key={s.en}
                className="flex flex-wrap items-baseline justify-between gap-4 rounded-lg px-5 py-5 transition-colors hover:bg-secondary"
              >
                <h3 className="flex items-center gap-3 text-base font-semibold md:text-lg">
                  <Check className="size-4 text-primary" />
                  {t(s.ar, s.en)}
                </h3>
                <p className="font-mono text-sm md:text-base">
                  {s.price ? (
                    <>
                      <span className="text-muted-foreground">{t("يبدأ من", "from")} </span>
                      <span className="text-primary">
                        {s.price} {t("جنيه", "EGP")}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary">{t("حسب المشروع", "project-based")}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <p className="label-mono mt-6">
            {t(
              "الأسعار تقديرية وتتحدد نهائياً بعد فهم نطاق المشروع",
              "Estimates — final scope determines the quote",
            )}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <span className="label-mono">06 — {t("تواصل", "Contact")}</span>
            <h2 className="mt-5 text-3xl leading-tight font-bold md:text-5xl">
              {t(
                "بيزنسك بيكبر على السوشيال؟ وقت تبني بيتك الرقمي.",
                "Outgrowing social media? Time to build your own digital home.",
              )}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {t(
                "املأ الفورم وهنرجع لك بخطة أولية وتقدير سعر واضح. أو كلمنا على واتساب مباشرة.",
                "Fill the form and we'll come back with an initial plan and a clear estimate. Or message us on WhatsApp directly.",
              )}
            </p>
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              {lang === "ar" ? "متوسط الرد: أقل من 24 ساعة" : "Average reply: under 24 hours"}
              <ArrowRight className="size-4 text-primary rtl:rotate-180" />
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">{index}</span>
            <h2 className="mt-5 text-3xl font-bold md:text-5xl">{title}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {lead}
          </p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
