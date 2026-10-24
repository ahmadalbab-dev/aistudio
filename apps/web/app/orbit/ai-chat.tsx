"use client";
import {useCallback,useEffect,useRef,useState,type ReactNode} from 'react';
import {Check,LoaderCircle,MessageSquare,Trash2} from 'lucide-react';
import {OrbitMark} from './design-ui';
import './ai-chat.css';
type Turn={id:number;role:'user'|'assistant'|'notice';text:string};
/** Bounded presentation history only. Never persisted or silently sent to a model. */
export function useAiConversation(scope?:string){
 const [turns,setTurns]=useState<Turn[]>([]),sequence=useRef(0);
 const clear=useCallback(()=>setTurns([]),[]);
 const record=useCallback((role:Turn['role'],text:string)=>{
  const turn={id:++sequence.current,role,text:text.slice(0,4000)};
  setTurns(old=>[...old.slice(-9),turn]);
 },[]);
 useEffect(()=>{clear();},[scope,clear]);
 return {turns,record,clear};
}
export function AiChat({title,description,context,conversation,busy=false,children}:{title:string;description:string;context:string;conversation:ReturnType<typeof useAiConversation>;busy?:boolean;children:ReactNode}){
 const [seconds,setSeconds]=useState(0),messages=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!busy)return;const start=Date.now();setSeconds(0);const timer=setInterval(()=>setSeconds(Math.floor((Date.now()-start)/1000)),1000);return()=>clearInterval(timer);},[busy]);
 useEffect(()=>{const log=messages.current;if(log&&log.scrollHeight-log.scrollTop-log.clientHeight<180)log.scrollTop=log.scrollHeight;},[conversation.turns]);
 const latest=conversation.turns.at(-1),ready=!busy&&latest?.role==='assistant';
 return <section className={`orbit-ai-chat ${conversation.turns.length?'has-conversation':''}`} aria-label={`${title} chat`}>
  <header className="orbit-chat-bar"><span><MessageSquare size={16} aria-hidden="true"/>Orbit assistant</span><button type="button" disabled={busy||!conversation.turns.length} onClick={conversation.clear} title="Clears messages in this tab. Your draft and media stay unchanged."><Trash2 size={14} aria-hidden="true"/>Clear messages</button></header>
  <div className="orbit-chat-intro"><OrbitMark small/><span className="orbit-chat-context">{context}</span><h3>{title}</h3><p>{description}</p></div>
  {conversation.turns.length?<div ref={messages} className="orbit-chat-messages" role="log" tabIndex={0} aria-label={`${title} messages`} aria-live="polite" aria-relevant="additions"><ol>{conversation.turns.map(turn=><li key={turn.id} className={`orbit-chat-turn orbit-chat-${turn.role}`}><span>{turn.role==='user'?'You':turn.role==='assistant'?'Orbit':'Editor'}</span><p>{turn.text}</p></li>)}</ol></div>:null}
  {busy||ready?<div className="orbit-chat-progress" data-state={busy?'working':'ready'}><span className="orbit-chat-progress-icon" aria-hidden="true">{busy?<LoaderCircle size={16}/>:<Check size={16}/>}</span><div><strong>{busy?'Working on your request…':'Response ready to review'}</strong><small>{busy?'Waiting for a response. You can review the result when it arrives.':'Your result is below. Review it before saving or applying changes.'}</small></div>{busy?<time aria-hidden="true">{seconds}s</time>:null}</div>:null}
  <div className="orbit-chat-composer" aria-busy={busy}>{children}</div>
  <p className="orbit-chat-footnote">Messages stay in this tab until refresh. Each request uses the current brief or editor settings; earlier messages are not sent automatically.</p>
 </section>;
}
