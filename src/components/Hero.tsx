import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import cloudsBack from "@/assets/clouds-back.jpg";
import cloudsFront from "@/assets/clouds-front.png";
import { useSite, whatsappLink } from "@/lib/site";

export function Hero() {
  const { t, lang } = useSite();
  const [y, setY] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        setY(window.scrollY);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-sky">
      {/* sky layer — moves slowest */}
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{ transform: `translate3d(0, ${y * 0.25}px, 0)` }}
      >
        <img
          src={cloudsBack}
          alt=""
          width={1920}
          height={1088}
          className="h-[120%] w-full scale-105 object-cover opacity-90 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky/70 via-transparent to-background" />
      </div>

      {/* hairline grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 hairline-grid opacity-50"
        style={{ transform: `translate3d(0, ${y * 0.15}px, 0)` }}
      />

      {/* drifting cloud layers */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] -z-10 h-[70%]"
        style={{ transform: `translate3d(0, ${y * -0.12}px, 0)` }}
      >
        <div className="cloud-drift-slow absolute inset-0 flex">
          <img src={cloudsFront} alt="" className="h-full w-[100vw] shrink-0 object-cover object-bottom dark:opacity-25" />
          <img src={cloudsFront} alt="" className="h-full w-[100vw] shrink-0 object-cover object-bottom dark:opacity-25" />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-14%] -z-10 h-[60%]"
        style={{ transform: `translate3d(0, ${y * -0.28}px, 0)` }}
      >
        <div className="cloud-drift-fast absolute inset-0 flex opacity-80">
          <img src={cloudsFront} alt="" className="h-full w-[100vw] shrink-0 scale-y-110 object-cover object-bottom dark:opacity-20" />
          <img src={cloudsFront} alt="" className="h-full w-[100vw] shrink-0 scale-y-110 object-cover object-bottom dark:opacity-20" />
        </div>
      </div>

      {/* content */}
      <div
        className="relative mx-auto flex min-h-[92vh] max-w-[1240px] flex-col items-center px-5 pb-40 pt-28 text-center md:px-8 md:pt-36"
        style={{ opacity: Math.max(0, 1 - y / 620) }}
      >
        <span className="fade-up rounded-full border border-border/80 bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
          {t("شركة برمجيات · القاهرة", "Software company · Cairo")}
        </span>

        <h1 className="fade-up mt-8 max-w-4xl text-[2.7rem] leading-[1.05] font-bold tracking-tight md:text-[4.6rem]">
          {lang === "ar" ? (
            <>
              برمجيات <span className="text-primary">تحرّك</span> الأعمال للأمام.
            </>
          ) : (
            <>
              Software that <span className="text-primary">moves</span> business forward.
            </>
          )}
        </h1>

        <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(
            "بنبني حلول ويب للشركات اللي عندها عملاء حقيقيين — من صفحة واحدة بتبيع، لمنصة كاملة بتشتغل كل يوم.",
            "We build web solutions for businesses with real customers — from a single page that sells to a platform that runs every day.",
          )}
        </p>

        <div className="fade-up mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
          >
            {t("ابدأ مشروعك", "Start your project")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </a>
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-primary"
          >
            {t("واتساب مباشر", "WhatsApp us")}
          </a>
        </div>

        <div className="fade-up mt-auto pt-24">
          <div className="rounded-2xl border border-border bg-background/70 px-6 py-4 backdrop-blur">
            <p className="text-sm font-semibold">
              {t("منصة شغّالة بحوالي 14,000 مستخدم", "A live platform with ~14,000 users")}
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span className="flex text-primary">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("KupeCut · إنتاج حقيقي", "KupeCut · real production")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
