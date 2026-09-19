import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/data/store";
import editorial from "@/assets/hans-editorial-model.png";

export const Route = createFileRoute("/bespoke")({
  head: () => ({
    meta: [
      { title: "Bespoke Commissions | HANS Apparel" },
      {
        name: "description",
        content:
          "Commission a bespoke HANS piece: consultation, fitting and delivery from our Abuja atelier.",
      },
      { property: "og:title", content: "Bespoke Commissions | HANS Apparel" },
      { property: "og:description", content: "A garment made precisely for you, by HANS Abuja." },
    ],
  }),
  component: Bespoke,
});

const steps = [
  ["01", "Consultation", "We discuss the occasion, silhouette, fabric and timeline."],
  ["02", "Measurement", "Full measurements are taken and a toile prepared where needed."],
  ["03", "Fitting", "Adjustments are made in person until the fit is exact."],
  ["04", "Delivery", "Final pressing, packaging and handover or dispatch."],
];

function Bespoke() {
  const [form, setForm] = useState({ name: "", occasion: "", date: "", notes: "" });
  const message = `Hello HANS Apparel, I would like to enquire about a bespoke piece.\nName: ${form.name}\nOccasion: ${form.occasion}\nDate needed: ${form.date}\nNotes: ${form.notes}`;

  return (
    <>
      <PageHero
        eyebrow="Bespoke"
        title="Made only for you"
        copy="From first sketch to final fitting, a bespoke HANS piece is shaped entirely around you."
      />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, c]) => (
            <div key={n} className="border-t border-primary pt-5">
              <p className="font-display text-4xl text-brand-accent">{n}</p>
              <h2 className="mt-3 font-display text-2xl">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-secondary/60 px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative flex min-h-[380px] items-end justify-center">
            <div className="absolute bottom-0 h-[86%] w-[74%] rounded-t-full bg-champagne" aria-hidden="true" />
            <img src={editorial} alt="A bespoke HANS look" loading="lazy" className="relative z-10 max-h-[520px] w-auto object-contain" />
          </div>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(whatsappUrl(message), "_blank", "noopener");
            }}
          >
            <h2 className="section-title">Start your enquiry</h2>
            <p className="text-muted-foreground">
              Share a few details and we'll continue the conversation on WhatsApp.
            </p>
            {[
              ["name", "Your name", "text"],
              ["occasion", "Occasion", "text"],
              ["date", "Date needed", "date"],
            ].map(([key, label, type]) => (
              <div key={key}>
                <label htmlFor={key} className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </label>
                <input
                  id={key}
                  type={type}
                  required={key === "name"}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="mt-2 h-12 w-full border border-border bg-background px-4 outline-none focus:border-brand-accent"
                />
              </div>
            ))}
            <div>
              <label htmlFor="notes" className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="mt-2 w-full border border-border bg-background p-4 outline-none focus:border-brand-accent"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send enquiry via WhatsApp
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
