// ---- v6: spoken narration (Web Speech API, no server audio) ----
const NARR_KEY='tours_narr_v1';
const NARR_STYLES=[
 {id:'neima',name:'נעימה',rate:0.92,pitch:1.05,blurb:'מעט איטית, טון חם'},
 {id:'regua',name:'רגועה',rate:0.82,pitch:0.92,blurb:'איטית יותר, טון נמוך'},
 {id:'aliza',name:'עליזה',rate:1.08,pitch:1.15,blurb:'קצת יותר מהירה וגבוהה'},
 {id:'brura',name:'ברורה',rate:0.86,pitch:1,blurb:'איטית וברורה, נוחה בחוץ'}
];
const narr={gen:0,active:false,key:'',queue:[],idx:0,errors:0};

function narrLoad(){
 let p={};
 try{p=JSON.parse(localStorage.getItem(NARR_KEY)||'{}')||{}}catch(e){p={}}
 const style=NARR_STYLES.some(s=>s.id===p.style)?p.style:'neima';
 return {style,auto:p.auto===false?false:true};
}
function narrSave(p){try{localStorage.setItem(NARR_KEY,JSON.stringify({style:p.style,auto:!!p.auto}))}catch(e){}}
function narrStyle(){const id=narrLoad().style;return NARR_STYLES.find(s=>s.id===id)||NARR_STYLES[0]}
function narrToast(m){try{if(typeof toast==='function')toast(m)}catch(e){}}

