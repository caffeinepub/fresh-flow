import { motion } from "motion/react";

const bottles = [
  {
    image: "/assets/generated/bottle-hotel-signature.dim_600x900.png",
    name: "Hotel Signature",
    descriptor: "Navy & Gold — crafted for 5-star hotel rooms",
    category: "Hotel",
  },
  {
    image: "/assets/generated/bottle-cafe-artisan.dim_600x900.png",
    name: "Cafe Artisan",
    descriptor: "Earthy & warm tones for boutique cafes",
    category: "Cafe",
  },
  {
    image: "/assets/generated/bottle-corporate-classic.dim_600x900.png",
    name: "Corporate Classic",
    descriptor: "Clean charcoal for boardrooms & corporate venues",
    category: "Corporate",
  },
  {
    image: "/assets/generated/bottle-spa-botanical.dim_600x900.png",
    name: "Spa Botanical",
    descriptor: "Soft greens for wellness retreats",
    category: "Spa",
  },
  {
    image: "/assets/generated/bottle-fine-dining.dim_600x900.png",
    name: "Fine Dining",
    descriptor: "Black & gold for upscale restaurants",
    category: "Dining",
  },
  {
    image: "/assets/generated/bottle-event-gala.dim_600x900.png",
    name: "Event Gala",
    descriptor: "Teal & champagne for banquets and events",
    category: "Events",
  },
];

const ocids = [
  "portfolio.item.1",
  "portfolio.item.2",
  "portfolio.item.3",
  "portfolio.item.4",
  "portfolio.item.5",
  "portfolio.item.6",
] as const;

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-32 bg-background"
      data-ocid="portfolio.section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
              Portfolio
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-navy leading-[1.1]">
            Our Signature Designs
          </h2>
          <p className="font-body text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
            Each design tells a story. Choose a style or let us create something
            entirely bespoke for your venue.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bottles.map((bottle, idx) => (
            <motion.article
              key={bottle.name}
              data-ocid={ocids[idx]}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative bg-cream overflow-hidden cursor-default shadow-xs hover:shadow-card-hover transition-all duration-500"
            >
              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-body text-[10px] tracking-[0.25em] uppercase text-gold bg-navy/90 backdrop-blur-sm px-3 py-1.5">
                  {bottle.category}
                </span>
              </div>

              {/* Image container — radial spotlight so bottle pops */}
              <div
                className="relative overflow-hidden aspect-[2/3]"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 45%, oklch(0.97 0.018 75) 0%, oklch(0.91 0.014 75) 100%)",
                }}
              >
                <motion.img
                  src={bottle.image}
                  alt={bottle.name}
                  className="w-full h-full object-contain py-8 px-6"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  loading="lazy"
                />
                {/* Sheen sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none bg-gradient-to-tr from-transparent via-white/12 to-transparent" />
              </div>

              {/* Info — seamless continuation, no hard divider */}
              <div className="px-6 pt-5 pb-6 bg-cream">
                <h3 className="font-display text-xl text-navy font-medium mb-1 leading-snug">
                  {bottle.name}
                </h3>
                {/* Gold reveal rule under name — appears on hover */}
                <div className="h-px w-0 group-hover:w-8 bg-gold transition-all duration-400 mb-2" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {bottle.descriptor}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="font-body text-muted-foreground text-sm mb-6">
            Don't see exactly what you envision?
          </p>
          <button
            type="button"
            onClick={() => {
              document
                .querySelector("#quote")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold hover:text-gold-dark transition-colors tracking-wider uppercase border-b border-gold/40 hover:border-gold pb-0.5"
          >
            Request a Bespoke Design
          </button>
        </motion.div>
      </div>
    </section>
  );
}
