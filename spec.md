# Fresh Flow

## Current State
The admin panel shows "Access Denied" to any logged-in user who wasn't the first to call `_initializeAccessControlWithSecret` with the correct token. There is no UI to enter the admin token and claim the admin role.

## Requested Changes (Diff)

### Add
- A "Claim Admin Access" flow inside the AdminPanel for logged-in users who are not yet admin
- An input field for the admin secret token
- A submit button that calls `_initializeAccessControlWithSecret` with the entered token
- Success state (refreshes admin status) and error state (shows invalid token message)

### Modify
- AdminPanel.tsx: Replace the static "Access Denied" screen with the new claim form when the user is logged in but not admin

### Remove
- Nothing

## Implementation Plan
1. In AdminPanel.tsx, when user is logged in (`identity` exists) but `isAdmin` is false, show a "Claim Admin Access" panel instead of just "Access Denied"
2. Panel contains: heading, short explanation, a password input for the secret token, and a "Claim Admin" submit button
3. On submit, call `_initializeAccessControlWithSecret(token)` via the backend actor
4. On success, invalidate/refetch the `isAdmin` query so the panel updates
5. On error (trap = wrong token), show an inline error message "Invalid token. Please try again."
6. Keep existing "Access Denied" fallback text below the form as a subtitle
