import {countries,countryByCode,countryForLanguage} from "./countries";
import {regionalLanguages,isTimeZone} from "./device-preferences";
export const creatorPersonas=["Student","Content creator","Marketer","Business owner","Freelancer","Educator","Other"] as const;
export type PersonalProfile={displayName:string;accountType:"personal"|"business";persona:typeof creatorPersonas[number];country:string;locale:keyof typeof regionalLanguages;timeZone:string};
export type AccountProfile={userId:string;details:PersonalProfile;provided:boolean};
export const defaultPersonalProfile:PersonalProfile={displayName:"",accountType:"personal",persona:"Content creator",country:"MY",locale:"en-MY",timeZone:"Asia/Kuala_Lumpur"};
/** Self-described preferences only; never membership, permissions or billing eligibility. */
export function cleanPersonalProfile(value:unknown):PersonalProfile{
 const v=(value&&typeof value==="object"?value:{}) as Partial<PersonalProfile>,country=countryByCode(v.country)??countries[0];
 return {displayName:typeof v.displayName==="string"?v.displayName.trim().slice(0,100):"",accountType:v.accountType==="business"?"business":"personal",persona:creatorPersonas.includes(v.persona as PersonalProfile["persona"])?v.persona!:"Content creator",country:country.code,locale:typeof v.locale==="string"&&Object.hasOwn(regionalLanguages,v.locale)?v.locale:country.locale,timeZone:typeof v.timeZone==="string"&&isTimeZone(v.timeZone)?v.timeZone:country.zones[0]};
}
export function personalCountry(profile:PersonalProfile,code:string):PersonalProfile{const country=countryByCode(code);return country?{...profile,country:code,locale:country.locale,timeZone:country.zones[0]}:profile;}
export function personalLanguage(profile:PersonalProfile,locale:PersonalProfile["locale"]):PersonalProfile{if(countryByCode(profile.country))return {...profile,locale};const country=countryForLanguage(locale);return {...profile,locale,...(country?{country:country.code,timeZone:country.zones[0]}:{})};}
export function accountProfileFromUser(value:unknown):AccountProfile|undefined{if(!value||typeof value!=="object")return;const user=value as {id?:unknown;user_metadata?:{orbit_profile?:unknown}};if(typeof user.id!=="string"||!user.id||user.id.length>200)return;const data=user.user_metadata?.orbit_profile;return {userId:user.id,provided:!!data&&typeof data==="object",details:cleanPersonalProfile(data)};}
