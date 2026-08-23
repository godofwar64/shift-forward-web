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
  const [theme, setTheme] = useState<Theme>("light");

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

/* ---------------- contact / CTA ---------------- */

export const WHATSAPP_NUMBER = "201000000000";
export const CONTACT_EMAIL = "hello@shift.software";

export function inquiryMessage(lang: Lang, extra?: Record<string, string | undefined>) {
  const lines =
    lang === "ar"
      ? ["السلام عليكم SHIFT 👋", "عايز أبدأ مشروع ويب معاكم."]
      : ["Hi SHIFT 👋", "I'd like to start a web project with you."];
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v) lines.push(`${k}: ${v}`);
    }
  }
  return lines.join("\n");
}

export function whatsappLink(lang: Lang, extra?: Record<string, string | undefined>) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(inquiryMessage(lang, extra))}`;
}

export function mailtoLink(lang: Lang, extra?: Record<string, string | undefined>) {
  const subject = lang === "ar" ? "طلب مشروع ويب" : "New web project inquiry";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    inquiryMessage(lang, extra),
  )}`;
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

export const projectTypes = [
  { ar: "لاندينج بيدج", en: "Landing Page" },
  { ar: "بورتفوليو / براند", en: "Portfolio / Brand" },
  { ar: "موقع أعمال", en: "Business Website" },
  { ar: "متجر إلكتروني", en: "E-commerce" },
  { ar: "منصة تعليمية", en: "Education Platform" },
  { ar: "حل ويب مخصص", en: "Custom Web Solution" },
];

export const budgets = [
  { ar: "أقل من 10,000 جنيه", en: "Under EGP 10,000" },
  { ar: "10,000 – 15,000 جنيه", en: "EGP 10,000 – 15,000" },
  { ar: "15,000 – 25,000 جنيه", en: "EGP 15,000 – 25,000" },
  { ar: "أكثر من 25,000 جنيه", en: "EGP 25,000+" },
  { ar: "لسه مش محدد", en: "Not decided yet" },
];

/* ---------------- testimonials ---------------- */

export const testimonials = [
  {
    ar_name: "م. أحمد صبري",
    en_name: "Eng. Ahmed Sabry",
    ar_role: "صاحب ورشة نجارة، القاهرة",
    en_role: "Woodworking workshop owner, Cairo",
    ar: "بقيت أحسب القطع في دقايق بدل ساعات، والهدر قل بشكل واضح. الأداة بقت جزء من يوم الشغل.",
    en: "Cutting plans now take minutes instead of hours, and waste dropped noticeably. The tool became part of our day.",
  },
  {
    ar_name: "منة عبد الله",
    en_name: "Menna Abdullah",
    ar_role: "مؤسسة براند منتجات هاند ميد",
    en_role: "Founder, handmade products brand",
    ar: "أول مرة يكون عندي موقع بيشرح شغلي بدل ما أشرح كل حاجة في الرسايل. الطلبات الجدّية زادت.",
    en: "For the first time my site explains the work instead of me repeating it in DMs. Serious orders went up.",
  },
  {
    ar_name: "كريم مصطفى",
    en_name: "Karim Mostafa",
    ar_role: "مدير تسويق، شركة خدمات",
    en_role: "Marketing lead, services company",
    ar: "التعامل واضح ومنظم: مراحل، مواعيد، وتسليم شغّال. مفيش مفاجآت في النص.",
    en: "Clear, organised process: stages, dates, a working delivery. No surprises halfway.",
  },
];

/* ---------------- case studies ---------------- */

export type Project = {
  slug: string;
  name: string;
  ar_title: string;
  en_title: string;
  ar_tag: string;
  en_tag: string;
  year: string;
  role_ar: string;
  role_en: string;
  ar_summary: string;
  en_summary: string;
  ar_challenge: string;
  en_challenge: string;
  ar_approach: string;
  en_approach: string;
  outcomes: { k: string; ar: string; en: string }[];
  stack: string[];
  gallery: { src: string; ar_alt: string; en_alt: string }[];
  url?: string;
};

import kupecut1 from "@/assets/case-kupecut-1.jpg";
import kupecut2 from "@/assets/case-kupecut-2.jpg";

export const projects: Project[] = [
  {
    slug: "kupecut",
    name: "KupeCut",
    ar_title: "منصة قطع الكابينيت",
    en_title: "Cabinet cutting platform",
    ar_tag: "منصة إنتاج",
    en_tag: "Production platform",
    year: "2023 — الآن",
    role_ar: "شريك مؤسس و CTO",
    role_en: "Co-founder & CTO",
    ar_summary:
      "أداة إنتاج بيستخدمها آلاف الحرفيين والورش لحساب وتخطيط قطع الألواح بأقل هدر ممكن.",
    en_summary:
      "A production tool used by thousands of workshops to plan panel cuts with the least possible waste.",
    ar_challenge:
      "الورش كانت بتحسب القطع بالورقة والقلم أو على إكسل. النتيجة: وقت طويل، أخطاء قياس، وهدر خشب مكلف كل شهر.",
    en_challenge:
      "Workshops planned cuts on paper or in spreadsheets: slow, error-prone, and expensive in wasted material every month.",
    ar_approach:
      "بنينا محرك تحسين قطع سريع يشتغل على الموبايل، مع واجهة عربية بسيطة تناسب حد واقف في الورشة، ونتيجة قابلة للطباعة فوراً.",
    en_approach:
      "We built a fast cut-optimisation engine that runs on mobile, wrapped in a simple Arabic-first interface for someone standing in a workshop, with print-ready output.",
    outcomes: [
      { k: "~14,000", ar: "مستخدم مسجل", en: "registered users" },
      { k: "دقايق", ar: "بدل ساعات لكل خطة قطع", en: "instead of hours per cut plan" },
      { k: "87%+", ar: "متوسط استغلال اللوح", en: "average panel utilisation" },
      { k: "24/7", ar: "تشغيل مستمر في الإنتاج", en: "running in production" },
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
    gallery: [
      {
        src: kupecut2,
        ar_alt: "واجهة تخطيط القطع في KupeCut",
        en_alt: "KupeCut panel layout planning interface",
      },
      {
        src: kupecut1,
        ar_alt: "لوحة تحكم KupeCut للأرقام والمتابعة",
        en_alt: "KupeCut analytics dashboard",
      },
    ],
    url: "https://kupecut.com",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
