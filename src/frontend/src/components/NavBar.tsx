import { Button } from "@/components/ui/button";
import { Droplets, Menu, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavBarProps {
  onAdminClick: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Request a Quote", href: "#quote" },
];

export default function NavBar({ onAdminClick }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-navy" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
            <Droplets className="w-4 h-4 text-gold" />
          </div>
          <span className="font-display text-xl font-semibold tracking-wide text-white">
            Fresh<span className="text-gold">Flow</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="font-body text-sm font-medium text-white/80 hover:text-gold transition-colors tracking-wider uppercase"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              onAdminClick();
              setMobileOpen(false);
            }}
            variant="outline"
            className="hidden lg:flex items-center gap-2 border-white/30 text-white/80 hover:text-gold hover:border-gold bg-transparent font-body font-medium text-sm tracking-widest uppercase transition-all px-4 py-2 rounded-none"
            data-ocid="nav.admin_button"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </Button>
          <Button
            onClick={() => handleNavClick("#quote")}
            className="hidden lg:flex bg-gold hover:bg-gold-light text-navy font-body font-semibold text-sm tracking-widest uppercase transition-all px-6 py-2 rounded-none shadow-gold hover:shadow-gold-lg"
            data-ocid="nav.primary_button"
          >
            Get a Quote
          </Button>
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-base text-white/80 hover:text-gold transition-colors tracking-wider uppercase py-2 border-b border-white/10 text-left"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  onAdminClick();
                  setMobileOpen(false);
                }}
                variant="outline"
                className="mt-2 flex items-center gap-2 border-white/30 text-white/80 bg-transparent font-body font-medium text-sm tracking-widest uppercase rounded-none"
                data-ocid="nav.admin_button"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Button>
              <Button
                onClick={() => handleNavClick("#quote")}
                className="bg-gold hover:bg-gold-light text-navy font-body font-semibold text-sm tracking-widest uppercase rounded-none"
                data-ocid="nav.primary_button"
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
