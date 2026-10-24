# Profile and pricing review — 24 October 2026

## Changes

Signed-out workspace previews show a Get started link in place of the sample profile avatar. The link opens registration. Registration collects a name, Personal/Business account description, creator persona, country, language and timezone. Country changes suggest a timezone; users can choose among multiple supported country zones. Language changes preserve an explicitly selected country and timezone. Sixteen countries are currently offered; this is not a complete worldwide country directory. Language selection is a profile/formatting preference, not a complete translation of the application.

Answers are saved as bounded `orbit_profile` user metadata through Supabase public signup and authenticated user update APIs. Sign-in and refreshed browser sessions populate the account profile. These self-described answers never grant workspace permissions, social account types, paid plans or billing eligibility. Profile information is not added to localStorage. Brand editing remains separate from personal account preferences.

The brand Edit profile dialog uses explicit viewport centering, retains a native modal/focus handling, and offers a language select. Regional selectors include an original decorative globe and short transitions; reduced motion and the existing motion pause setting are respected. GPS is optional and is not requested by these registration controls.

Essential monthly pricing emphasizes $1, with $3 struck through and a first-month label; renewal remains $3/month. First-year Essential annual is $34 (a $2 discount from $36); subsequent annual renewals are $36. Professional stays $5/month, $54 first annual year and $60 annual renewal. Terms preserve the once-per-account introductory restrictions. Advertised prices exclude tax.

The plan dialog includes an itemized order summary and a clearly marked receipt layout preview. Tax and final totals stay pending until real checkout calculates them; no payment is recorded and no paid receipt is issued. Pay/download actions are disabled. The public Essential/Professional catalog is not connected to a live payment flow by this patch.

## Design references

- https://collectui.com/designs/ui-interaction-ui-design-inspiration/4e276b36-e924-4dcc-ad4a-b1017eeae7b0
- https://collectui.com/designs/pricing-ui-design-inspiration/0b4b5169-5517-46e8-9642-d066d0d4de4a

Screenshots were inspected. The first reference provides a globe/region visual metaphor rather than a working language/timezone component; the second provides receipt styling rather than verified payment behavior. Implementation is original; no downloaded vendor runtime or artwork was incorporated.

## Verified locally

- TypeScript type check passed.
- 54 unit tests passed in seven files: pricing arithmetic, profile normalization/auth data, device preferences, auth client, session renewal, browser session and server session handler.
- Next.js production build passed and generated 19 pages.
- Diff whitespace check passed.

Playwright acceptance cases were updated for guest registration, country timezone suggestions, registration answers displayed from session metadata, language selects, mobile modal centering and itemized pricing. After the owner explicitly restored Desktop Commander access, the patch was applied to DESKTOP-ALBAB. The focused Chromium/WebKit runs passed: 20 Profile/Pricing/device cases, plus 10 appearance/navigation cases. Two initial modal assertions sampled the opening animation too early; polling now verifies the settled center without loosening the two-pixel threshold. The registration country test now uses the rendered combobox role and accessible name. Local Chromium installation remains unavailable; remote browser execution supplies acceptance evidence. Live account writes were not performed.

## Remaining acceptance gate

Inspect captured desktop/mobile screenshots, then push the reviewed feature branch and verify a Ready Vercel Preview. Real Supabase signup/profile persistence still needs a signed-in acceptance check; current auth tests use synthetic fixtures. No production promotion, live payment or AI provider call is required for this UI review.
