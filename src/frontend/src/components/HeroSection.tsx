import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-water-bg.dim_1920x1080.jpg')",
        }}
      />
      {/* Directional overlay — lighter centre lets the image breathe */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy/40 to-navy-deep/75" />
      {/* Edge vignette for text legibility without crushing centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, oklch(0.10 0.04 240 / 0.55) 100%)",
        }}
      />
      {/* Subtle noise texture via CSS */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent to-gold/50" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-gold/60" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/90 font-medium">
            Patna's Premier Custom Water
          </span>
          <div className="h-px w-12 bg-gold/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-thin text-white leading-[1.02] mb-6 tracking-[-0.01em]"
        >
          Water, <span className="italic text-gold">Refined</span>
          <br />
          for the Finest.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Custom-branded bottled water crafted for luxury hotels and elite cafes
          across Patna. Every bottle is a statement of your brand's identity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => handleScroll("#portfolio")}
            className="bg-gold hover:bg-gold-light text-navy font-body font-semibold text-sm tracking-widest uppercase px-10 py-6 rounded-none shadow-gold hover:shadow-gold-lg transition-all"
            data-ocid="hero.primary_button"
          >
            View Our Portfolio
          </Button>
          <Button
            onClick={() => handleScroll("#quote")}
            variant="outline"
            className="border border-white/40 hover:border-gold text-white hover:text-gold bg-transparent hover:bg-white/5 font-body font-semibold text-sm tracking-widest uppercase px-10 py-6 rounded-none transition-all"
            data-ocid="hero.secondary_button"
          >
            Request a Quote
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        aria-label="Scroll down"
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
