import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Instagram, ProductCard, SectionHeading } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { brand, journalPosts, products, testimonials, whatsappUrl } from "@/data/store";
import heroLady from "@/assets/hans-hero-showroom-repeat-8k.jpg";
import houseModel from "@/assets/hans-house-foreground.png";
import editorialModel from "@/assets/hans-look-blue-floral.jpg";
import campaignVideo from "@/assets/hans-campaign-video.mp4";
import categoryReady from "@/assets/hans-rtw-holland.jpg";
import categoryOccasion from "@/assets/hans-bespoke-pink.jpg";
import craftVideo from "@/assets/hans-craft-video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HANS Apparel | Elegant African Fashion for Every Occasion" },
      {
        name: "description",
        content:
          "Ready-to-wear, bespoke and exclusive African fashion, designed and tailored in Abuja, Nigeria. Order directly via WhatsApp.",
      },
      {
        property: "og:title",
        content: "HANS Apparel | Elegant African Fashion for Every Occasion",
      },
      {
        property: "og:description",
        content: "An Abuja fashion house for ready-to-wear, bespoke and exclusive pieces.",
      },
    ],
  }),
  component: Home,
});

const features = [
  ["Made in Abuja", "Designed and tailored in our atelier"],
  ["Bespoke Fittings", "Pieces shaped precisely to you"],
  ["Nationwide Delivery", "Carefully packed and dispatched"],
  ["WhatsApp Ordering", "A direct, personal service"],
];

const categories = [
  {
    label: "Ready-to-Wear",
    copy: "Signature everyday elegance",
    image: categoryReady,
    span: "lg:col-span-2 lg:row-span-2",
  },
  { label: "Occasion Wear", copy: "For events that matter", image: categoryOccasion, span: "" },
  { label: "Bespoke", copy: "Made only for you", image: editorialModel, span: "" },
];

const marqueeItems = [
  "Bespoke Tailoring",
  "Modest by Design",
  "Nationwide Shipping",
  "Atelier Appointments",
];

const clientReviews = [
  ...testimonials,
  {
    name: "Zainab",
    location: "Kaduna",
    review:
      "The finishing was elegant and the silhouette felt effortless. I wore it all evening with complete confidence.",
  },
  {
    name: "Nkechi",
    location: "Port Harcourt",
    review:
      "HANS understood the occasion immediately. The piece felt personal, polished and beautifully made.",
  },
];

function ArchImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`arch-frame ${className}`}>
      <div className="arch-shape arch-shape-outer" />
      <div className="arch-shape arch-shape-inner" />
      <img src={src} alt={alt} className="arch-image" />
    </div>
  );
}

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newIn = products.filter((p) => p.newArrival).slice(0, 4);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.home-hero), .product-card, .arch-frame",
      ),
    );

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    let frame = 0;
    const updateHeroProgress = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setHeroProgress(Math.min(window.scrollY / 520, 1));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.15 },
    );

    revealTargets.forEach((target, index) => {
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(target);
    });

    updateHeroProgress();
    window.addEventListener("scroll", updateHeroProgress, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateHeroProgress);
    };
  }, []);

  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden border-b border-border bg-primary text-primary-foreground"
        style={{ "--hero-progress": heroProgress } as CSSProperties}
      >
        <img
          src={heroLady}
          alt="Woman wearing a gold floral HANS Apparel ready-to-wear look"
          className="hero-cover-image"
        />
        <div className="hero-panel-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center px-5 py-12 sm:px-10 lg:py-16">
          <div className="hero-copy relative z-10 w-full max-w-[660px] pl-[clamp(0rem,3vw,3rem)] max-sm:max-w-[350px]">
            <p className="eyebrow text-brand-sand">{brand.location} | Est. Fashion House</p>
            <h1
              className="hero-title mt-7 max-w-4xl font-altaca text-[clamp(3rem,6vw,6.8rem)] leading-[0.93] text-primary-foreground max-sm:text-[clamp(2.5rem,12vw,3.4rem)]"
              aria-label="Elegant African Fashion for Every Occasion"
            >
              <span className="hero-word block" style={{ "--word-index": 0 } as CSSProperties}>
                Elegant
              </span>
              <span className="hero-word block" style={{ "--word-index": 1 } as CSSProperties}>
                African
              </span>
              <span className="block whitespace-nowrap">
                <span
                  className="hero-word inline-block"
                  style={{ "--word-index": 2 } as CSSProperties}
                >
                  Fashion
                </span>{" "}
                <span
                  className="hero-word inline-block"
                  style={{ "--word-index": 3 } as CSSProperties}
                >
                  for
                </span>
              </span>
              <span className="hero-word block" style={{ "--word-index": 4 } as CSSProperties}>
                Every
              </span>
              <span className="hero-word block" style={{ "--word-index": 5 } as CSSProperties}>
                Occasion
              </span>
            </h1>
            <div className="hero-rule mt-8 h-px w-28" />
            <div className="mt-8 flex flex-wrap gap-3 max-sm:max-w-[350px] max-sm:[&>a]:w-full">
              <Button asChild size="lg" className="hero-cta-button shine-button">
                <Link to="/shop">
                  Shop the collection <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section border-b border-border py-3">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="marquee-item">
              <span aria-hidden="true">*</span>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="responsive-section px-5 pt-12 pb-24 lg:px-10 lg:pt-14">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
          <ArchImage
            src={houseModel}
            alt="Woman wearing a blue HANS Apparel ready-to-wear look"
            className="house-arch"
          />
          <div>
            <p className="eyebrow">The House</p>
            <h2 className="section-title mt-4">A quiet confidence, cut precisely</h2>
            <p className="mt-6 text-muted-foreground">
              HANS Apparel began with a simple belief: African fashion deserves a language of
              restraint as much as celebration. Every piece is drawn, cut and finished by hand in
              Abuja.
            </p>
            <p className="mt-4 text-muted-foreground">
              We work in considered silhouettes, honest fabric and finishing that holds its shape
              long after the occasion.
            </p>
            <Button asChild className="terracotta-button shine-button mt-8">
              <Link to="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="responsive-section px-5 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading eyebrow="Shop by category" title={"Find your\noccasion"} />
          <div className="category-grid grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {categories.map((c) => (
              <Link
                key={c.label}
                to="/shop"
                className={`group relative min-h-[260px] overflow-hidden bg-secondary ${c.span}`}
              >
                <img
                  src={c.image}
                  alt={`${c.label} by HANS Apparel`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                  <h3 className="font-display text-3xl text-primary-foreground">{c.label}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">{c.copy}</p>
                </div>
              </Link>
            ))}
            <div className="flex flex-col justify-center bg-primary p-8 text-primary-foreground">
              <h3 className="font-display text-3xl">Exclusive pieces</h3>
              <p className="mt-3 text-sm text-primary-foreground/75">
                Limited silhouettes released in small numbers.
              </p>
              <Button
                asChild
                variant="light"
                className="terracotta-button shine-button mt-6 self-start"
              >
                <Link to="/collections">View collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="responsive-section px-5 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Just in"
            title="New arrivals"
            action={
              <Button asChild variant="outline" className="shine-button">
                <Link to="/shop">
                  View all <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="product-grid grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <video
          src={campaignVideo}
          className="h-[520px] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="HANS Apparel seasonal campaign"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-center px-5 text-primary-foreground lg:px-10">
          <p className="eyebrow text-brand-sand">Campaign</p>
          <h2 className="section-title mt-4 max-w-2xl">The New HANS Apparel Edit</h2>
          <p className="mt-5 max-w-lg text-primary-foreground/85">
            Sculpted tailoring and fluid drape, photographed inside the warm world of HANS Apparel.
          </p>
          <Button
            asChild
            variant="light"
            className="terracotta-button shine-button mt-8 self-start"
          >
            <Link to="/collections">Explore the edit</Link>
          </Button>
        </div>
      </section>

      <section className="responsive-section px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading eyebrow="Best sellers" title="Pieces our clients return for" />
          <div className="product-grid grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="responsive-section bg-secondary/60 px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
          <video
            src={craftVideo}
            className="aspect-[4/5] w-full bg-primary object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
          <div>
            <p className="eyebrow">Craftsmanship</p>
            <h2 className="section-title mt-4">Every finish is intentional</h2>
            <p className="mt-6 text-muted-foreground">
              Patterns are drafted by hand, fabrics selected in person and each garment passes a
              final fitting before it leaves the atelier.
            </p>
            <Button asChild variant="outline" className="shine-button mt-8">
              <Link to="/about">Inside the atelier</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="responsive-section bg-primary px-5 py-24 text-primary-foreground lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-brand-sand">Bespoke</p>
          <h2 className="section-title mt-4 max-w-3xl">Commission something made only for you</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              ["01", "Consultation", "We discuss the occasion, silhouette and fabric."],
              ["02", "Fitting", "Measurements taken and a first fitting scheduled."],
              ["03", "Delivery", "Final adjustments, pressing and handover."],
            ].map(([n, t, c]) => (
              <div key={n} className="border-t border-primary-foreground/20 pt-5">
                <p className="font-display text-4xl text-brand-sand">{n}</p>
                <h3 className="mt-3 text-lg">{t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{c}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="light" className="terracotta-button shine-button mt-12">
            <Link to="/bespoke">Start a bespoke enquiry</Link>
          </Button>
        </div>
      </section>

      <section className="responsive-section overflow-hidden px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading eyebrow="Clients" title="In their words" />
          <div className="testimonial-slider" aria-label="Customer reviews">
            <div className="testimonial-track">
              {[...clientReviews, ...clientReviews].map((t, index) => (
                <figure key={`${t.name}-${index}`} className="testimonial-card">
                  <blockquote className="font-display text-xl leading-snug">
                    "{t.review}"
                  </blockquote>
                  <figcaption className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {t.name} | {t.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="sr-only">
            {clientReviews.map((t) => (
              <p key={t.name}>
                {t.name}, {t.location}: {t.review}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="responsive-section px-5 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Journal"
            title="Notes from the house"
            action={
              <Button asChild variant="outline" className="shine-button">
                <Link to="/journal">Read the journal</Link>
              </Button>
            }
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {journalPosts.map((post) => (
              <article key={post.title} className="border-t border-primary pt-5">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 font-display text-2xl">{post.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="responsive-section px-5 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading eyebrow={brand.instagram} title="Follow the house" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="group relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={p.images[0]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-primary/50 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <Instagram className="text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="responsive-section border-y border-border bg-secondary/60 px-5 py-24 text-center lg:px-10">
        <h2 className="section-title mx-auto max-w-3xl">Let's dress your next occasion</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Message us on WhatsApp for sizing, availability or a bespoke commission.
        </p>
        <Button asChild size="lg" className="terracotta-button shine-button mt-8">
          <a
            href={whatsappUrl("Hello HANS Apparel, I would like to place an order.")}
            target="_blank"
            rel="noreferrer"
          >
            Order via WhatsApp
          </a>
        </Button>
      </section>
    </>
  );
}
