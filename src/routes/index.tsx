import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-shift.jpg";
import { useSite, services, steps } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHIFT — برمجيات تحرّك الأعمال للأمام" },
      {
        name: "description",
        content:
          "SHIFT شركة برمجيات متخصصة في حلول الويب: لاندينج بيدج، مواقع أعمال، متاجر إلكترونية ومنصات تعليمية.",
      },
      { property: "og:title", content: "SHIFT — Software that moves business forward" },
      {
        property: "og:description",
        content: "Web solutions for businesses with real traction. Landing pages to custom platforms.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useSite();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1200}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 dark:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-36">
          <span className="label-mono fade-up block">
            {t("شركة برمجيات · القاهرة", "Software company · Cairo")}
          </span>
          <h1 className="fade-up mt-6 max-w-4xl text-[2.6rem] leading-[1.02] font-bold tracking-tight md:text-[5.2rem]">
            {lang === "ar" ? (
              <>
                برمجيات <span className="text-primary">تحرّك</span>
                <br />
                الأعمال للأمام
              </>
            ) : (
              <>
                SOFTWARE THAT
                <br />
                <span className="text-primary">MOVES</span> BUSINESS FORWARD
              </>
            )}
          </h1>
          <p className="fade-up mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(
              "بنبني infrastructure رقمية للشركات اللي عندها عملاء حقيقيين — من صفحة واحدة بتبيع، لمنصة كاملة بتشتغل كل يوم.",
              "We build real digital infrastructure for businesses with real customers — from a single page that sells to a platform that runs every day.",
            )}
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("شوف الخدمات والأسعار", "Services & pricing")}
              <ArrowDown className="size-4" />
            </a>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-primary"
            >
              {t("الأعمال", "See the work")}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
            {[
              { k: "~14,000", v: t("مستخدم على KupeCut", "users on KupeCut") },
              { k: "6", v: t("أنواع حلول ويب", "web solution types") },
              { k: "100%", v: t("كود مكتوب بإيدينا", "hand-written code") },
              { k: "AR / EN", v: t("دعم كامل للاتجاهين", "full bidirectional support") },
            ].map((s) => (
              <div key={s.k} className="bg-background p-5">
                <dt className="font-mono text-xl font-medium md:text-2xl">{s.k}</dt>
                <dd className="label-mono mt-2">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <Section
        index="01"
        title={t("الخدمات", "Services")}
        lead={t(
          "تخصص واحد: حلول ويب. بنعملها صح بدل ما نعمل كل حاجة نص نص.",
          "One specialty: web solutions. Done properly instead of everything half-way.",
        )}
      >
        <div className="grid gap-px bg-border md:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.en} className="group bg-background p-7 transition-colors hover:bg-card">
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
        <div className="grid gap-px bg-border md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.en_title} className="bg-background p-7">
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
        lead={t("منصة شغّالة بمستخدمين حقيقيين، مش موك أب.", "A live platform with real users, not a mockup.")}
      >
        <Link
          to="/work"
          className="surface group block p-8 md:p-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label-mono">KupeCut · Platform</span>
              <h3 className="mt-4 text-3xl font-bold md:text-5xl">
                {t("منصة قطع الكابينيت", "Cabinet cutting platform")}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(
                  "أداة إنتاج بيستخدمها آلاف الحرفيين والورش لحساب وتخطيط القطع. عسام شريك مؤسس و CTO.",
                  "A production tool used by thousands of workshops to calculate and plan cuts. Essam is co-founder & CTO.",
                )}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-3xl font-medium">~14K</p>
                <p className="label-mono mt-1">{t("مستخدم", "users")}</p>
              </div>
              <ArrowUpRight className="size-8 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </Link>
      </Section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <span className="label-mono">04 — {t("الأسعار", "Pricing")}</span>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold md:text-5xl">
            {t("أسعار واضحة من البداية", "Clear pricing from the start")}
          </h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {services.map((s) => (
              <div
                key={s.en}
                className="flex flex-wrap items-baseline justify-between gap-4 py-6 transition-colors hover:bg-card"
              >
                <h3 className="text-lg font-semibold md:text-xl">{t(s.ar, s.en)}</h3>
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

      {/* Final CTA */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
          <h2 className="max-w-3xl text-3xl leading-tight font-bold md:text-6xl">
            {t(
              "بيزنسك بيكبر على السوشيال؟ وقت تبني بيتك الرقمي."
              , "Outgrowing social media? Time to build your own digital home.")}
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://wa.me/201000000000"
              className="inline-flex items-center gap-2 bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("ابدأ مشروع", "Start a project")}
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="mailto:hello@shift.software"
              className="inline-flex items-center gap-2 border border-border px-7 py-4 text-sm font-medium transition-colors hover:border-primary"
            >
              hello@shift.software
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({
  index,
  title,
  lead,
  children,
}: {
  index: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono">
              {index} — {title}
            </span>
            <h2 className="mt-5 text-3xl font-bold md:text-5xl">{title}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{lead}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
