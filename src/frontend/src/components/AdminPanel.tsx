import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Loader2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { type QuoteRequest, QuoteStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
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

  // Not admin
  if (!isAdmin) {
    return (
      <section
        id="admin"
        className="py-20 bg-background"
        data-ocid="admin.section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="border border-destructive/30 bg-destructive/5 p-10">
            <ShieldAlert className="w-10 h-10 text-destructive mx-auto mb-4" />
            <h3 className="font-display text-2xl text-navy mb-2">
              Access Denied
            </h3>
            <p className="font-body text-muted-foreground text-sm">
              Your account does not have admin privileges.
            </p>
          </div>
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
