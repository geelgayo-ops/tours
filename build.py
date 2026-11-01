import re,json
t=open('template.html').read()
D='data/'
for tag,f in [('S','stations'),('R','route'),('S2','tlv_stations'),('R2','tlv_route'),('S3','germancolony_stations'),('R3','germancolony_route'),('S4','jaffa_stations'),('R4','jaffa_route'),('S5','mahaneyehuda_stations'),('R5','mahaneyehuda_route')]:
    t=t.replace('/*%s*/'%tag,json.dumps(json.load(open(D+f+'.json')),ensure_ascii=False))
R=lambda a,b:globals().__setitem__('t',t.replace(a,b,1)) if a in t else (_ for _ in ()).throw(Exception('miss '+a[:40]))
R('<title>סיור משפחתי – שוק תלפיות</title>','<title>סיורים – הדרכה בהליכה</title><link rel="manifest" href="manifest.json"><meta name="theme-color" content="#c2410c"><link rel="apple-touch-icon" href="icon-192.png"><meta name="apple-mobile-web-app-capable" content="yes"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>')
R('maximum-scale=1">','maximum-scale=1,viewport-fit=cover">')
R('#chip{','.strip{display:flex;gap:6px;overflow-x:auto;padding:6px 2px 8px;margin:4px 0;direction:rtl}.strip .num{cursor:pointer;width:34px;height:34px}\n.stars{display:flex;gap:6px;justify-content:center;font-size:34px}.stars span{cursor:pointer;filter:grayscale(1);opacity:.5}.stars span.on{filter:none;opacity:1}\ntextarea{width:100%;font:inherit;padding:8px;border:1px solid #ccc;border-radius:8px;min-height:80px}\n#toast{position:fixed;top:70px;left:50%;transform:translateX(-50%);background:#111d;color:#fff;padding:8px 14px;border-radius:20px;z-index:3000;display:none;font-size:14px}\n.sheet{padding-bottom:calc(20px + env(safe-area-inset-bottom))}\n#chip{')
R('<button id="bMenu">⚙️</button>','<button id="bFb" title="משוב">💬</button><button id="bMenu">⚙️</button>')
R('<div class="sheet" id="menu"></div>','<div class="sheet" id="menu"></div><div class="sheet" id="rev"></div><div class="sheet" id="fb"></div><div id="toast"></div>')
# card: picker strip + prev/next
R("""<div class="row"><button onclick="toggleVisit(${n})">""","""<div class="strip">${STATIONS.map(x=>`<div class="num ${st.visited.includes(x.n)?'v':''} ${x.n===n?'cur':''}" onclick="jump(${x.n})">${st.visited.includes(x.n)?'✓':x.n}</div>`).join('')}</div>
 <div class="row">${n>1?`<button onclick="jump(${n-1})">→ הקודמת</button>`:''}${n<STATIONS.length?`<button class="pri" onclick="goNext(${n})">הבאה ←</button>`:`<button class="pri" onclick="markVisited(${n});openReview()">🎉 סיום ודירוג</button>`}</div>
 <div class="row"><button onclick="toggleVisit(${n})">""")
R("""${n<STATIONS.length?`<button class="pri" onclick="goNext(${n})">לתחנה הבאה ←</button>`:'<button class="pri" onclick="hide(\\'card\\')">🎉 סיום הסיור</button>'}
 <button onclick="showList()">תחנה אחרת</button>""","""<button onclick="showList()">📋 רשימת תחנות</button>""")
# goNext opens next card directly
R("hide('card');refresh();map.flyTo([nx.lat,nx.lng],19);status(`ממשיכים לתחנה ${nx.n}: ${nx.name}`)}","map.flyTo([nx.lat,nx.lng],19);openCard(nx.n);status(`ממשיכים לתחנה ${nx.n}: ${nx.name}`)}")
R("function jump(n){const s=byN(n);map.flyTo([s.lat,s.lng],19);openCard(n)}","function jump(n){const s=byN(n);map.flyTo([s.lat,s.lng],18,{duration:.6});openCard(n)}\nfunction hideAll(){['card','list','menu','rev','fb'].forEach(hide)}")
R("""<div class="row"><button onclick="if(confirm""","""<div class="fld" id="acct">${user?`מחובר/ת: <b>${user.email}</b> <button onclick="SB.auth.signOut()">יציאה</button>`:`<b>כניסה עם אימייל (לא חובה)</b><input type="text" id="em" placeholder="email@example.com" dir="ltr"><div class="row"><button onclick="sendCode()">שלחו לי קוד</button></div><input type="text" id="code" placeholder="קוד מהמייל" dir="ltr" inputmode="numeric" style="margin-top:6px"><div class="row"><button class="pri" onclick="verify()">כניסה</button></div>`}</div>
 <div class="row"><button onclick="openReview()">⭐ דירוג הסיור</button></div><div class="row"><button onclick="if(confirm""")
