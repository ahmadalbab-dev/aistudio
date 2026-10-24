"use client";
import {useState} from "react";
import {CircleHelp,LockKeyhole,ReceiptText} from "lucide-react";
import {pricingBreakdown,type BillingCycle,type PricingPlan} from "./pricing-plans";
import {OrbitMark} from "./orbit-mark";
const usd=(cents:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
/** A design preview, never proof of payment or a client-side tax calculation. */
export function OrderSummary({plan,cycle}:{plan:PricingPlan;cycle:BillingCycle}){
 const [receipt,setReceipt]=useState(false),amounts=pricingBreakdown(plan,cycle);
 return <section className="order-preview" aria-label="Subscription payment preview">
  <div className="order-view-switch" role="group" aria-label="Payment preview state"><button type="button" aria-pressed={!receipt} onClick={()=>setReceipt(false)}>Before payment</button><button type="button" aria-pressed={receipt} onClick={()=>setReceipt(true)}>After payment layout</button></div>
  <article className="order-ticket" aria-label={receipt?"Receipt layout preview":"Itemised order summary"}>
   <header><OrbitMark small/><span>orbit<span className="word-dot">.</span></span><ReceiptText size={20}/></header>
   <div className="order-ticket-heading"><span className="order-preview-badge">{receipt?"Design preview · not issued":"Order preview · not charged"}</span><h3>{receipt?"Your receipt":"Your subscription"}</h3><p>{receipt?"This layout becomes a receipt only after the payment provider confirms success.":"Review every item before you commit."}</p></div>
   <dl className="order-meta"><div><dt>Plan</dt><dd>{plan.name}</dd></div><div><dt>Billing period</dt><dd>{cycle==="annually"?"12 months":"1 month"}</dd></div><div><dt>Quantity</dt><dd>1 subscription</dd></div><div><dt>Currency</dt><dd>USD</dd></div>{receipt?<><div><dt>Receipt number</dt><dd>Assigned after confirmation</dd></div><div><dt>Payment status</dt><dd>No payment recorded</dd></div></>:null}</dl>
   <dl className="order-lines"><div><dt>{plan.name} subscription</dt><dd>{usd(amounts.regularCents)}</dd></div>{amounts.discountCents>0?<div className="order-discount"><dt>{cycle==="annually"?"First-year promotion":"First-month promotion"}</dt><dd>−{usd(amounts.discountCents)}</dd></div>:null}<div className="order-subtotal"><dt>Subtotal before tax</dt><dd>{usd(amounts.subtotalCents)}</dd></div><div><dt>Tax</dt><dd>Calculated at checkout</dd></div><div className="order-total"><dt>{receipt?"Paid total including tax":"Total including tax"}</dt><dd>{receipt?"Not confirmed":"Pending calculation"}</dd></div></dl>
   <p className="order-tax-note"><CircleHelp size={15}/><span>All plan prices exclude tax. Your applicable tax and exact final total must be shown after billing details are provided and before you confirm payment. No tax rate has been assumed here.</span></p>
   <p className="order-renewal">After this introductory {cycle==="annually"?"year":"month"}: {usd(amounts.renewalCents)} / {cycle==="annually"?"year":"month"}, excluding applicable tax.</p>
   {receipt?<button type="button" className="pricing-cta" disabled>Receipt available after confirmed payment</button>:<button type="button" className="pricing-cta" disabled><LockKeyhole size={16}/>Payment checkout is not open yet</button>}
   <footer>{receipt?"No receipt has been issued. There is no transaction, payment reference or download in this preview.":"No card details collected. No payment or subscription is created."}</footer>
  </article>
 </section>;
}
