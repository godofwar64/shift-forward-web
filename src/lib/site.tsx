import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
export type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  theme: Theme;
  t: <T,>(ar: T, en: T) => T;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<Ctx | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const l = localStorage.getItem("shift-lang") as Lang | null;
    const th = localStorage.getItem("shift-theme") as Theme | null;
    if (l === "en" || l === "ar") setLang(l);
    if (th === "light" || th === "dark") setTheme(th);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.classList.toggle("dark", theme === "dark");
  }, [lang, theme]);

  const toggleLang = useCallback(() => {
    setLang((p) => {
      const next = p === "ar" ? "en" : "ar";
      localStorage.setItem("shift-lang", next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((p) => {
      const next = p === "dark" ? "light" : "dark";
      localStorage.setItem("shift-theme", next);
      return next;
    });
  }, []);

  const t = useCallback(<T,>(ar: T, en: T): T => (lang === "ar" ? ar : en), [lang]);

  return (
    <SiteContext.Provider value={{ lang, theme, t, toggleLang, toggleTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

export const services = [
  {
    ar: "لاندينج بيدج",
    en: "Landing Pages",
    price: "10,000",
    ar_desc: "صفحة واحدة مبنية لهدف واحد: التحويل.",
    en_desc: "One page built for one job: conversion.",
  },
  {
    ar: "بورتفوليو / براند",
    en: "Portfolio / Brand",
    price: "12,000",
    ar_desc: "حضور رقمي يعرض شغلك بشكل يستحقه.",
    en_desc: "A digital presence your work deserves.",
  },
  {
    ar: "موقع أعمال",
    en: "Business Website",
    price: "15,000",
    ar_desc: "هيكل كامل لشركة عندها خدمات وعملاء.",
    en_desc: "A full structure for a real service business.",
  },
  {
    ar: "متجر إلكتروني",
    en: "E-commerce",
    price: "18,000",
    ar_desc: "منتجات، سلة، دفع، وتشغيل يومي مستقر.",
    en_desc: "Catalog, cart, checkout, stable operations.",
  },
  {
    ar: "منصة تعليمية",
    en: "Education Platform",
    price: "18,000",
    ar_desc: "كورسات، طلبة، متابعة تقدّم، ومحتوى محمي.",
    en_desc: "Courses, students, progress, protected content.",
  },
  {
    ar: "حل ويب مخصص",
    en: "Custom Web Solution",
    price: null,
    ar_desc: "نظام مبني من الصفر على احتياج البيزنس.",
    en_desc: "A system built from zero around your operation.",
  },
];

export const steps = [
  {
    ar_title: "تشخيص",
    en_title: "Diagnose",
    ar: "نفهم البيزنس، العميل، والرقم اللي محتاج يتحرك.",
    en: "We map the business, the customer, and the number that must move.",
  },
  {
    ar_title: "هيكلة",
    en_title: "Structure",
    ar: "نرسم الهيكل والمحتوى قبل أي تصميم.",
    en: "Structure and content before a single pixel.",
  },
  {
    ar_title: "تنفيذ",
    en_title: "Build",
    ar: "تصميم وبرمجة بمعايير إنتاج حقيقية.",
    en: "Design and engineering at production standard.",
  },
  {
    ar_title: "تشغيل",
    en_title: "Ship",
    ar: "نشر، قياس، وتحسين بعد الإطلاق.",
    en: "Deploy, measure, and refine after launch.",
  },
];