function narrClean(raw){
 let s=String(raw??'');
 s=s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ');
 s=s.replace(/<br\s*\/?>/gi,' ').replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi,'. ');
 s=s.replace(/<[^>]+>/g,' ');
 s=s.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'");
 s=s.replace(/&#(\d+);/g,(_,n)=>{const c=+n;return (c>0&&c<=0x10FFFF)?String.fromCodePoint(c):' '});
 s=s.replace(/&#x([0-9a-f]+);/gi,(_,n)=>{const c=parseInt(n,16);return (c>0&&c<=0x10FFFF)?String.fromCodePoint(c):' '});
 s=s.replace(/!\[[^\]]*\]\([^)]*\)/g,' ');
 s=s.replace(/\[([^\]]+)\]\([^)]*\)/g,'$1');
 s=s.replace(/https?:\/\/\S+/g,' ');
 s=s.replace(/^\s{0,3}#{1,6}\s+/gm,'').replace(/^\s*[-*+]\s+/gm,'');
 s=s.replace(/[*_~`]+/g,'');
 s=s.replace(/\s+/g,' ').trim();
 return narrPlaceholder(s)?'':s;
}
function narrPlaceholder(s){
 const t=String(s||'').replace(/[\s.!?…׃:：\-–—]+$/g,'').trim();
 if(!t||t.length<2)return true;
 return /^(בקרוב|coming soon|todo|tbd|placeholder|n\/a|אין|סרטון( התחנה)?( \(בקרוב\))?)$/i.test(t);
}
function narrJoin(label,body){
 const b=narrClean(body);if(!b)return '';
 const a=narrClean(label);if(!a)return b;
 return /[.!?…׃]$/.test(a)?(a+' '+b):(a+'. '+b);
}
function narrText(kind,s){
 if(!s||(kind!=='p'&&kind!=='k'&&kind!=='q'))return '';
 if(kind==='p')return narrJoin(s.name,s.parents);
 if(kind==='k')return narrJoin('משימה לילדים',s.kids);
 return narrJoin('שאלת התבוננות',s.q);
}
function narrChunks(text){
 const bits=String(text||'').split(/(?<=[.!?…׃])\s+/).map(x=>x.trim()).filter(Boolean);
 const src=bits.length?bits:[String(text||'')];
 const out=[];let buf='';
 src.forEach(p=>{const next=buf?buf+' '+p:p;if(buf&&next.length>160){out.push(buf);buf=p}else buf=next});
 if(buf)out.push(buf);
 const hard=[];
 out.forEach(c=>{
  if(c.length<=220){hard.push(c);return}
  let rest=c;
  while(rest.length>180){let i=rest.lastIndexOf(' ',180);if(i<40)i=180;hard.push(rest.slice(0,i).trim());rest=rest.slice(i).trim()}
  if(rest)hard.push(rest);
 });
 return hard.filter(Boolean);
}

function narrGender(v){
 const n=((v&&v.name)||'')+' '+((v&&v.voiceURI)||'');
 const l=n.toLowerCase();
 if(/carmit|כרמית|hila|הילה|naama|נעמה|female|woman|wavenet-a|wavenet-c|neural2-a|neural2-c|standard-a|standard-c|samantha|victoria|karen|moira|fiona|tessa|zira|susan|serena|allison|ava/.test(l))return 1;
 if(/asaf|אסף|avri|אברי|\bmale\b|wavenet-b|wavenet-d|neural2-b|neural2-d|\b(daniel|david|alex|fred|rishi)\b/.test(l))return -1;
 return 0;
}
function narrVoiceList(){
 try{
  const s=(typeof speechSynthesis!=='undefined')?speechSynthesis:null;
  return (s&&s.getVoices&&s.getVoices())||[];
 }catch(e){return []}
}
function narrCandidates(langTag){
 const voices=narrVoiceList();
 const want=String(langTag||'he').toLowerCase().slice(0,2);
 const alt=want==='he'?'iw':want;
 const match=voices.filter(v=>{const l=String(v.lang||'').toLowerCase().replace('_','-');return l.startsWith(want)||l.startsWith(alt)});
 const pool=match.length?match:voices;
 const keep=pool.filter(v=>narrGender(v)>=0);
 const list=(keep.length?keep:pool).slice();
 list.sort((a,b)=>{
  const d=narrGender(b)-narrGender(a);if(d)return d;
  if(!!a.localService!==!!b.localService)return a.localService?-1:1;
  return String(a.name||'').localeCompare(String(b.name||''));
 });
 return list;
}
function narrPickVoice(styleId,langTag){
 const list=narrCandidates(langTag);
 if(!list.length)return null;
 if(styleId==='brura')return list.find(v=>v.localService)||list[0];
 if(styleId==='regua')return list[Math.min(1,list.length-1)];
 if(styleId==='aliza')return list.length>2?list[2]:list[0];
 return list[0];
}
function narrWantsEnglish(){
 try{
  const area=(typeof st!=='undefined'&&st.setup&&st.setup.area)||(typeof TOUR!=='undefined'?TOUR:'');
  const key=String(area||'');
  if(key.indexOf('gen:')===0&&typeof GEN!=='undefined'&&GEN){
   const g=GEN[key.slice(4)];
   if(g&&g.lang==='en')return true;
   if(g&&g.lang)return false;
  }
  if(typeof st!=='undefined'&&st.setup&&st.setup.lang==='en'&&key.indexOf('gen:')===0)return true;
 }catch(e){}
 return false;
}
function narrLangTag(){return narrWantsEnglish()?'en-US':'he-IL'}

function narrSync(){
 if(typeof document==='undefined')return;
 document.querySelectorAll('button.say').forEach(b=>{
  const key=b.getAttribute('data-narr')||'';
  const on=!!(narr.active&&narr.key===key);
  b.classList.toggle('on',on);
  b.setAttribute('aria-pressed',on?'true':'false');
  b.textContent=on?'⏹ הפסק':'🔊 השמע';
 });
}
function narrRefreshPickers(){
 if(typeof document==='undefined')return;
 const p=narrLoad(),blurb=narrStyle().blurb;
 document.querySelectorAll('[data-narr-style]').forEach(el=>el.classList.toggle('on',el.getAttribute('data-narr-style')===p.style));
 document.querySelectorAll('select.narrsel').forEach(el=>{if(el.value!==p.style)el.value=p.style});
 document.querySelectorAll('input.narrauto').forEach(el=>{el.checked=!!p.auto});
 document.querySelectorAll('.narrhint').forEach(el=>{el.textContent=blurb});
}
function narrPanelHtml(){
 const p=narrLoad();
 const buttons=NARR_STYLES.map(s=>`<button type="button" data-narr-style="${s.id}" class="${p.style===s.id?'on':''}" onclick="narrSetStyle('${s.id}')">${s.name}</button>`).join('');
 return `<b>🎙️ קול הקריינית</b><div class="seg">${buttons}</div><div class="narrhint">${narrStyle().blurb}</div><label class="narlab"><input type="checkbox" class="narrauto" ${p.auto?'checked':''} onchange="narrSetAuto(this.checked)"> השמעה אוטומטית של ההסבר בכל תחנה</label>`;
}
function narrMount(){
 const el=document.getElementById('narrHome');
 if(!el)return;
 el.innerHTML=narrPanelHtml()+'<div class="tm">איכות הקול תלויה במכשיר</div>';
}
function narrCardLine(){
 const p=narrLoad();
 const opts=NARR_STYLES.map(s=>`<option value="${s.id}"${s.id===p.style?' selected':''}>${s.name}</option>`).join('');
 return `<div class="narrline"><label>🎙️ קול <select class="narrsel" aria-label="סגנון קול" onchange="narrSetStyle(this.value)">${opts}</select></label><label><input type="checkbox" class="narrauto"${p.auto?' checked':''} onchange="narrSetAuto(this.checked)"> השמעה אוטומטית</label></div>`;
}
function narrSayBtn(kind,n){
 const key=kind+':'+n,on=!!(narr.active&&narr.key===key);
 return `<button type="button" class="say${on?' on':''}" data-narr="${key}" onclick="narrToggle('${kind}',${n})" aria-pressed="${on?'true':'false'}">${on?'⏹ הפסק':'🔊 השמע'}</button>`;
}
function narrParentsBox(s){
 const btn=narrClean(s&&s.parents)?narrSayBtn('p',s.n):'';
 return `<div class="box par"><div class="sayrow"><b>👨‍👩‍👧‍👦 להורים:</b>${btn}</div>${(s&&s.parents)||''}</div>`;
}
function narrKidsBox(s){
 if(!s||!s.kids||(typeof kidsOn==='function'&&!kidsOn()))return '';
 const btn=narrClean(s.kids)?narrSayBtn('k',s.n):'';
 return `<div class="box kid"><div class="sayrow"><b>🧒 משימה לילדים:</b>${btn}</div>${s.kids}</div>`;
}
function narrQBox(s){
 if(!s||!s.q||!narrClean(s.q)){
  if(!s||!s.q)return '';
  return `<div class="box kid"><b>❓ שאלת התבוננות:</b><br>${s.q}</div>`;
 }
 return `<div class="box kid"><div class="sayrow"><b>❓ שאלת התבוננות:</b>${narrSayBtn('q',s.n)}</div>${s.q}</div>`;
}

function narrStop(){
 const was=narr.active;
 narr.gen++;narr.active=false;narr.key='';narr.queue=[];narr.idx=0;narr.errors=0;
 try{
  const s=(typeof speechSynthesis!=='undefined')?speechSynthesis:null;
  // cancel() while idle makes Chrome drop the next speak(); only cut real audio
  if(s&&s.cancel&&(was||s.speaking||s.pending))s.cancel();
 }catch(e){}
 narrSync();
}
function narrFinish(my){
 if(my!==narr.gen)return;
 narr.active=false;narr.key='';narr.queue=[];narrSync();
}
function narrWhenVoices(my,cb){
 const synth=(typeof speechSynthesis!=='undefined')?speechSynthesis:null;
 const ready=()=>{try{return !!(synth&&synth.getVoices&&synth.getVoices().length)}catch(e){return false}};
 // Speak in this turn when voices are already loaded so iOS keeps the user gesture.
 const go=()=>{if(my===narr.gen)cb()};
 if(!synth||ready()){go();return}
 let fired=false;
 const done=()=>{if(fired)return;fired=true;try{synth.removeEventListener&&synth.removeEventListener('voiceschanged',done)}catch(e){}go()};
 try{synth.addEventListener&&synth.addEventListener('voiceschanged',done)}catch(e){}
 try{synth.getVoices()}catch(e){}
 setTimeout(done,400);
}
function narrPump(my){
 if(my!==narr.gen)return;
 if(!narr.queue||narr.idx>=narr.queue.length){narrFinish(my);return}
 const chunk=narr.queue[narr.idx++];
 let u;try{u=new SpeechSynthesisUtterance(chunk)}catch(e){narrFinish(my);return}
 const tag=narrLangTag(),style=narrStyle();
 let voice=null;try{voice=narrPickVoice(style.id,tag)}catch(e){voice=null}
 try{if(voice)u.voice=voice}catch(e){}
 u.lang=(voice&&voice.lang)?voice.lang:tag;
 u.rate=Math.min(1.4,Math.max(0.6,style.rate));
 u.pitch=Math.min(1.5,Math.max(0.7,style.pitch));
 u.volume=1;
 u.onend=()=>{if(my===narr.gen)narrPump(my)};
 u.onerror=ev=>{
  if(my!==narr.gen)return;
  const err=ev&&ev.error;
  if(err==='interrupted'||err==='canceled'||err==='cancelled')return;
  if(err==='not-allowed'){narrFinish(my);return}
  narr.errors++;if(narr.errors>4){narrFinish(my);return}
  narrPump(my);
 };
 let started=false;
 u.onstart=()=>{started=true};
 try{speechSynthesis.speak(u)}catch(e){narrFinish(my);return}
 // Chrome sometimes drops a speak() that follows cancel(). Retry once if it never started.
 setTimeout(()=>{
  if(my!==narr.gen||started)return;
  try{if(speechSynthesis.speaking||speechSynthesis.pending)return}catch(e){return}
  try{
   const u2=new SpeechSynthesisUtterance(chunk);
   u2.lang=u.lang;u2.rate=u.rate;u2.pitch=u.pitch;u2.volume=1;
   try{if(voice)u2.voice=voice}catch(e){}
   u2.onend=u.onend;u2.onerror=u.onerror;u2.onstart=u.onstart;
   speechSynthesis.speak(u2);
  }catch(e){}
 },200);
}
function narrUtter(kind,n,fromUser){
 let text='';
 try{text=narrText(kind,(typeof byN==='function')?byN(n):null)}catch(e){text=''}
 if(!text){if(fromUser)narrToast('אין טקסט להקראה');return}
 if(typeof speechSynthesis==='undefined'||!speechSynthesis||typeof SpeechSynthesisUtterance!=='function'){
  if(fromUser)narrToast('ההקראה לא נתמכת בדפדפן הזה');return}
 narrStop();
 const my=narr.gen;
 narr.key=kind+':'+n;narr.active=true;narr.queue=narrChunks(text);narr.idx=0;narr.errors=0;
 narrSync();
 narrWhenVoices(my,()=>narrPump(my));
}
function narrToggle(kind,n){
 const key=kind+':'+n;
 if(narr.active&&narr.key===key){narrStop();return}
 narrUtter(kind,n,true);
}
function narrTourVisible(){
 try{
  const home=document.getElementById('home'),setup=document.getElementById('setup');
  if(home&&home.style.display!=='none')return false;
  if(setup&&!setup.classList.contains('hidden'))return false;
  return true;
 }catch(e){return true}
}
function narrAfterCard(prev,n){
 if(prev===n){narrSync();return}
 narrStop();
 if(!narrLoad().auto||!narrTourVisible())return;
 narrUtter('p',n,false);
}
function narrSetStyle(id){
 if(!NARR_STYLES.some(s=>s.id===id))return;
 const p=narrLoad();if(p.style===id)return;
 const cur=narr.active?narr.key:'';
 p.style=id;narrSave(p);narrRefreshPickers();
 if(cur){const parts=cur.split(':');narrUtter(parts[0],+parts[1],false)}
}
function narrSetAuto(on){
 const p=narrLoad();p.auto=!!on;narrSave(p);narrRefreshPickers();
}
function narrBootVoices(){
 if(typeof speechSynthesis==='undefined'||!speechSynthesis)return;
 try{speechSynthesis.getVoices()}catch(e){}
 try{speechSynthesis.addEventListener&&speechSynthesis.addEventListener('voiceschanged',()=>{try{speechSynthesis.getVoices()}catch(e){}})}catch(e){}
}
narrBootVoices();
