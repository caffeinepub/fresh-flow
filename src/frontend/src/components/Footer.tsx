import { Droplets, Heart, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "freshflow.in")}`;

  return (
    <footer className="bg-navy-deep text-white/70" data-ocid="footer.section">
      {/* Gold separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2.5 group mb-5"
            >
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
                <Droplets className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-xl font-semibold tracking-wide text-white">
                Fresh<span className="text-gold">Flow</span>
              </span>
            </button>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-[240px]">
              Premium Custom Water for Elite Venues
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base text-white font-medium mb-5 tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm">Patna, Bihar, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a
                  href="mailto:abhishekaryanpandey7a151075@gmail.com"
                  className="font-body text-sm hover:text-gold transition-colors"
                >
                  abhishekaryanpandey7a151075@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a
                  href="tel:+917991134339"
                  className="font-body text-sm hover:text-gold transition-colors"
                >
                  +91 79911 34339
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base text-white font-medium mb-5 tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Request a Quote", href: "#quote" },
              ].map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-sm hover:text-gold transition-colors w-fit text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {year} Fresh Flow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5"
            >
              Built with <Heart className="w-3 h-3 text-gold/60" /> using
              caffeine.ai
            </a>
            <button
              type="button"
              onClick={onAdminClick}
              className="font-body text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
