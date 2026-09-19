import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/storefront";
import { journalPosts } from "@/data/store";
import campaign from "@/assets/hans-campaign.jpg";
import craft from "@/assets/hans-craft.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal | HANS Apparel" },
      {
        name: "description",
        content: "Style notes, atelier stories and bespoke guidance from the HANS fashion house.",
      },
      { property: "og:title", content: "Journal | HANS Apparel" },
      { property: "og:description", content: "Notes on style and craft from HANS, Abuja." },
    ],
  }),
  component: Journal,
});

const images = [campaign, craft, campaign];

function Journal() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the house"
        copy="Thoughts on dressing, craft and the process behind each HANS piece."
      />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-3">
          {journalPosts.map((post, i) => (
            <article key={post.title}>
              <img src={images[i]} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <p className="eyebrow mt-5">{post.category}</p>
              <h2 className="mt-3 font-display text-2xl">{post.title}</h2>
              <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
