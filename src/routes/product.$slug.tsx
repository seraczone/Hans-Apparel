import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { ProductCard, SectionHeading, useStore } from "@/components/storefront";
import { Button } from "@/components/ui/button";
import { formatPrice, products, whatsappUrl } from "@/data/store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Piece not found | HANS Apparel" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | HANS Apparel` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | HANS Apparel` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-5 py-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:px-10">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
      </nav>
      <section className="px-5 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2">
          <div className="grid gap-4">
            {product.images.map((img) => (
              <img key={img} src={img} alt={`${product.name} by HANS`} className="aspect-[3/4] w-full bg-secondary object-cover" />
            ))}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{product.collection}</p>
            <h1 className="mt-3 font-display text-5xl leading-tight">{product.name}</h1>
            <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>
            <p className="mt-6 text-muted-foreground">{product.description}</p>

            <fieldset className="mt-8">
              <legend className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Size</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button key={s} size="sm" variant={s === size ? "default" : "outline"} onClick={() => setSize(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => addToCart(product)}>
                Add to bag
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={whatsappUrl(
                    `Hello HANS Apparel, I'm interested in the ${product.name} (size ${size}). ${typeof window !== "undefined" ? window.location.href : ""}`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order via WhatsApp
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label={`${wishlist.includes(product.id) ? "Remove from" : "Add to"} wishlist`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={wishlist.includes(product.id) ? "fill-current" : ""} />
              </Button>
            </div>

            <dl className="mt-10 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <div className="flex justify-between"><dt>Category</dt><dd>{product.category}</dd></div>
              <div className="flex justify-between"><dt>Colour</dt><dd>{product.colors.join(", ")}</dd></div>
              <div className="flex justify-between"><dt>Reference</dt><dd>{product.sku}</dd></div>
              <div className="flex justify-between"><dt>Availability</dt><dd>{product.stock} in stock</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-5 pb-24 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <SectionHeading eyebrow="You may also like" title="Complete the look" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
