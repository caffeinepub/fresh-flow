import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import PortfolioSection from "./components/PortfolioSection";
import QuoteFormSection from "./components/QuoteFormSection";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleAdminClick = () => {
    setShowAdmin(true);
    setTimeout(() => {
      const el = document.getElementById("admin");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAdminClick={handleAdminClick} />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <QuoteFormSection />
        {showAdmin && <AdminPanel />}
      </main>
      <Footer onAdminClick={handleAdminClick} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
