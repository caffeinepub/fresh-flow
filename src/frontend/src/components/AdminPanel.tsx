import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type QuoteRequest, QuoteStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useClaimAdmin,
  useGetAllQuotes,
  useIsAdmin,
  useUpdateQuoteStatus,
} from "../hooks/useQueries";

const statusColors: Record<QuoteStatus, string> = {
  [QuoteStatus.new_]: "bg-blue-100 text-blue-800",
  [QuoteStatus.contacted]: "bg-yellow-100 text-yellow-800",
  [QuoteStatus.pending]: "bg-orange-100 text-orange-800",
  [QuoteStatus.finalized]: "bg-green-100 text-green-800",
};

const statusLabels: Record<QuoteStatus, string> = {
  [QuoteStatus.new_]: "New",
  [QuoteStatus.contacted]: "Contacted",
  [QuoteStatus.pending]: "Pending",
  [QuoteStatus.finalized]: "Finalized",
};

function formatDate(nanos: bigint): string {
  const ms = Number(nanos / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SetupAdminForm() {
  const [token, setToken] = useState("");
  const { mutate: claimAdmin, isPending, isError, isSuccess } = useClaimAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    claimAdmin(token.trim());
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-gold/40 bg-gold/5 p-12 text-center space-y-4 max-w-lg mx-auto"
        data-ocid="admin.success_state"
      >
        <div className="w-16 h-16 border border-gold/50 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8 text-gold" />
        </div>
        <h3 className="font-display text-2xl text-navy font-light">
          Admin Access Activated
        </h3>
        <p className="font-body text-muted-foreground text-sm">
          You're all set. Loading your dashboard now...
        </p>
        <Loader2 className="w-5 h-5 text-gold animate-spin mx-auto" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="w-14 h-14 border border-gold/50 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-display text-3xl text-navy font-light tracking-wide">
          First-Time Admin Setup
        </h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          This is a one-time setup. Enter your Admin Secret Key to activate full
          dashboard access.
        </p>
      </div>

      {/* Step-by-step instructions */}
      <div className="border border-border p-6 mb-6 space-y-4 bg-muted/20">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-medium">
          Where to find your key
        </p>
        <ol className="space-y-3">
          {(
            [
              { label: "Open caffeine.ai in your browser", highlight: false },
              { label: "Select your Fresh Flow project", highlight: false },
              { label: "Go to Settings", highlight: false },
              { label: "Copy the value of ", highlight: true },
            ] as { label: string; highlight: boolean }[]
          ).map((step, i) => (
            <li key={step.label} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 border border-gold/60 text-gold font-body text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="font-body text-sm text-foreground leading-relaxed pt-0.5">
                {step.label}
                {step.highlight && (
                  <code className="ml-1 px-1.5 py-0.5 bg-navy/10 text-navy font-mono text-xs rounded-sm">
                    CAFFEINE_ADMIN_TOKEN
                  </code>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="admin-secret-key"
            className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium"
          >
            Admin Secret Key
          </label>
          <Input
            id="admin-secret-key"
            type="password"
            placeholder="Paste your CAFFEINE_ADMIN_TOKEN here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="font-body rounded-none border-border focus:border-gold focus:ring-gold/20 h-12 text-sm"
            data-ocid="admin.input"
            disabled={isPending}
          />
          {isError && (
            <p
              className="font-body text-xs text-destructive flex items-center gap-1.5"
              data-ocid="admin.error_state"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
              Incorrect key. Please check your Caffeine project settings.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || !token.trim()}
          className="w-full bg-navy hover:bg-navy/90 text-white font-body font-semibold rounded-none tracking-[0.15em] uppercase h-12"
          data-ocid="admin.submit_button"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Verifying Key...
            </>
          ) : (
            "Activate Admin Access"
          )}
        </Button>

        <p className="font-body text-xs text-muted-foreground text-center">
          This is a one-time setup. You won't need the key again after this.
        </p>
      </form>
    </motion.div>
  );
}

export default function AdminPanel() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: quotes, isLoading: quotesLoading } = useGetAllQuotes();
  const { mutate: updateStatus } = useUpdateQuoteStatus();

  const handleStatusChange = (quote: QuoteRequest, newStatus: string) => {
    const status = newStatus as QuoteStatus;
    updateStatus({ quoteId: quote.id, newStatus: status });
  };

  // Not logged in
  if (!identity) {
    return (
      <section
        id="admin"
        className="py-20 bg-background"
        data-ocid="admin.section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="border border-border p-12 space-y-5">
            <ShieldAlert className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-display text-2xl text-navy">
              Admin Access Required
            </h3>
            <p className="font-body text-muted-foreground text-sm">
              Please log in to access the admin panel.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="bg-navy hover:bg-navy-mid text-white font-body font-semibold rounded-none tracking-wider uppercase mt-4"
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Loading
  if (adminLoading) {
    return (
      <section
        id="admin"
        className="py-20 bg-background"
        data-ocid="admin.section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  // Not admin -- show setup form
  if (!isAdmin) {
    return (
      <section
        id="admin"
        className="py-20 bg-background"
        data-ocid="admin.section"
      >
        <div className="max-w-4xl mx-auto px-6">
          <SetupAdminForm />
        </div>
      </section>
    );
  }

  return (
    <section
      id="admin"
      className="py-20 bg-background border-t border-border"
      data-ocid="admin.section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                Admin
              </span>
            </div>
            <h2 className="font-display text-4xl text-navy font-light">
              Quote Requests
            </h2>
            <p className="font-body text-muted-foreground text-sm mt-2">
              {quotes?.length ?? 0} request
              {(quotes?.length ?? 0) !== 1 ? "s" : ""} received
            </p>
          </div>

          {/* Table */}
          {quotesLoading ? (
            <div
              className="flex items-center justify-center py-20"
              data-ocid="admin.loading_state"
            >
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : !quotes || quotes.length === 0 ? (
            <div
              className="border border-border p-16 text-center"
              data-ocid="admin.empty_state"
            >
              <p className="font-body text-muted-foreground">
                No quote requests yet.
              </p>
            </div>
          ) : (
            <div
              className="overflow-x-auto border border-border"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      #
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Business
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Type
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      City
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Quantity
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Email
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Phone
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Notes
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote, idx) => (
                    <TableRow
                      key={String(quote.id)}
                      className="hover:bg-muted/30"
                      data-ocid="admin.row"
                    >
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-body text-sm font-medium text-foreground whitespace-nowrap">
                        {quote.name}
                      </TableCell>
                      <TableCell className="font-body text-sm text-foreground whitespace-nowrap">
                        {quote.businessName}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {quote.businessType}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {quote.city}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground whitespace-nowrap">
                        {quote.monthlyQuantity}
                      </TableCell>
                      <TableCell className="font-body text-sm text-foreground">
                        <a
                          href={`mailto:${quote.email}`}
                          className="hover:text-gold transition-colors"
                        >
                          {quote.email}
                        </a>
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground whitespace-nowrap">
                        {quote.phone}
                      </TableCell>
                      <TableCell
                        className="font-body text-sm text-muted-foreground max-w-[200px] truncate"
                        title={quote.brandingNotes}
                      >
                        {quote.brandingNotes || "—"}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(quote.submissionTime)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={quote.status}
                          onValueChange={(val) =>
                            handleStatusChange(quote, val)
                          }
                        >
                          <SelectTrigger
                            className="h-8 w-32 text-xs font-body rounded-none border-border"
                            data-ocid="quote_status.select"
                          >
                            <SelectValue>
                              <Badge
                                className={`${statusColors[quote.status]} text-xs font-body font-medium border-0`}
                              >
                                {statusLabels[quote.status]}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="rounded-none font-body">
                            <SelectItem value={QuoteStatus.new_}>
                              New
                            </SelectItem>
                            <SelectItem value={QuoteStatus.contacted}>
                              Contacted
                            </SelectItem>
                            <SelectItem value={QuoteStatus.pending}>
                              Pending
                            </SelectItem>
                            <SelectItem value={QuoteStatus.finalized}>
                              Finalized
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
