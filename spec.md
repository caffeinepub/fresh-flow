# Fresh Flow

## Current State
A luxury bottled water branding website for Fresh Flow (Patna). Features:
- Hero, About, Portfolio (6 bottle designs), Quote Form, Admin Panel
- Quote requests stored in backend with status management
- Admin panel requires Internet Identity login + secret token to claim admin role
- Token-based admin claim is blocking the owner from accessing their admin panel

## Requested Changes (Diff)

### Add
- A new backend function `initializeAsAdmin` that auto-promotes the first logged-in caller to admin with no token required (subsequent callers become regular users)

### Modify
- Admin panel flow: remove the token input form; replace with a simple "Activate Admin Access" button that calls the no-token initialize function
- First logged-in user who clicks the button becomes admin automatically

### Remove
- Token input form from the admin panel UI (ClaimAdminForm component)

## Implementation Plan
1. Regenerate backend with new `initializeAsAdmin` (no-token) function alongside existing token-based one
2. Add `initializeAsAdmin` to backend.d.ts interface
3. Update `useQueries.ts` to use `useActivateAdmin` hook calling the new function
4. Update `AdminPanel.tsx` to show a simple "Activate Admin Access" button instead of the token form
