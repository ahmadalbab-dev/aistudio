"use client";
import {useEffect,useState} from "react";
import {Save,UserRound} from "lucide-react";
import {Button,Card} from "./ui";
import {PersonalDetailsFields} from "./personal-details-fields";
import {defaultPersonalProfile,type AccountProfile,type PersonalProfile} from "./personal-profile";
export function PersonalProfileCard({account,save,preview}:{account?:AccountProfile|null;save?:(profile:PersonalProfile)=>Promise<void>;preview:boolean}){
 const [draft,setDraft]=useState(account?.details??defaultPersonalProfile),[busy,setBusy]=useState(false),[notice,setNotice]=useState("");
 useEffect(()=>setDraft(account?.details??defaultPersonalProfile),[account]);
 return <Card className="surface device-settings personal-profile-card"><div className="panel-label"><UserRound size={19}/><h2>About you</h2></div><p>{account?.provided?"Your answers from registration. Update them anytime.":preview?"Registration form preview. Sign in to save your answers.":"Complete your personal profile. These choices are separate from your brand and connected social accounts."}</p><PersonalDetailsFields value={draft} onChange={setDraft} disabled={busy}/><Button disabled={preview||!account||!save||busy} onClick={async()=>{if(!save||busy)return;setBusy(true);setNotice("");try{await save(draft);setNotice("Personal profile saved to your account.");}catch(error){setNotice(error instanceof Error?error.message:"Could not save your profile. Your changes are still here.");}finally{setBusy(false);}}}><Save size={16}/>{busy?"Saving…":"Save personal profile"}</Button>{!preview&&!account?<p className="revision-label">Personal details are unavailable in this session. Sign in again to load your account profile.</p>:null}{notice?<p role="status" className="action-notice">{notice}</p>:null}</Card>;
}
