"use client";
import {useEffect,useState} from "react";
import {defaultPreferences,detectRegionalPreferences,PREFERENCES_KEY,sanitizePreferences,type DevicePreferences} from "./device-preferences";
export function browserPreferences(){return detectRegionalPreferences(navigator.languages?.[0]??navigator.language,Intl.DateTimeFormat().resolvedOptions().timeZone);}
export function useDevicePreferences() {
  const [preferences,setPreferences]=useState(defaultPreferences);
  useEffect(()=>{
    const sync=()=>{let stored:DevicePreferences|null=null;try{const raw=localStorage.getItem(PREFERENCES_KEY);if(raw)stored=sanitizePreferences(JSON.parse(raw));}catch{}const auto=browserPreferences();const next=!stored?auto:stored.regionalMode==="automatic"?{...stored,...auto,country:auto.country,dateStyle:stored.dateStyle,mediaEditor:stored.mediaEditor}:stored;setPreferences(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);};
    const storage=(event:StorageEvent)=>{if(event.key===PREFERENCES_KEY||event.key===null)sync();};
    const visible=()=>{if(!document.hidden)sync();};
    sync();window.addEventListener("orbit-preferences",sync);window.addEventListener("storage",storage);window.addEventListener("languagechange",sync);window.addEventListener("focus",sync);document.addEventListener("visibilitychange",visible);
    return()=>{window.removeEventListener("orbit-preferences",sync);window.removeEventListener("storage",storage);window.removeEventListener("languagechange",sync);window.removeEventListener("focus",sync);document.removeEventListener("visibilitychange",visible);};
  },[]);
  function save(next:DevicePreferences) {
    const clean=sanitizePreferences(next);
    try{localStorage.setItem(PREFERENCES_KEY,JSON.stringify(clean));}catch{throw new Error("Browser storage is unavailable. Allow local storage to save these preferences.");}
    setPreferences(clean);window.dispatchEvent(new Event("orbit-preferences"));
  }
  return {preferences,save};
}
