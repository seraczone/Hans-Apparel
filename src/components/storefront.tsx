import { Link } from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowRight, Heart, Instagram, Menu, MessageCircle, Minus, Play, Plus, Search, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/hans-logo-uploaded.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { brand, formatPrice, products, whatsappUrl, type Product } from "@/data/store";

type StoreContextValue = {
  cart: Product[];
  wishlist: string[];
  addToCart: (p: Product) => void;
  toggleWishlist: (id: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart: (p) => setCart((c) => [...c, p]),
        toggleWishlist: (id) => setWishlist((w) => (w.includes(id) ? w.filter((item) => item !== id) : [...w, id])),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const value = useContext(StoreContext);
  if (!value) throw new Error("StoreProvider missing");
  return value;
};

const nav = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["FAQ", "/faq"],
] as const;

function SearchDialog() {
  const [query, setQuery] = useState("");
  const results = query ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-champagne bg-background p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-normal">Search HANS Apparel</DialogTitle>
          <DialogDescription>Find a piece by name or style.</DialogDescription>
        </DialogHeader>
        <label className="sr-only" htmlFor="site-search">
          Search products
        </label>
        <input
          id="site-search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the collection..."
          className="h-14 border-b border-primary bg-transparent text-lg outline-none placeholder:text-muted-foreground"
        />
        {results.map((p) => (
          <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-4 border-b border-border py-3">
            <img src={p.images[0]} alt="" className="h-16 w-12 object-cover" />
            <span>{p.name}</span>
            <span className="ml-auto text-sm">{formatPrice(p.price)}</span>
          </Link>
        ))}
      </DialogContent>
    </Dialog>
  );
}

function CartSheet() {
  const { cart } = useStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Shopping bag with ${cart.length} items`} className="relative">
          <ShoppingBag />
          {cart.length > 0 && (
            <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center bg-brand-accent px-1 text-[9px] text-primary-foreground">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-normal">Your bag</SheetTitle>
          <SheetDescription>{cart.length ? `${cart.length} piece${cart.length > 1 ? "s" : ""} selected` : "Your bag is ready for something memorable."}</SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-5">
          {cart.map((p, i) => (
            <div key={`${p.id}-${i}`} className="flex gap-4 border-b border-border pb-5">
              <img src={p.images[0]} alt="" className="h-28 w-20 object-cover" />
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{formatPrice(p.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Minus size={14} />
                  <span className="text-xs">1</span>
                  <Plus size={14} />
                </div>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <Button asChild className="shine-button w-full">
              <a href={whatsappUrl(`Hello HANS Apparel, I would like to order: ${cart.map((p) => p.name).join(", ")}`)} target="_blank" rel="noreferrer">
                Complete on WhatsApp
              </a>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link to="/" aria-label="HANS Apparel home" className="block h-12 w-36 overflow-hidden">
            <img src={logo} alt="HANS Apparel" className="h-full w-full scale-[1.36] object-contain" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, to]) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="nav-link">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-0.5">
            <SearchDialog />
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex">
              <Heart />
            </Button>
            <CartSheet />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full bg-primary text-primary-foreground">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Browse HANS Apparel</SheetDescription>
                </SheetHeader>
                <div className="mt-12 h-20 w-56 overflow-hidden">
                  <img src={logo} alt="HANS Apparel" className="h-full w-full scale-[1.2] object-contain invert brightness-0" />
                </div>
                <nav className="mt-12 flex flex-col">
                  {nav.map(([label, to]) => (
                    <Link key={`${label}-${to}`} to={to} className="border-b border-primary-foreground/20 py-4 font-display text-3xl">
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <article className="product-card group min-w-0">
      <div className="product-card-stage">
        <div className="product-card-inner">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="product-card-face product-card-front">
            <img
              src={product.images[0]}
              alt={`${product.name} by HANS Apparel`}
              loading="lazy"
              width={1024}
              height={1408}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
            />
          </Link>
          <div className="product-card-face product-card-back bg-primary p-5 text-primary-foreground">
            <p className="eyebrow text-brand-sand">{product.collection}</p>
            <h3 className="mt-4 font-display text-3xl leading-tight">{product.name}</h3>
            <p className="mt-4 text-sm text-primary-foreground/75">{product.description}</p>
            <Button onClick={() => addToCart(product)} variant="light" className="shine-button mt-auto w-full">
              Add to bag
            </Button>
          </div>
        </div>
        <Button
          variant="light"
          size="icon"
          aria-label={`${wishlist.includes(product.id) ? "Remove" : "Add"} ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 z-10"
        >
          <Heart className={wishlist.includes(product.id) ? "fill-current" : ""} />
        </Button>
      </div>
      <div className="pt-4">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{product.category}</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="font-medium">
            {product.name}
          </Link>
          <span className="shrink-0 text-sm">{formatPrice(product.price)}</span>
        </div>
      </div>
    </article>
  );
}

export function SectionHeading({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title max-w-3xl whitespace-pre-line">{title}</h2>
        {copy && <p className="mt-4 max-w-xl text-muted-foreground">{copy}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="border-b border-border bg-secondary/50 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-[84px]">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{copy}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="bg-primary px-5 pb-8 pt-20 text-primary-foreground lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-end gap-3">
            <img src={logo} alt="HANS Apparel" className="h-24 w-60 object-contain invert brightness-0" />
          </div>
          <p className="mt-5 max-w-xs text-sm text-primary-foreground/70">
            Ready-to-wear, bespoke and exclusive African fashion from Abuja.
          </p>
        </div>
        {[
          ["SHOP", "New Arrivals", "Ready-to-Wear", "Bespoke", "Collections", "Best Sellers"],
          ["ABOUT", "Our Story", "Craftsmanship", "Journal", "Contact"],
          ["HELP", "Shipping", "Returns", "FAQs", "Privacy", "Terms"],
          ["CONTACT", brand.location, brand.hours, "WhatsApp", "Instagram"],
        ].map(([title, ...links]) => (
          <div key={title}>
            <h3 className="text-[10px] uppercase tracking-[0.18em] text-brand-sand">{title}</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              {links.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-[10px] uppercase tracking-[0.15em] text-primary-foreground/55 sm:flex-row">
        <span>Copyright HANS Apparel. All rights reserved.</span>
        <span>{brand.instagram}</span>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("Hello HANS Apparel, I would like to know more about your pieces.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with HANS Apparel on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center bg-brand-accent text-primary-foreground shadow-soft transition-transform duration-700 hover:-translate-y-1"
    >
      <MessageCircle />
    </a>
  );
}

export { ArrowRight, Instagram, Play, X };
