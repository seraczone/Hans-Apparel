import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/storefront";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | HANS Apparel" },
      {
        name: "description",
        content: "Answers about HANS Apparel ordering, fittings, delivery and bespoke commissions.",
      },
      { property: "og:title", content: "FAQ | HANS Apparel" },
      { property: "og:description", content: "Ordering and fitting guidance from HANS Apparel." },
    ],
  }),
  component: FAQ,
});

const questions = [
  {
    question: "How do I place an order?",
    answer: "You can shop available pieces online and complete the order through WhatsApp for sizing and delivery confirmation.",
  },
  {
    question: "Do you offer bespoke pieces?",
    answer: "Yes. Bespoke commissions begin with a consultation, followed by measurements, fitting and final handover.",
  },
  {
    question: "Where is HANS Apparel based?",
    answer: "HANS Apparel is based in Abuja, Nigeria and serves clients across the country.",
  },
  {
    question: "Do you ship nationwide?",
    answer: "Yes. Pieces are carefully packed and dispatched nationwide after payment and confirmation.",
  },
  {
    question: "Can I request a fabric or colour?",
    answer: "For bespoke work, fabric and colour preferences are discussed during consultation before production begins.",
  },
];

function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions before your fitting"
        copy="A quick guide to ordering, appointments, delivery and bespoke work at HANS Apparel."
      />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-[980px] divide-y divide-border border-y border-border">
          {questions.map((item) => (
            <details key={item.question} className="group py-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                {item.question}
                <span className="text-brand-accent transition-transform duration-500 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
