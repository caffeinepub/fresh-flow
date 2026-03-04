import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuoteRequest {
    id: bigint;
    status: QuoteStatus;
    city: string;
    name: string;
    monthlyQuantity: string;
    businessName: string;
    businessType: string;
    email: string;
    brandingNotes: string;
    submissionTime: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum QuoteStatus {
    new_ = "new",
    pending = "pending",
    finalized = "finalized",
    contacted = "contacted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllQuotes(): Promise<Array<QuoteRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQuoteRequest(name: string, businessName: string, businessType: string, city: string, monthlyQuantity: string, brandingNotes: string, email: string, phone: string): Promise<bigint>;
    updateQuoteStatus(quoteId: bigint, newStatus: QuoteStatus): Promise<boolean>;
}
