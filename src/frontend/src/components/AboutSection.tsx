import { Award, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: Sparkles,
    title: "100% Customizable",
    description:
      "From label design to bottle shape — every detail tailored to embody your brand's unique identity.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Rapid production cycles ensure your branded water is ready when your guests arrive.",
  },
  {
    icon: Award,
    title: "Trusted by Elite Venues",
    description:
      "Preferred partner of Patna's most distinguished hotels, restaurants, and boutique cafes.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-cream" data-ocid="about.section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                Our Story
              </span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-light text-navy leading-[1.1] mb-8">
              The Art of <span className="italic">Branded</span> Water
            </h2>
            <div className="space-y-5 text-muted-foreground font-body leading-relaxed text-base">
              <p>
                Fresh Flow was born from a simple belief: that even the most
                everyday touchpoint — a bottle of water — can become a powerful
                expression of your brand's character.
              </p>
              <p>
                We partner with the most discerning hotels and cafes in Patna to
                deliver custom-branded premium water. Every bottle is a
                statement of your brand's identity — from label design to bottle
                shape, chosen with care and executed with precision.
              </p>
              <p>
                Whether you're welcoming a VIP guest, setting a table at your
                finest restaurant, or presenting a premium experience in your
                spa, Fresh Flow ensures your water is as refined as the
                experience you've curated.
              </p>
            </div>
          </motion.div>

          {/* Visual accent column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative box */}
            <div className="relative">
              {/* Background accent */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-navy/8 rounded-none" />
              <div className="absolute -top-3 -right-3 w-full h-full border border-gold/20 rounded-none" />

              {/* Stat highlights */}
              <div className="relative bg-navy rounded-none p-10 shadow-navy">
                <div className="space-y-8">
                  {highlights.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                      className={`flex gap-5 ${idx < highlights.length - 1 ? "pb-8 border-b border-white/10" : ""}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                        <item.icon
                          className="w-4.5 h-4.5 text-gold"
                          size={18}
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-white font-medium mb-1">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating gold accent */}
            <motion.div
              className="absolute -bottom-8 -left-8 w-24 h-24 border-2 border-gold/25 rounded-none"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