EXTRA=r"""
const SB_URL='https://hsfopkplkgszmcugfary.supabase.co',SB_KEY='sb_publishable_oQeqPgHura1h0L8EtlfOFg_IKvvUUhb',VER='tours-1';
const SB=(window.supabase&&window.supabase.createClient)?window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,storageKey:'tours-auth'}}):null;
let user=null;if(SB){SB.auth.getSession().then(r=>{user=r.data.session?.user||null});SB.auth.onAuthStateChange((e,s)=>{user=s?.user||null;if($('menu').classList.contains('open'))renderMenu()})}
function toast(m){const t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',3000)}
async function sendCode(){const e=$('em').value.trim();if(!SB||!e)return;const {error}=await SB.auth.signInWithOtp({email:e});toast(error?'שגיאה: '+error.message:'נשלח קוד למייל')}
async function verify(){const {error}=await SB.auth.verifyOtp({email:$('em').value.trim(),token:$('code').value.trim(),type:'email'});toast(error?'קוד שגוי':'מחובר/ת ✓')}
const OUT='tours_outbox_v1';
async function send(table,row){row.user_id=user?user.id:null;row.email=user?user.email:null;row.app_version=VER;row.user_agent=navigator.userAgent.slice(0,500);
 const q=JSON.parse(localStorage.getItem(OUT)||'[]');q.push([table,row]);localStorage.setItem(OUT,JSON.stringify(q));
 if(!SB)return false;let ok=true;const rest=[];for(const [tb,r] of q){const {error}=await SB.from(tb).insert(r);if(error){ok=false;rest.push([tb,r])}}localStorage.setItem(OUT,JSON.stringify(rest));return ok}
let rv={stars:0};
function starsHtml(id,o){return `<div class="stars" id="${id}">${[1,2,3,4,5].map(i=>`<span data-n="${i}" class="${o.stars>=i?'on':''}" onclick="${id==='rS'?'rv':'fbv'}.stars=${i};${id==='rS'?'openReview(1)':'openFb(1)'}">⭐</span>`).join('')}</div>`}
function openReview(keep){if(!keep)rv={stars:0,text:''};else rv.text=($('rT')||{}).value||rv.text;hideAll();
 $('rev').innerHTML=`<button class="close" onclick="hide('rev')">✕</button><h2>🎉 כל הכבוד! איך היה הסיור?</h2><div style="font-size:13px;color:#666">${TOURS[TOUR].name} · ביקרתם ב-${st.visited.length} מתוך ${STATIONS.length} תחנות</div>
 ${starsHtml('rS',rv)}<textarea id="rT" maxlength="3000" placeholder="ספרו לנו מה אהבתם ומה אפשר לשפר">${rv.text||''}</textarea>
 <div class="row"><button class="pri" onclick="sendReview()">שליחת הדירוג</button></div>`;show('rev')}
async function sendReview(){if(!rv.stars){toast('בחרו ציון 1–5');return}const s=st.setup||{};
 const ok=await send('tour_reviews',{tour:TOUR,stars:rv.stars,review:$('rT').value.trim().slice(0,3000),visited:st.visited.length,total:STATIONS.length,adults:s.adults,kids:s.kids,duration:s.dur,lang:s.lang});
 hide('rev');toast(ok?'תודה! הדירוג נשלח 🙏':'נשמר במכשיר – יישלח כשיהיה חיבור')}
let fbv={stars:0};
function openFb(keep){if(!keep)fbv={stars:0};else fbv.text=$('fT').value;hideAll();
 $('fb').innerHTML=`<button class="close" onclick="hide('fb')">✕</button><h2>💬 משוב על האפליקציה</h2><div style="font-size:13px;color:#666">תקלה, רעיון, הערה על תוכן – הכול עוזר</div>
 ${starsHtml('fS',fbv)}<textarea id="fT" maxlength="4000" placeholder="מה עבד, מה חסר, מה לא ברור?">${fbv.text||''}</textarea>
 <div class="row"><button class="pri" onclick="sendFb()">שליחה</button></div>`;show('fb')}
async function sendFb(){const tx=$('fT').value.trim();if(!tx&&!fbv.stars){toast('כתבו משהו או בחרו ציון');return}
 const ok=await send('tour_feedback',{tour:TOUR,station:openN||st.cur,stars:fbv.stars||null,free_text:tx.slice(0,4000),req_area:(st.setup&&st.setup.req)||null});hide('fb');toast(ok?'תודה! המשוב נשלח':'נשמר במכשיר – יישלח כשיהיה חיבור')}
$('bFb').onclick=()=>openFb();
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js');
"""
R("renderChip();openSetup();",EXTRA+"renderChip();openSetup();")
R("$('bList').onclick=showList;$('bMenu').onclick=()=>{hide('card');hide('list');","$('bList').onclick=showList;$('bMenu').onclick=()=>{hideAll();")
R("function openSetup(){hide('card');hide('list');hide('menu');","function openSetup(){hideAll();")
R("function showList(){hide('card');hide('menu');","function showList(){hideAll();")
R("function openCard(n,auto){const s=byN(n);openN=n;st.cur=n;save();hide('list');hide('menu');","function openCard(n,auto){const s=byN(n);openN=n;st.cur=n;save();['list','menu','rev','fb'].forEach(hide);")
# area request -> also send as feedback when starting
R("function startTour(){","function startTour(){if(su.req&&su.req!==(st.setup||{}).req)send('tour_feedback',{tour:null,free_text:'בקשת אזור: '+su.req,req_area:su.req});")
t=t.replace("st.tours=st.tours||{}","st.tours=st.tours||{}",1)
open('index.html','w').write(t)
exec(open('patch2.py').read())
