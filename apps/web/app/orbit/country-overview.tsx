import {countryByCode} from "./countries";
/** Decorative orthographic graticule. Country controls remain native and keyboard accessible. */
export function CountryOverview({country,timeZone}:{country?:string;timeZone:string}){
 const selected=countryByCode(country),latitude=(selected?.lat??0)*Math.PI/180;
 return <div className="country-overview"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="66"/><ellipse cx="80" cy="80" rx="35" ry="66"/><ellipse cx="80" cy="80" rx="58" ry="66"/><ellipse cx="80" cy="80" rx="66" ry="25"/><ellipse cx="80" cy="80" rx="66" ry="48"/><path d="M14 80h132M80 14v132"/>{selected?<g className="country-marker" style={{transform:`translate(80px,${80-66*Math.sin(latitude)}px)`}}><circle r="9"/><circle r="4"/></g>:null}</svg><div key={`${country}-${timeZone}`}><span>YOUR CORNER OF THE WORLD</span><strong>{selected?.name??"Your region"}</strong><small>{timeZone.replaceAll("_"," ")}</small><p>{selected&&selected.zones.length>1?"Suggested timezone. Choose your city or zone below.":"Country-based suggestion. You can change it anytime."}</p></div></div>;
}
