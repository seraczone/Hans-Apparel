import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { brand, whatsappUrl } from "@/data/store";
import readyToWearVideo from "@/assets/about-ready-to-wear.mp4";
import atelierLookVideo from "@/assets/about-atelier-look.mp4";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story & Contact | HANS Apparel" },
      {
        name: "description",
        content:
          "HANS is an Abuja fashion house creating ready-to-wear and bespoke African fashion. Visit us or message us on WhatsApp.",
      },
      { property: "og:title", content: "Our Story & Contact | HANS Apparel" },
      { property: "og:description", content: "Inside the HANS atelier in Abuja, Nigeria." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A house built on precision"
        copy="HANS designs and tailors elegant African fashion from Abuja, for clients across Nigeria and beyond."
      />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
          <div className="arch-frame min-h-[520px]">
            <div className="arch-shape arch-shape-outer" />
            <div className="arch-shape arch-shape-inner" />
            <video
              src={readyToWearVideo}
              aria-label="A HANS Apparel ready-to-wear look"
              className="arch-image"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div>
            <h2 className="section-title">Our story</h2>
            <p className="mt-6 text-muted-foreground">
              We started with ready-to-wear pieces made for the women around us, people who
              wanted clothing that felt personal rather than loud.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today the house works across ready-to-wear, bespoke commissions and exclusive limited
              pieces, with the same attention given to each.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-secondary/60 px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <h2 className="section-title">In the atelier</h2>
            <p className="mt-6 text-muted-foreground">
              Patterns are drafted by hand, fabric is chosen in person and each garment is pressed
              and checked before it is packed.
            </p>
          </div>
          <div className="arch-frame min-h-[520px] lg:order-1">
            <div className="arch-shape arch-shape-outer" />
            <div className="arch-shape arch-shape-inner" />
            <video
              src={atelierLookVideo}
              aria-label="A HANS Apparel atelier look"
              className="arch-image"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="section-title">Contact</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-3">
            <div><dt className="eyebrow">Studio</dt><dd className="mt-2">{brand.location}</dd></div>
            <div><dt className="eyebrow">Hours</dt><dd className="mt-2">{brand.hours}</dd></div>
            <div><dt className="eyebrow">Instagram</dt><dd className="mt-2">{brand.instagram}</dd></div>
          </dl>
          <Button asChild size="lg" className="mt-10">
            <a href={whatsappUrl("Hello HANS Apparel, I would like to speak with the team.")} target="_blank" rel="noreferrer">
              Message us on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
