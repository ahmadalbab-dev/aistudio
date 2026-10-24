import {describe,expect,it} from "vitest";
import {annualOfferLabel,introductoryPrice,pricingBreakdown,pricingPlans} from "./pricing-plans";
describe("advertised subscription item amounts",()=>{
 const essential=pricingPlans[1],professional=pricingPlans[2];
 it("shows a one-dollar first month without changing the three-dollar renewal",()=>{expect(introductoryPrice(essential,"monthly")).toBe(1);expect(pricingBreakdown(essential,"monthly")).toEqual({regularCents:300,discountCents:200,subtotalCents:100,renewalCents:300});});
 it("uses the owner's flat $34 annual offer and an accurate savings label",()=>{expect(pricingBreakdown(essential,"annually")).toEqual({regularCents:3600,discountCents:200,subtotalCents:3400,renewalCents:3600});expect(annualOfferLabel(essential)).toBe("$2 off first year");});
 it("keeps the professional annual discount separate from monthly pricing",()=>{expect(pricingBreakdown(professional,"monthly")).toEqual({regularCents:500,discountCents:0,subtotalCents:500,renewalCents:500});expect(pricingBreakdown(professional,"annually")).toEqual({regularCents:6000,discountCents:600,subtotalCents:5400,renewalCents:6000});});
});
