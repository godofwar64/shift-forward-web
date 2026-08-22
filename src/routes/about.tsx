import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن SHIFT — شركة حلول الويب" },
      {
        name: "description",
        content: "SHIFT بتبني حلول ويب للشركات اللي عندها traction حقيقي. تخصص، منهجية، ومعايير إنتاج.",
      },
      { property: "og:title", content: "About SHIFT — Web solutions studio" },
      {
        property: "og:description",
        content: "We build web infrastructure for businesses with real traction.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useSite();

  const principles = [
    {
      ar_t: "تخصص قبل التوسع",
      en_t: "Focus before scale",
      ar: "حلول ويب بس. لما نبقى الأفضل فيها، نفتح تخصص جديد.",
      en: "Web solutions only. We open a new discipline after we master this one.",
    },
    {
      ar_t: "الهيكل قبل الشكل",
      en_t: "Structure before style",
      ar: "المحتوى والمعمار أول، بعدها التصميم يخدمهم.",
      en: "Content and architecture first; design serves them.",
    },
    {
      ar_t: "كود إنتاج",
      en_t: "Production code",
      ar: "مفيش قوالب جاهزة. كل مشروع مبني على معايير performance و SEO.",
      en: "No templates. Every project is built to performance and SEO standards.",
    },
    {
      ar_t: "شراكة مستمرة",
      en_t: "Ongoing partnership",
      ar: "الإطلاق بداية، مش نهاية. بنقيس وبنحسّن.",
      en: "Launch is a start, not an end. We measure and improve.",
    },
  ];

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <span className="label-mono">{t("عن شيفت", "About SHIFT")}</span>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-bold md:text-7xl">
            {t("شركة برمجيات بتخصص واحد واضح", "A software company with one clear specialty")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(
              "SHIFT بدأت من ملاحظة واحدة: في شركات كتير عندها عملاء ومبيعات، لكن كل حضورها الرقمي عايش على صفحة سوشيال. إحنا بنبني البديل — بيت رقمي مملوك ليها، سريع، ومبني على أساس تقني سليم.",
              "SHIFT started from one observation: many businesses have customers and revenue, yet their entire digital presence lives on a social page. We build the alternative — a fast, owned digital home on solid technical foundations.",
            )}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
          <span className="label-mono">{t("العميل المستهدف", "Who we work with")}</span>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
            <div className="bg-background p-8">
              <h2 className="text-2xl font-semibold">{t("مناسب لـ", "A fit for")}</h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {[
                  t("عيادات ومراكز طبية", "Clinics and medical centers"),
                  t("وكالات وشركات خدمات", "Agencies and service firms"),
                  t("متاجر إلكترونية شغّالة", "Operating e-commerce brands"),
                  t("مراكز ومنصات تدريب", "Training centers and platforms"),
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8">
              <h2 className="text-2xl font-semibold">{t("مش مناسب لـ", "Not a fit for")}</h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {[
                  t("فكرة لسه على ورق بدون عملاء", "An idea on paper with no customers"),
                  t("مين بيدور على أرخص سعر", "Whoever is shopping for the cheapest price"),
                  t("قالب جاهز يتسلّم في يومين", "A template delivered in two days"),
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-muted-foreground" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
          <span className="label-mono">{t("مبادئ الشغل", "Principles")}</span>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {principles.map((p, i) => (
              <div key={p.en_t} className="grid gap-4 py-8 md:grid-cols-[6rem_1fr_1fr]">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <h3 className="text-xl font-semibold">{t(p.ar_t, p.en_t)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(p.ar, p.en)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
          <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">
            {t("عندك مشروع؟ يبدأ بمكالمة.", "Have a project? It starts with a call.")}
          </h2>
          <a
            href="https://wa.me/201000000000"
            className="mt-8 inline-flex items-center gap-2 bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("تكلم معنا", "Talk to us")}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
