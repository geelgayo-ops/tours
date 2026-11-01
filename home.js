// ---- v4: home screen, tour cards, new-tour screen, reviews ----
const CUR=['talpiot','tlv','germancolony','jaffa','mahaneyehuda'];let STATS={},COMM=[],RVT=null;
const km=t=>{const T=TOURS[t];return T&&T.route&&T.route.dist?(T.route.dist/1000).toFixed(1)+' ק"מ':''};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function loadStats(){if(!SB)return;try{const [a,b]=await Promise.all([SB.from('tour_stats').select('*'),SB.from('tours_generated').select('id,title,place,lat,lng,lang,duration,stations,route,created_at').order('created_at',{ascending:false}).limit(40)]);
 STATS=Object.fromEntries((a.data||[]).map(x=>[x.tour,x]));COMM=(b.data||[]).filter(g=>!GEN[g.id]);COMM.forEach(regGen)}catch(e){console.warn(e)}renderHome()}
function card(k){const T=TOURS[k];if(!T)return'';const s=STATS[k],p=st.tours[k];
 return `<div class="tc" data-q="${esc((T.name+' '+T.title).toLowerCase())}"><div onclick="openTourSetup('${k}')" style="cursor:pointer"><b>${esc(T.title)}</b><div class="tm">📍 ${esc(T.name)} · ${T.stations.length} תחנות${km(k)?' · 🚶 '+km(k):''}${p&&p.visited&&p.visited.length?` · ✓ ${p.visited.length} בוקרו`:''}</div>
 <div class="tm">${s?`⭐ ${s.avg} (${s.n} ${s.n==1?'דירוג':'דירוגים'})`:'עדיין אין דירוגים'}${T.gen?' · 🤖 נוצר ב-AI':''}</div></div>
 <div class="row" style="margin-top:6px"><button class="pri" onclick="openTourSetup('${k}')">יוצאים לסיור</button><button onclick="openRevs('${k}')">⭐ דירוגים וביקורות</button></div></div>`}
function renderHome(){const q=($('hq').value||'').trim().toLowerCase();
 const sec=(t,ks)=>{ks=ks.filter(k=>TOURS[k]);return ks.length?`<h3>${t}</h3>`+ks.map(card).join(''):''};
 $('hList').innerHTML=sec('סיורים מומלצים',CUR)+sec('הסיורים שלי',Object.keys(GEN).map(i=>'gen:'+i))+sec('סיורי הקהילה (נוצרו ב-AI)',COMM.map(g=>'gen:'+g.id));
 if(q)document.querySelectorAll('.tc').forEach(c=>c.style.display=c.dataset.q.includes(q)?'':'none')}
function showHome(push){hideAll();$('setup').classList.add('hidden');$('home').style.display='block';renderHome();if(push!==false&&history.state&&history.state.v!=='home')history.pushState({v:'home'},'')}
function ensureOpt(k){if(![...$('sArea').options].some(o=>o.value===k)){const o=document.createElement('option');o.value=k;o.textContent=TOURS[k].name;$('sArea').appendChild(o)}}
function openTourSetup(k){ensureOpt(k);su=JSON.parse(JSON.stringify(st.setup||su));su.area=k;MODE='tour';$('home').style.display='none';renderSetup();
 $('setTitle').innerHTML=`🧭 ${esc(TOURS[k].title)}<div class="tm">📍 ${esc(TOURS[k].name)} · ${TOURS[k].stations.length} תחנות</div>`;$('setup').classList.remove('hidden');history.pushState({v:'setup'},'')}
function openNew(){su=JSON.parse(JSON.stringify(st.setup||su));su.area='new';su.loc=null;$('gq').value='';MODE='new';$('home').style.display='none';renderSetup();$('gErr').textContent='';$('gRes').innerHTML='';$('gNear').innerHTML='';
 $('setTitle').innerHTML='➕ סיור חדש<div class="tm">בחרו מקום, משך, שפה ומשתתפים – וניצור לכם סיור הליכה</div>';$('setup').classList.remove('hidden');history.pushState({v:'setup'},'')}
let MODE='tour';
async function openRevs(k){RVT=k;hideAll();$('revs').innerHTML=`<button class="close" onclick="hide('revs')">✕</button><h2>⭐ ${esc(TOURS[k].title)}</h2><div id="rvL">טוען…</div><div class="row"><button class="pri" onclick="openReview(0,'${k}')">✍️ דרגו את הסיור</button></div>`;show('revs');
 let L=[];if(SB){const {data}=await SB.from('tour_reviews_public').select('stars,review,created_at').eq('tour',k).order('created_at',{ascending:false}).limit(30);L=data||[]}
 const s=STATS[k];$('rvL').innerHTML=(s?`<div style="font-size:15px;margin:4px 0">ממוצע ⭐ ${s.avg} מתוך 5 · ${s.n} דירוגים</div>`:'')+(L.length?L.map(r=>`<div class="rvi"><span>${'⭐'.repeat(r.stars)}</span> <small>${new Date(r.created_at).toLocaleDateString('he-IL')}</small>${r.review?`<div>${esc(r.review)}</div>`:''}</div>`).join(''):'<p>עדיין אין ביקורות – היו הראשונים!</p>')}
window.addEventListener('popstate',e=>{const v=e.state&&e.state.v;if(v==='tour'&&TOUR){$('home').style.display='none';$('setup').classList.add('hidden')}else if(v==='setup'&&$('setup').classList.contains('hidden')){showHome(false)}else{showHome(false)}});
