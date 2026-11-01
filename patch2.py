t=open('index.html').read()
def R(a,b):
    global t
    assert a in t,a[:50]; t=t.replace(a,b,1)
R('<option value="mahaneyehuda">שוק מחנה יהודה, ירושלים</option></select>','<option value="mahaneyehuda">שוק מחנה יהודה, ירושלים</option><optgroup label="הסיורים שלי" id="myGen"></optgroup><option value="new">🌍 סיור במקום חדש (בכל העולם)</option></select>\n<div id="newBox" style="display:none;margin-top:10px"><div class="note" style="font-weight:400;font-size:13px;background:#eff6ff;border-color:#60a5fa">🤖 סיור במקום חדש נוצר אוטומטית בעזרת בינה מלאכותית ממקומות אמיתיים במפה (OpenStreetMap). המידע עלול להכיל טעויות – בדקו לפני היציאה, שימו לב לבטיחות ולשעות פתיחה. באזורים שאינם עירוניים חלק מהמקומות עשויים להיות רחוקים יותר להליכה.</div>\n<div class="row"><button onclick="useGps()">📍 המיקום הנוכחי שלי</button></div><div style="display:flex;gap:6px;margin-top:8px"><input type="text" id="gq" placeholder="או חפשו מקום (למשל General Luna, Siargao)"><button onclick="geoSearch()">🔍</button></div><div id="gRes"></div><div id="gSel" style="margin-top:8px;font-weight:600"></div><div id="gNear"></div></div>')
R('#chip{','#busy{position:fixed;inset:0;background:#fff7edee;z-index:2500;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;font-size:17px}\n.gr{padding:8px;border-bottom:1px solid #eee;cursor:pointer;font-size:14px}\n#chip{')
R('<div id="toast"></div>','<div id="toast"></div><div id="busy"><div style="font-size:48px">🧭</div><div id="busyT">בונים לכם סיור…</div><small style="color:#666;margin-top:8px">מחפשים מקומות אמיתיים בסביבה וכותבים הדרכה – עד דקה</small></div>')
R("$('sArea').onchange=e=>{su.area=e.target.value};","$('sArea').onchange=e=>{su.area=e.target.value;renderSetup()};")
R("$('sArea').value=su.area;","renderMyGen();$('sArea').value=su.area;$('newBox').style.display=su.area==='new'?'':'none';if(su.area==='new'){$('gSel').textContent=su.loc?'📍 '+su.loc.name:''}")
R("$('notice').textContent=su.lang==='he'?'':","$('notice').textContent=su.lang==='he'||(su.lang==='en'&&(su.area==='new'||String(su.area).startsWith('gen:')))?'':")
R("function startTour(){","async function startTour(){if($('sArea').value==='new'){su.area='new';const g=await genTour();if(!g)return;su.area=g;renderMyGen();$('sArea').value=g}")
R("loadTour((st.setup&&st.setup.area)||'talpiot');","loadTour((st.setup&&TOURS[st.setup.area]&&st.setup.area)||'talpiot');")
R("const AREAS=","let AREAS=")
GEN=open('gen.js').read()
R("renderChip();openSetup();",GEN+"renderChip();openSetup();")
open('index.html','w').write(t)
# --- v3 fixes: Manhattan bug
t=open('index.html').read()
R('placeholder="בקשו אזור חדש (למשל: נחלת בנימין, תל אביב)"','placeholder="מקום אחר? הקלידו כאן (למשל Manhattan, New York)"')
R("$('sReq').onchange=e=>{","$('sReq').oninput=e=>{const v=e.target.value.trim();if(v){su.area='new';$('sArea').value='new';$('newBox').style.display='';$('gq').value=v;su.loc=null;$('gSel').textContent='';$('gNear').innerHTML=''}};$('sReq').onchange=e=>{")
R('<div id="gSel" style="margin-top:8px;font-weight:600"></div>','<div id="gSel" style="margin-top:8px;font-weight:600"></div><div id="gErr" style="color:#b91c1c;font-weight:600;margin-top:6px"></div>')
R("async function geoSearch(){","$('gq').addEventListener('input',()=>{su.loc=null;$('gSel').textContent='';$('gErr').textContent=''});$('gq').addEventListener('keydown',e=>{if(e.key==='Enter')geoSearch()});\nfunction gErr(m){$('gErr').textContent=m?'⚠️ '+m:'';if(m){toast(m);$('gErr').scrollIntoView({block:'center'})}}\nasync function geocode(q){const r=await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q='+encodeURIComponent(q),{headers:UA_H});if(!r.ok)throw new Error('geocode '+r.status);return r.json()}\nasync function geoSearch(){")
R("const r=await (await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q='+encodeURIComponent(q),{headers:UA_H})).json();","const r=await geocode(q);")
R("async function genTour(){if(!su.loc){toast('בחרו מיקום נוכחי או חפשו מקום');return null}",
"""async function genTour(){gErr('');
 if(!su.loc){const q=$('gq').value.trim();if(!q){gErr('בחרו "המיקום הנוכחי שלי" או הקלידו מקום');return null}
  $('busy').style.display='flex';$('busyT').textContent='מאתרים את "'+q+'"…';
  try{const r=await geocode(q);if(!r.length){gErr('לא מצאנו את "'+q+'" – נסו ניסוח אחר (באנגלית)');return null}
   const x=r[0];let la=+x.lat,lo=+x.lon;su.loc={lat:la,lng:lo,name:String(x.display_name).split(',').slice(0,3).join(',').trim()};$('gSel').textContent='📍 '+su.loc.name}
  catch(e){gErr('חיפוש המקום נכשל ('+e.message+') – בדקו חיבור ונסו שוב');return null}finally{$('busy').style.display='none'}}""")
R("toast(m==='rate_limit'?","gErr(m==='rate_limit'?")
R("catch(e){window.__genErr=String(e);toast('יצירת הסיור נכשלה: '+e.message)","catch(e){window.__genErr=String(e);gErr('יצירת הסיור נכשלה: '+e.message)")
R("'יצירת הסיור נכשלה, נסו שוב');return null}","'יצירת הסיור נכשלה ('+(m||'שגיאת שרת')+'), נסו שוב');return null}")
# SW auto-reload on update
R("if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js');",
"if('serviceWorker' in navigator&&location.protocol==='https:'){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update());let rl=0;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!rl&&navigator.serviceWorker.controller){rl=1;if(!$('busy')||$('busy').style.display!=='flex')location.reload()}})}")
R("VER='tours-1'","VER='tours-3'")
R('<h2>🧭 בואו נתכנן את הסיור</h2>','<h2>🧭 בואו נתכנן את הסיור <small style="font-size:11px;color:#999;font-weight:400">v3</small></h2>')
open('index.html','w').write(t)
