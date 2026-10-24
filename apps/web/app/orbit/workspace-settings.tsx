"use client";
import {type ReactNode} from "react";
import {ShieldCheck} from "lucide-react";
import {Button,Card} from "./ui";
import {SectionHeading} from "./design-ui";
import {AppearanceSettings} from "./appearance";
import {RegionalPreferences} from "./regional-preferences";
import {BillingPanel} from "./billing-panel";
export function WorkspaceSettings({preview=false,workspaceControls}:{preview?:boolean;workspaceControls?:ReactNode}) {
  return <section className="workspace-view settings-page"><SectionHeading number="05" label="Settings" title="Your workspace. Your way."/><p className="settings-intro">These preferences stay in this browser on this device. Your brand profile has its own button at the top right.</p><div className="settings-grid"><div className="settings-stack">{workspaceControls}<RegionalPreferences/><AppearanceSettings/></div><aside className="settings-stack"><Card className="surface device-settings"><div className="panel-label"><ShieldCheck size={19}/><h2>Privacy & account</h2></div><p>Files remain on your device until you choose an upload or an AI action that sends them for processing.</p><p>Review is required before scheduling. Recording a schedule does not publish a post.</p>{workspaceControls?<a className="text-action" href="#workspace-session">Manage workspace & sign out</a>:<p className="revision-label">Account controls are available after sign-in.</p>}<div className="settings-links"><a href="/privacy">Privacy policy</a><a href="/data-deletion">Data deletion</a><a href="/terms">Terms</a></div></Card>{preview?<p className="action-notice">Billing requires a signed-in workspace.</p>:<BillingPanel/>}</aside></div></section>;
}
