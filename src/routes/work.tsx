import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "أعمال SHIFT — منصات ومواقع شغّالة" },
      {
        name: "description",
        content: "أعمال SHIFT: KupeCut، منصة قطع كابينيت بحوالي 14,000 مستخدم حقيقي.",
      },
      { property: "og:title", content: "SHIFT Work — Live platforms and websites" },
      { property: "og:description", content: "KupeCut: a cutting platform with ~14,000 real users." },
    ],
  }),
  component: Work,
});

function Work() {
  const { t } = useSite();

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <span className="label-mono">{t("الأعمال", "Work")}</span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold md:text-7xl">
            {t("شغل شغّال، مش عرض تصاميم", "Live products, not design mockups")}
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            {t(
              "بنعرض حاجة واحدة بس لأنها الحقيقة الكاملة دلوقتي — منصة في الإنتاج بمستخدمين يوميين.",
              "We show one case because it is the whole truth today — a platform in production with daily users.",
            )}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <div className="surface p-8 md:p-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="label-mono">KupeCut · Web Platform</span>
              <a
                href="https://kupecut.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                kupecut.com <ArrowUpRight className="size-4" />
              </a>
            </div>
            <h2 className="mt-8 text-3xl font-bold md:text-6xl">
              {t("منصة قطع الكابينيت", "The cabinet cutting platform")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(
                "منصة بتحوّل مقاسات الكابينيت لخطة قطع دقيقة. بتوفر وقت وخشب على الورش، وبتستخدم يومياً كأداة إنتاج مش كموقع تعريفي.",
                "A platform that turns cabinet dimensions into an exact cutting plan. It saves workshops time and material, and it is used daily as a production tool rather than a brochure site.",
              )}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {[
                { k: "~14,000", v: t("مستخدم حقيقي", "real users") },
                { k: "Production", v: t("حالة المنصة", "platform status") },
                { k: "Co-founder / CTO", v: t("دور عسام", "Essam's role") },
                { k: "Web", v: t("النوع", "category") },
              ].map((s) => (
                <div key={s.k} className="bg-card p-5">
                  <dt className="font-mono text-lg font-medium md:text-xl">{s.k}</dt>
                  <dd className="label-mono mt-2">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
          <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">
            {t("مشروعك يقدر يكون الحالة الجاية", "Your project can be the next case")}
          </h2>
          <a
            href="https://wa.me/201000000000"
            className="mt-8 inline-flex items-center gap-2 bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("ابدأ مشروع", "Start a project")}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
