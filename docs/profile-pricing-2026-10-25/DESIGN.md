# Orbit Profile, Pricing & AI editor — review
Date: 25 October 2026 (Asia/Kuala_Lumpur).
Scope: requested UI/UX changes, regional device preferences, subscription presentation and terms. AI-provider changes wait for the owner's review.

## Design references inspected
- Edit profile: https://collectui.com/designs/modal-ui-design-inspiration/9a2e085e-6cff-4d74-a5f5-0912eb0599e7
- Saved profile inspiration: https://collectui.com/designers/disarto_max
- AI progress/chat: https://collectui.com/designs/ai-ui-design-inspiration/9744c974-4e1d-4f6e-b3ea-5e8553d68f6e
- Motion: https://transitions.dev/library.html
- ThreeUI findings: ../threeui-reference/DESIGN.md

Fresh 1440×1000 public captures were inspected as actual pixels. The first CollectUI link shows a light edit-profile modal with fields on the left, preview on the right and footer actions. The designer link is a collection, not a unique saved-profile implementation. The requested AI link specifically shows a user message followed by work-status/result treatment, not a complete CapCut editor. The motion library exposes card resize, modal open/close, toggles and related studies. Static captures do not establish frame timing or private source behaviour.

No CollectUI video, author avatar, proprietary font, ThreeUI Pro code or third-party runtime was imported. New components use existing Orbit React, CSS, icons and theme tokens. Hero, branding, existing provider routes and editor contracts are preserved.

## Implemented
### Profile
- Saved brand card with cover, initial avatar, audience, writing voice, writing language and topics.
- Edit-profile native modal with live card preview. Save uses the existing authenticated brand POST/PUT endpoint; cancellation sends nothing.
- Failed saves preserve the draft for retry. Preview allows editing the sample but cannot claim a server save.
- Top-right avatar reveals the saved profile and regional summary with a short card-flip entrance on mouse hover or keyboard focus. Escape dismisses it. Clicking/tapping opens the full profile.
- Modal keyboard loop, Escape handling, return focus and viewport constraints are included.
- The profile is the existing workspace brand identity. It does not fabricate a new personal-account identity or editable email endpoint.

### Region and privacy
- Default hints use browser language and IANA device timezone. Suggestions are not proof of physical location.
- Supported preferred languages, currency preference, city, timezone, date format and 12/24-hour clock are editable in Profile and Settings.
- Automatic mode refreshes browser hints when the page regains focus/visibility or language changes. Manual saved choices survive reload; legacy saved preferences are kept.
- Preferences remain in this browser/device. Date language changes formatting; AI writing language is the separately saved brand field. This change is not full application translation.
- Currency is a saved preference, not an exchange-rate conversion or checkout quote. Plans remain USD.
- GPS is opt-in through “Use device location”. Supported nearby Malaysian cities are matched locally. Coordinates are neither persisted nor sent to a reverse-geocoding service. Worldwide fallback explicitly uses browser hints and allows manual correction.
- An invalid timezone blocks saving. Permission refusal preserves current choices.

### Social account cards
- Facebook, Instagram, Threads and TikTok cards consume workspace integration responses.
- Green LED follows reported connected state, not configured credentials or a person's online presence.
- Unconnected accounts have muted/softened artwork with readable text and a Connect account action.
- Unknown status is labelled unavailable rather than presented as a successful connection.
- Refresh, OAuth return checks, and status changes propagate to Profile and Channels; returning to the active Profile/Channels screen rechecks status.
- Connect/manage navigates to the existing official OAuth setup flow. No fake account or publishing action is introduced.

### Pricing
| Plan | Standard monthly | Monthly introductory offer | Standard annual | First annual year |
|---|---:|---|---:|---:|
| Free | $0 | None | $0 | $0 |
| Essential | $3 | First month $1, then $3/month | $36 | $34.20 (5% off) |
| Professional | $5 | None | $60 | $54 (10% off) |

