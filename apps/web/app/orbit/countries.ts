/** Country defaults are suggestions. Multi-zone countries always offer an explicit choice. */
export const countries=[
 {code:"MY",name:"Malaysia",locale:"ms-MY",currency:"MYR",zones:["Asia/Kuala_Lumpur","Asia/Kuching"],lat:3.139,lon:101.687},
 {code:"SG",name:"Singapore",locale:"en-MY",currency:"SGD",zones:["Asia/Singapore"],lat:1.35,lon:103.82},
 {code:"ID",name:"Indonesia",locale:"id-ID",currency:"IDR",zones:["Asia/Jakarta","Asia/Makassar","Asia/Jayapura"],lat:-6.2,lon:106.85},
 {code:"TH",name:"Thailand",locale:"th-TH",currency:"THB",zones:["Asia/Bangkok"],lat:13.75,lon:100.5},
 {code:"GB",name:"United Kingdom",locale:"en-GB",currency:"GBP",zones:["Europe/London"],lat:51.5,lon:-.12},
 {code:"US",name:"United States",locale:"en-US",currency:"USD",zones:["America/New_York","America/Chicago","America/Denver","America/Los_Angeles","America/Anchorage","Pacific/Honolulu"],lat:38.9,lon:-77.04},
 {code:"AU",name:"Australia",locale:"en-GB",currency:"AUD",zones:["Australia/Sydney","Australia/Brisbane","Australia/Adelaide","Australia/Darwin","Australia/Perth","Australia/Hobart"],lat:-33.86,lon:151.21},
 {code:"CA",name:"Canada",locale:"en-US",currency:"CAD",zones:["America/Toronto","America/Vancouver","America/Edmonton","America/Winnipeg","America/Halifax","America/St_Johns"],lat:45.42,lon:-75.7},
 {code:"JP",name:"Japan",locale:"ja-JP",currency:"JPY",zones:["Asia/Tokyo"],lat:35.68,lon:139.69},
 {code:"KR",name:"South Korea",locale:"ko-KR",currency:"KRW",zones:["Asia/Seoul"],lat:37.56,lon:126.97},
 {code:"CN",name:"China",locale:"zh-CN",currency:"CNY",zones:["Asia/Shanghai"],lat:39.9,lon:116.4},
 {code:"IN",name:"India",locale:"en-GB",currency:"INR",zones:["Asia/Kolkata"],lat:28.61,lon:77.2},
 {code:"FR",name:"France",locale:"fr-FR",currency:"EUR",zones:["Europe/Paris"],lat:48.86,lon:2.35},
 {code:"DE",name:"Germany",locale:"de-DE",currency:"EUR",zones:["Europe/Berlin"],lat:52.52,lon:13.4},
 {code:"ES",name:"Spain",locale:"es-ES",currency:"EUR",zones:["Europe/Madrid","Atlantic/Canary"],lat:40.42,lon:-3.7},
 {code:"SA",name:"Saudi Arabia",locale:"ar-SA",currency:"SAR",zones:["Asia/Riyadh"],lat:24.71,lon:46.68},
] as const;
export const countryByCode=(code:string|undefined)=>countries.find(country=>country.code===code);
export function countryForLanguage(locale:string){try{return countryByCode(new Intl.Locale(locale).region);}catch{return undefined;}}
