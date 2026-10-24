import {countries,countryByCode} from "./countries";
export const regionalLanguages = {"en-MY":"English (Malaysia)","ms-MY":"Bahasa Melayu","en-US":"English (US)","en-GB":"English (UK)","id-ID":"Bahasa Indonesia","zh-CN":"中文","ja-JP":"日本語","ko-KR":"한국어","th-TH":"ไทย","ar-SA":"العربية","fr-FR":"Français","de-DE":"Deutsch","es-ES":"Español"} as const;
export const regionalCurrencies = ["MYR","USD","SGD","GBP","EUR","IDR","THB","JPY","CNY","KRW","AUD","CAD","INR","SAR"] as const;
export type DevicePreferences = { country?:string; city: string; timeZone: string; locale: keyof typeof regionalLanguages; currency?: typeof regionalCurrencies[number]; regionalMode?: "automatic" | "manual"; hour12: boolean; dateStyle: "medium" | "short"; mediaEditor: "image" | "video" };
export const PREFERENCES_KEY = "orbit-device-preferences-v1";
export const defaultPreferences: DevicePreferences = {city:"Kuala Lumpur",timeZone:"Asia/Kuala_Lumpur",locale:"en-MY",hour12:false,dateStyle:"medium",mediaEditor:"video"};
export const cities = [
  {name:"Kuala Lumpur",lat:3.139,lon:101.687,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Kuala Terengganu",lat:5.33,lon:103.14,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Johor Bahru",lat:1.493,lon:103.742,timeZone:"Asia/Kuala_Lumpur"},
  {name:"George Town",lat:5.414,lon:100.329,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Ipoh",lat:4.598,lon:101.09,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Kota Bharu",lat:6.125,lon:102.239,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Kuantan",lat:3.807,lon:103.326,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Alor Setar",lat:6.125,lon:100.368,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Melaka",lat:2.189,lon:102.25,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Seremban",lat:2.726,lon:101.938,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Kangar",lat:6.441,lon:100.198,timeZone:"Asia/Kuala_Lumpur"},
  {name:"Kota Kinabalu",lat:5.98,lon:116.073,timeZone:"Asia/Kuching"},
  {name:"Kuching",lat:1.553,lon:110.359,timeZone:"Asia/Kuching"},
  {name:"Miri",lat:4.399,lon:113.992,timeZone:"Asia/Kuching"},
  {name:"Sandakan",lat:5.839,lon:118.118,timeZone:"Asia/Kuching"},
];
export function isTimeZone(value:string) {try {new Intl.DateTimeFormat("en",{timeZone:value}).format();return value.length>0;}catch{return false;}}
export function sanitizePreferences(value:unknown):DevicePreferences {
  const v = (value && typeof value === "object" ? value : {}) as Partial<DevicePreferences>;
  return {...(countryByCode(v.country)?{country:v.country}:{}),city: typeof v.city === "string" && v.city.trim() ? v.city.trim().slice(0,100) : defaultPreferences.city,timeZone:typeof v.timeZone === "string" && isTimeZone(v.timeZone) ? v.timeZone : defaultPreferences.timeZone,locale:typeof v.locale==="string"&&Object.hasOwn(regionalLanguages,v.locale)?v.locale:"en-MY",hour12:v.hour12===true,dateStyle:v.dateStyle==="short"?"short":"medium",mediaEditor:v.mediaEditor==="image"?"image":"video",...(v.currency&&regionalCurrencies.includes(v.currency)?{currency:v.currency}:{}),...(v.regionalMode==="automatic"||v.regionalMode==="manual"?{regionalMode:v.regionalMode}:{})};
}
/** Browser settings are hints, not GPS or proof of residence. No network or coordinates. */
export function detectRegionalPreferences(language:string,timeZone:string):DevicePreferences {
  let requested: Intl.Locale;try{requested=new Intl.Locale(language);}catch{requested=new Intl.Locale("en-MY");}
  const locale=(Object.keys(regionalLanguages).find(key=>key.toLowerCase()===requested.toString().toLowerCase())??Object.keys(regionalLanguages).find(key=>key.split("-")[0]===requested.language)??"en-MY") as DevicePreferences["locale"];
  const zone=isTimeZone(timeZone)?timeZone:"UTC";
  const countryCurrency:Record<string,NonNullable<DevicePreferences["currency"]>>={MY:"MYR",US:"USD",SG:"SGD",GB:"GBP",ID:"IDR",TH:"THB",JP:"JPY",CN:"CNY",KR:"KRW",AU:"AUD",CA:"CAD",IN:"INR",SA:"SAR",FR:"EUR",DE:"EUR",ES:"EUR"};
  const zoneCurrency:Record<string,NonNullable<DevicePreferences["currency"]>>={"Asia/Kuala_Lumpur":"MYR","Asia/Kuching":"MYR","Asia/Singapore":"SGD","Europe/London":"GBP","Asia/Jakarta":"IDR","Asia/Bangkok":"THB","Asia/Tokyo":"JPY","Asia/Shanghai":"CNY","Asia/Seoul":"KRW","Australia/Sydney":"AUD","America/New_York":"USD","America/Los_Angeles":"USD","Europe/Paris":"EUR","Europe/Berlin":"EUR"};
  const currency=zoneCurrency[zone]??countryCurrency[requested.region??""]??"USD";
  const country=countries.find(country=>country.zones.some(candidate=>candidate===zone))??countryByCode(requested.region);
  return {...defaultPreferences,...(country?{country:country.code}:{}),locale,timeZone:zone,city:cities.find(city=>city.timeZone===zone)?.name??zone.split("/").at(-1)!.replaceAll("_"," "),currency,regionalMode:"automatic",hour12:new Intl.DateTimeFormat(locale,{hour:"numeric"}).resolvedOptions().hour12??false};
}
export function nearestCity(latitude:number,longitude:number) {
  if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180)return null;
  const rad=(n:number)=>n*Math.PI/180;
  const distance=(city:typeof cities[number])=>{const a=Math.sin(rad(latitude-city.lat)/2)**2+Math.cos(rad(latitude))*Math.cos(rad(city.lat))*Math.sin(rad(longitude-city.lon)/2)**2;return 6371*2*Math.asin(Math.sqrt(a));};
  const sorted=cities.map(city=>({city,distance:distance(city)})).sort((a,b)=>a.distance-b.distance);
  return sorted[0].distance<=120?sorted[0].city:null;
}
export function dateKeyInZone(date:Date,timeZone:string) {
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date);
  const get=(type:string)=>parts.find(p=>p.type===type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
function wallParts(date:Date,timeZone:string) {
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(date);
  const get=(type:string)=>Number(parts.find(p=>p.type===type)!.value);
  return Date.UTC(get("year"),get("month")-1,get("day"),get("hour"),get("minute"));
}
// Resolve a wall-clock value against IANA rules. Reject skipped and repeated DST times instead of silently shifting a post.
export function scheduledInstant(value:string,timeZone:string) {
  if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)||!isTimeZone(timeZone))throw new Error("Choose a valid date, time and timezone.");
  const wall=Date.parse(`${value}:00Z`);
  if(!Number.isFinite(wall)||new Date(wall).toISOString().slice(0,16)!==value)throw new Error("Choose a valid date and time.");
  const offsets=new Set<number>();
  for(const hours of [-36,-12,0,12,36]){const at=new Date(wall+hours*3600000);offsets.add(wallParts(at,timeZone)-at.getTime());}
  const matches=[...offsets].map(offset=>wall-offset).filter(at=>wallParts(new Date(at),timeZone)===wall);
  if(matches.length!==1)throw new Error(matches.length ? "This time occurs twice because clocks change. Choose another time." : "This time does not exist because clocks change. Choose another time.");
  return new Date(matches[0]).toISOString();
}
