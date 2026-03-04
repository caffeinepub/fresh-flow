import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitQuoteRequest } from "../hooks/useQueries";

interface FormState {
  name: string;
  businessName: string;
  businessType: string;
  city: string;
  monthlyQuantity: string;
  brandingNotes: string;
  email: string;
  phone: string;
}

const initialForm: FormState = {
  name: "",
  businessName: "",
  businessType: "",
  city: "Patna",
  monthlyQuantity: "",
  brandingNotes: "",
  email: "",
  phone: "",
};

export default function QuoteFormSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const { mutate, isPending, isSuccess, isError, error } =
    useSubmitQuoteRequest();

  const setField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  if (isSuccess) {
    return (
      <section id="quote" className="py-32 bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            data-ocid="quote.success_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-white">
              Request Received
            </h2>
            <p className="font-body text-white/70 text-base leading-relaxed max-w-lg">
              Thank you, <strong className="text-white">{form.name}</strong>.
              Our team will review your request and reach out within 24 hours
              with a tailored proposal.
            </p>
            <div className="mt-4 h-px w-24 bg-gold/40" />
            <p className="font-body text-white/50 text-sm tracking-wider uppercase">
              Fresh Flow — Patna, Bihar
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-32 bg-navy">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold/60" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              Get Started
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-white leading-[1.1]">
            Request a Quote
          </h2>
          <p className="font-body text-white/60 text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Tell us about your venue and we'll craft a proposal tailored to your
            brand.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border-t-2 border-gold border-x border-b border-x-white/[0.18] border-b-white/[0.18] bg-white/[0.05] p-8 lg:p-12 space-y-8"
          style={{
            boxShadow:
              "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 24px 64px 0 rgba(10,22,40,0.45)",
          }}
        >
          {/* Row 1: Name + Business Name */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={(e) => setField("name")(e.target.value)}
                placeholder="Your full name"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body"
                data-ocid="quote.input"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="businessName"
                className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
              >
                Business Name *
              </Label>
              <Input
                id="businessName"
                name="businessName"
                required
                value={form.businessName}
                onChange={(e) => setField("businessName")(e.target.value)}
                placeholder="Your venue or brand name"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body"
                data-ocid="quote_business.input"
              />
            </div>
          </div>

          {/* Row 2: Business Type + City */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-body text-xs tracking-widest uppercase text-white/70 font-medium">
                Business Type *
              </Label>
              <Select
                value={form.businessType}
                onValueChange={setField("businessType")}
                required
              >
                <SelectTrigger
                  className="bg-white/5 border-white/15 text-white focus:border-gold rounded-none font-body data-[placeholder]:text-white/30"
                  data-ocid="quote_type.select"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-none bg-navy border-white/15">
                  <SelectItem
                    value="Hotel"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Hotel
                  </SelectItem>
                  <SelectItem
                    value="Cafe"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Cafe
                  </SelectItem>
                  <SelectItem
                    value="Restaurant"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Restaurant
                  </SelectItem>
                  <SelectItem
                    value="Spa"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Spa
                  </SelectItem>
                  <SelectItem
                    value="Event Venue"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Event Venue
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-white hover:bg-white/10 font-body"
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
              >
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={form.city}
                onChange={(e) => setField("city")(e.target.value)}
                placeholder="City"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body"
                data-ocid="quote_city.input"
              />
            </div>
          </div>

          {/* Row 3: Monthly Quantity */}
          <div className="space-y-2">
            <Label className="font-body text-xs tracking-widest uppercase text-white/70 font-medium">
              Estimated Monthly Quantity *
            </Label>
            <Select
              value={form.monthlyQuantity}
              onValueChange={setField("monthlyQuantity")}
              required
            >
              <SelectTrigger
                className="bg-white/5 border-white/15 text-white focus:border-gold rounded-none font-body data-[placeholder]:text-white/30"
                data-ocid="quote_quantity.select"
              >
                <SelectValue placeholder="Select estimated quantity" />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-navy border-white/15">
                <SelectItem
                  value="Under 500"
                  className="text-white hover:bg-white/10 font-body"
                >
                  Under 500 bottles/month
                </SelectItem>
                <SelectItem
                  value="500-2000"
                  className="text-white hover:bg-white/10 font-body"
                >
                  500 – 2,000 bottles/month
                </SelectItem>
                <SelectItem
                  value="2000-5000"
                  className="text-white hover:bg-white/10 font-body"
                >
                  2,000 – 5,000 bottles/month
                </SelectItem>
                <SelectItem
                  value="5000+"
                  className="text-white hover:bg-white/10 font-body"
                >
                  5,000+ bottles/month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 4: Email + Phone */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setField("email")(e.target.value)}
                placeholder="you@yourvenue.com"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body"
                data-ocid="quote_email.input"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone")(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body"
                data-ocid="quote_phone.input"
              />
            </div>
          </div>

          {/* Row 5: Branding Notes */}
          <div className="space-y-2">
            <Label
              htmlFor="brandingNotes"
              className="font-body text-xs tracking-widest uppercase text-white/70 font-medium"
            >
              Custom Branding Requirements
            </Label>
            <Textarea
              id="brandingNotes"
              name="brandingNotes"
              value={form.brandingNotes}
              onChange={(e) => setField("brandingNotes")(e.target.value)}
              placeholder="Describe your brand colors, logo preferences, bottle size, special requirements..."
              rows={4}
              className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold rounded-none font-body resize-none"
              data-ocid="quote_branding.textarea"
            />
          </div>

          {/* Error state */}
          {isError && (
            <div
              data-ocid="quote.error_state"
              className="flex items-center gap-3 p-4 border border-red-400/30 bg-red-400/10"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="font-body text-sm text-red-300">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong. Please try again."}
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            {isPending ? (
              <div
                data-ocid="quote.loading_state"
                className="flex items-center justify-center gap-3 py-4"
              >
                <Loader2 className="w-5 h-5 text-gold animate-spin" />
                <span className="font-body text-sm text-white/60 tracking-widest uppercase">
                  Submitting...
                </span>
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full text-navy font-body font-semibold text-base tracking-[0.2em] uppercase py-7 rounded-none shadow-gold hover:shadow-gold-lg transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.10 75), oklch(0.72 0.12 75) 50%, oklch(0.85 0.09 75))",
                }}
                data-ocid="quote.submit_button"
              >
                Submit Request
              </Button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
