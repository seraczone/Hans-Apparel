import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, ProductCard } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { products } from "@/data/store";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All | HANS Apparel" },
      {
        name: "description",
        content: "Browse HANS ready-to-wear, occasion wear and exclusive pieces, made in Abuja.",
      },
      { property: "og:title", content: "Shop All | HANS Apparel" },
      { property: "og:description", content: "Ready-to-wear, occasion and exclusive HANS pieces." },
    ],
  }),
  component: Shop,
});

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function Shop() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    const filtered = category === "All" ? products : products.filter((p) => p.category === category);
    const sorted = [...filtered];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new") sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    return sorted;
  }, [category, sort]);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="The collection"
        copy="Considered silhouettes for work, celebration and everything in between."
      />
      <section className="px-5 py-14 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={c === category ? "default" : "outline"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 border border-border bg-background px-3 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="new">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>
          <p className="mb-8 text-sm text-muted-foreground">{list.length} pieces</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
