import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, ProductCard } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { products } from "@/data/store";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | HANS Apparel" },
      {
        name: "description",
        content: "Explore the HANS collections: The New HANS Edit, Modern Heritage and After Dark.",
      },
      { property: "og:title", content: "Collections | HANS Apparel" },
      { property: "og:description", content: "Seasonal edits from the HANS atelier in Abuja." },
    ],
  }),
  component: Collections,
});

function Collections() {
  const names = Array.from(new Set(products.map((p) => p.collection)));
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Edits from the house"
        copy="Each collection explores one idea: structure, heritage or evening light."
      />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-[1440px] space-y-24">
          {names.map((name, i) => {
            const collectionProducts = products.filter((p) => p.collection === name);
            const heroProduct = collectionProducts[0];

            return (
            <div key={name}>
              <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                <img
                  src={heroProduct.images[0]}
                  alt={`${heroProduct.name} from ${name}`}
                  loading="lazy"
                  className={`aspect-[4/3] w-full object-cover object-top ${i % 2 ? "lg:order-2" : ""}`}
                />
                <div>
                  <p className="eyebrow">Collection 0{i + 1}</p>
                  <h2 className="section-title mt-3">{name}</h2>
                  <p className="mt-5 text-muted-foreground">
                    A focused group of silhouettes, released in limited numbers and finished in our
                    Abuja atelier.
                  </p>
                  <Button asChild variant="outline" className="mt-7">
                    <Link to="/shop">Shop this edit</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
                {collectionProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )})}
        </div>
      </section>
    </>
  );
}
