import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QuoteStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetAllQuotes() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allQuotes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuoteRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      businessName: string;
      businessType: string;
      city: string;
      monthlyQuantity: string;
      brandingNotes: string;
      email: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitQuoteRequest(
        params.name,
        params.businessName,
        params.businessType,
        params.city,
        params.monthlyQuantity,
        params.brandingNotes,
        params.email,
        params.phone,
      );
    },
  });
}

export function useUpdateQuoteStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { quoteId: bigint; newStatus: QuoteStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateQuoteStatus(params.quoteId, params.newStatus);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["allQuotes"] });
    },
  });
}
