import { useState } from "react";
import { z } from "zod";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  useSite,
  projectTypes,
  budgets,
  whatsappLink,
  mailtoLink,
  CONTACT_EMAIL,
} from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(25),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(2).max(80),
  details: z.string().trim().max(1000).optional(),
});

export function ContactForm() {
  const { t, lang } = useSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const labels = {
    name: t("الاسم", "Name"),
    email: t("الإيميل", "Email"),
    phone: t("الموبايل", "Phone"),
    projectType: t("نوع المشروع", "Project type"),
    budget: t("الميزانية", "Budget range"),
    details: t("تفاصيل إضافية", "Extra details"),
  };

  function payload() {
    return {
      [labels.name]: form.name,
      [labels.email]: form.email,
      [labels.phone]: form.phone,
      [labels.projectType]: form.projectType,
      [labels.budget]: form.budget,
      [labels.details]: form.details,
    };
  }

  function validate() {
    const res = schema.safeParse(form);
    if (!res.success) {
      const e: Record<string, string> = {};
      for (const issue of res.error.issues) {
        e[String(issue.path[0])] = t("من فضلك املا الحقل صح", "Please fill this field correctly");
      }
      setErrors(e);
      toast.error(t("في حقول ناقصة أو غير صحيحة", "Some fields are missing or invalid"));
      return false;
    }
    setErrors({});
    return true;
  }

  function send(channel: "whatsapp" | "email") {
    if (!validate()) return;
    const url =
      channel === "whatsapp" ? whatsappLink(lang, payload()) : mailtoLink(lang, payload());
    window.open(url, channel === "whatsapp" ? "_blank" : "_self");
    toast.success(t("تم تجهيز رسالتك ✅", "Your message is ready ✅"));
  }

  const field =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="surface rounded-3xl p-6 md:p-9">
      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          send("whatsapp");
        }}
      >
        {(["name", "email", "phone"] as const).map((k) => (
          <label key={k} className={k === "name" ? "md:col-span-2" : ""}>
            <span className="text-sm font-medium">{labels[k]}</span>
            <input
              className={field}
              type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
              value={form[k]}
              maxLength={255}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              placeholder={labels[k]}
            />
            {errors[k] && <span className="mt-1 block text-xs text-primary">{errors[k]}</span>}
          </label>
        ))}

        <label>
          <span className="text-sm font-medium">{labels.projectType}</span>
          <select
            className={field}
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          >
            <option value="">{t("اختار نوع المشروع", "Select project type")}</option>
            {projectTypes.map((p) => (
              <option key={p.en} value={t(p.ar, p.en)}>
                {t(p.ar, p.en)}
              </option>
            ))}
          </select>
          {errors['projectType'] && (
            <span className="mt-1 block text-xs text-primary">{errors['projectType']}</span>
          )}
        </label>

        <label className="md:col-span-2">
          <span className="text-sm font-medium">{labels.budget}</span>
          <select
            className={field}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value="">{t("اختار الميزانية", "Select budget range")}</option>
            {budgets.map((b) => (
              <option key={b.en} value={t(b.ar, b.en)}>
                {t(b.ar, b.en)}
              </option>
            ))}
          </select>
          {errors['budget'] && <span className="mt-1 block text-xs text-primary">{errors['budget']}</span>}
        </label>

        <label className="md:col-span-2">
          <span className="text-sm font-medium">{labels.details}</span>
          <textarea
            className={field}
            rows={4}
            maxLength={1000}
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder={t("اكتب باختصار عن البيزنس والهدف", "Briefly describe your business and goal")}
          />
        </label>

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button type="submit" className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold">
            <MessageCircle className="size-4" />
            {t("ابعت على واتساب", "Send on WhatsApp")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => send("email")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
          >
            <Mail className="size-4" />
            {t("ابعت بالإيميل", "Send by email")}
          </button>
        </div>
        <p className="text-xs text-muted-foreground md:col-span-2">
          {t(
            `بياناتك بتتبعت مباشرة لينا على واتساب أو ${CONTACT_EMAIL} — مفيش تخزين على الموقع.`,
            `Your details go straight to us on WhatsApp or ${CONTACT_EMAIL} — nothing is stored on the site.`,
          )}
        </p>
      </form>
    </div>
  );
}
