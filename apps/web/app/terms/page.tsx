import { LegalPage } from "../legal-content";

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Use" summary="Rules for using Orbit Social responsibly, safely, and in compliance with connected social platforms.">
    <h2>1. Acceptance and eligibility</h2>
    <p>By using Orbit Social, you confirm that you are authorized to act for the workspace and connected social accounts and that you will follow these terms and each platform&apos;s applicable policies.</p>
    <h2>2. Human approval remains required</h2>
    <p>AI-generated content may be incomplete or inaccurate. You are responsible for checking facts, claims, disclosures, links, media rights, prices, availability, and platform suitability before publication.</p>
    <h2>3. Wellness and product communications</h2>
    <p>Orbit Social is not a medical service. Do not publish content that diagnoses, treats, cures, prevents, or guarantees outcomes unless the statement is lawful, substantiated, and expressly approved for use.</p>
    <h2>4. Account and platform compliance</h2>
    <ul>
      <li>Use official OAuth authorization and never share passwords with Orbit administrators.</li>
      <li>Connect only accounts you own or are authorized to manage.</li>
      <li>Respect platform terms, rate limits, review requirements, and community standards.</li>
      <li>Do not use Orbit for spam, deceptive engagement, impersonation, harassment, or unlawful content.</li>
    </ul>
    <h2>5. Automation and availability</h2>
    <p>Scheduled publishing depends on third-party APIs and may fail or be delayed. Approval gates, budget limits, retries, and idempotency reduce risk but do not guarantee publication or commercial results.</p>
    <h2>6. Intellectual property</h2>
    <p>You must have appropriate rights to logos, product images, music, testimonials, and other assets. Third-party brands remain the property of their owners.</p>
    <h2>7. Suspension and termination</h2>
    <p>Access may be paused for suspected compromise, policy violations, excessive automated activity, or revoked platform authorization. You may stop using Orbit and request deletion at any time.</p>
    <h2>8. Disclaimer and liability</h2>
    <p>Orbit Social is provided on an “as available” basis. To the extent permitted by law, the operator is not responsible for indirect losses, platform enforcement decisions, missed schedules, generated inaccuracies, or business outcomes.</p>
    <h2 id="subscription-promotions">9. Subscription prices and introductory promotions</h2>
    <p>Launch plan prices are displayed in USD. Paid checkout is not open in the current plan preview. Viewing a plan does not start a subscription, charge a payment method, or grant a paid allowance.</p>
    <p>The standard Essential price is $3 USD per month or $36 USD per year. The standard Professional price is $5 USD per month or $60 USD per year. An eligible account selecting annual billing for its first paid subscription receives 5% off Essential ($34.20 USD for the first year) or 10% off Professional ($54 USD for the first year).</p>
    <p>The annual introductory promotion applies only to annual billing, only to the first subscription and first year, and only once per Orbit account. It does not apply to monthly billing, subsequent years, renewals, returning subscriptions, or an existing paid subscription changed to annual billing. Cancellation, resubscription, a plan change or a billing-period change does not reset eligibility or grant another introductory year.</p>
    <p>After the introductory year, the displayed standard annual price applies: $36 USD for Essential or $60 USD for Professional. Any renewal commitment, cancellation process, applicable taxes, and final amount must be disclosed before paid checkout is enabled and before a customer confirms payment. This preview does not enable automatic renewals.</p>
    <p>The Essential $1 first-month promotion is separate and applies to monthly billing only, followed by $3 USD per month. It cannot be combined with the annual first-year promotion. Annual payment does not multiply a monthly AI allowance into an unrestricted annual balance; AI credits remain subject to the stated monthly allowance and feature availability.</p>
    <h2>10. Contact</h2>
    <p>Contact <a className="underline" href="mailto:ahmadalbab.dev@gmail.com">ahmadalbab.dev@gmail.com</a> with the subject “Orbit Social Terms Request.”</p>
  </LegalPage>;
}