Monthly/Annually switch slides its thumb and changes card, comparison and summary prices. Annual totals are labelled per year. Standard price, percentage, first-year eligibility and renewal price are visible. AI allowances remain monthly.

The latest explicit owner breakdown governs the percentages: Essential 5%, Professional 10%. The earlier general “10%” sentence does not make Essential 10%.

Terms section /terms#subscription-promotions states: annual billing only, first paid subscription and first year only, once per account; no reset after cancellation, re-subscription, plan or period changes; no stacking with the $1 monthly promotion. Annual renewal prices are $36/$60. Terms update date is October 25, 2026.

This is still plan presentation. No Stripe product/price/coupon, checkout, subscription entitlement, automatic renewal, eligibility database or paid allowance was activated. The existing separate sandbox billing tools remain test-only. When checkout is implemented, the server and payment configuration must enforce the same account eligibility and amounts; frontend text/localStorage must not determine discounts.

### Studio and Media chat
- Shared composer, transcript and suggestions stay on existing Studio/image/video workflows.
- User bubbles, open assistant responses and compact follow-up header retain Orbit typography and colours.
- A working indicator appears only while the actual request is pending; elapsed display is not a fabricated percentage or chain of thought.
- Completed assistant responses show a review-ready state. Apply/Undo and draft review still govern changes.
- Transcript remains bounded, in-tab presentation history. It is not durable conversational memory and is not silently sent as model context.
- No AI inference, publishing or payment is caused by hover, pricing toggles or suggestion selection.

## Motion and accessibility
Implementation choices (not extracted exact reference CSS):
- Profile card entrance: 320ms with modest 3D rotation; modal entrance: 220ms.
- Billing switch: 240ms transform; price swap: 200ms fade/rise.
- Motion is disabled by reduced-motion preferences and Orbit's existing motion setting.
- Native input labels, readable offline text, keyboard focus and mobile wrapping are preserved.
- The active Profile/Settings preference editor is mounted once, avoiding duplicate labelled hidden controls.

## Validation
- Actual DESKTOP-ALBAB web TypeScript passed.
- Regional preference and brand payload unit checks: 10 passed.
- Browser acceptance uses the production Next build with synthetic fixtures, not customer accounts or paid AI calls.
- Focused coverage includes Profile save/failure/retry, hover dismissal, GPS permission/refusal, manual persistence, regional defaults, pricing cadence/amounts/terms, modal focus, Channels OAuth UI, Studio request boundaries, Media proposals/Undo, local image export and 320/390/1440 layouts in Chromium/WebKit.
- Acceptance covers 50 distinct browser/project combinations across focused runs, with failed interactions repaired and retested. Latest composer suite: 10/10 passed. Latest pricing/Studio suite: 14/14 passed; profile and region cases passed in both engines. This is not a claim of one clean 50-case run or of full CI completion.
- The real pending-response test holds the synthetic API response, observes working feedback, then releases it and verifies review-ready feedback.
- Screenshots inspected: desktop and mobile Profile, annual pricing at 1440 and 320, and mobile price wrapping after correction. Annual currency, amount and period remain together.
- Branch Preview is prepared after these checks; production is not promoted.
- No live customer OAuth, new provider inference or payment was used as a cosmetic verification step.

## Ordered continuation after owner review
1. Owner reviews Profile, Settings, both pricing cadences, promotion terms and Studio/Media chat.
2. Resolve any requested UI corrections before broadening scope.
3. Resume AI integration on the existing direct Gemini/Cloudflare path. Preserve keys, quotas, consent boundaries and successful prior live-test evidence.
4. Implement only the next agreed capability with actual provider support and clear limits; distinguish video planning, local motion and generated footage.
5. Verify the real signed-in journey with explicit account access when available, then address music/social-provider blockers.
6. Implement and test billing eligibility, checkout and monthly entitlement enforcement before any paid launch. Publishing and production promotion remain separate release decisions.

