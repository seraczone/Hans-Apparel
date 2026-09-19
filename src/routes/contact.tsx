import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { brand, whatsappUrl } from "@/data/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HANS Apparel | Abuja Fashion House" },
      {
        name: "description",
        content:
          "Contact HANS Apparel in Abuja for ready-to-wear, bespoke fittings, availability and appointments.",
      },
      { property: "og:title", content: "Contact HANS Apparel | Abuja Fashion House" },
      { property: "og:description", content: "Visit or message HANS Apparel in Abuja, Nigeria." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const mapQuery = encodeURIComponent("Abuja Nigeria");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Visit the house"
        copy="Message us for ready-to-wear availability, bespoke appointments, sizing support and delivery details."
      />

      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="flex flex-col justify-between bg-secondary/60 p-8">
            <div>
              <p className="eyebrow">HANS Apparel</p>
              <h2 className="section-title mt-4">Appointments and enquiries</h2>
              <dl className="mt-10 space-y-7">
                <div>
                  <dt className="eyebrow">Studio</dt>
                  <dd className="mt-2 flex items-center gap-3 text-lg">
                    <MapPin className="size-5 text-brand-accent" />
                    {brand.location}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Hours</dt>
                  <dd className="mt-2 text-lg">{brand.hours}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Instagram</dt>
                  <dd className="mt-2 text-lg">{brand.instagram}</dd>
                </div>
              </dl>
            </div>

            <Button asChild size="lg" className="terracotta-button shine-button mt-10 self-start">
              <a
                href={whatsappUrl("Hello HANS Apparel, I would like to make an enquiry.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle />
                Message on WhatsApp
              </a>
            </Button>
          </div>

          <div className="min-h-[460px] border border-border bg-secondary">
            <iframe
              title="Map showing Abuja, Nigeria"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full min-h-[460px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
