const GK='tours_gen_v1';let GEN=JSON.parse(localStorage.getItem(GK)||'{}');
function regGen(g){TOURS['gen:'+g.id]={name:g.place||g.title,title:'🌍 '+g.title,stations:g.stations,route:g.route?{coords:g.route.coords,dist:g.route.dist}:null,gen:1};AREAS['gen:'+g.id]=g.place||g.title}
Object.values(GEN).forEach(regGen);
function renderMyGen(){$('myGen').innerHTML=Object.values(GEN).map(g=>`<option value="gen:${g.id}">🌍 ${g.title}</option>`).join('');$('myGen').style.display=Object.keys(GEN).length?'':'none'}
const UA_H={'Accept-Language':'en'};
async function geoSearch(){const q=$('gq').value.trim();if(!q)return;$('gRes').textContent='מחפש…';
 try{const r=await (await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q='+encodeURIComponent(q),{headers:UA_H})).json();
  window._gr=r;$('gRes').innerHTML=r.length?r.map((x,i)=>`<div class="gr" onclick="pickLoc(+_gr[${i}].lat,+_gr[${i}].lon,_gr[${i}].display_name)">📍 ${x.display_name}</div>`).join(''):'לא נמצא – נסו ניסוח אחר באנגלית'}catch(e){$('gRes').textContent='שגיאת חיפוש'}}
function useGps(){if(!navigator.geolocation){toast('אין GPS בדפדפן');return}$('gSel').textContent='מאתר מיקום…';
 navigator.geolocation.getCurrentPosition(async p=>{const la=p.coords.latitude,lo=p.coords.longitude;let nm=`${la.toFixed(4)}, ${lo.toFixed(4)}`;
  try{const r=await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&lat=${la}&lon=${lo}`,{headers:UA_H})).json();if(r.display_name)nm=r.display_name}catch(e){}
  pickLoc(la,lo,nm)},e=>{$('gSel').textContent='';toast('אין גישה למיקום: '+e.message)},{enableHighAccuracy:true,timeout:20000})}
async function pickLoc(la,lo,nm){su.loc={lat:la,lng:lo,name:String(nm).split(',').slice(0,3).join(',').trim()};$('gRes').innerHTML='';
 if(su.lang!=='he'&&su.lang!=='en')su.lang='he';renderSetup();if(!SB)return;
 const d=.03,dx=d/Math.cos(la*Math.PI/180),{data}=await SB.from('tours_generated').select('id,title,place,lat,lng,lang,duration,stations,route,rating_sum,rating_count').gte('lat',la-d).lte('lat',la+d).gte('lng',lo-dx).lte('lng',lo+dx).order('rating_count',{ascending:false}).limit(5);
 window._near=data||[];$('gNear').innerHTML=_near.length?'<div style="margin-top:8px;font-size:14px"><b>סיורים שכבר נוצרו בקרבת מקום:</b></div>'+_near.map((g,i)=>`<div class="gr" onclick="useNear(${i})">🌍 ${g.title} · ${g.stations.length} תחנות · ${g.lang==='en'?'English':'עברית'}${g.rating_count?` · ⭐${(g.rating_sum/g.rating_count).toFixed(1)} (${g.rating_count})`:''}</div>`).join('')+'<div style="font-size:12px;color:#666">או לחצו "יוצאים לסיור" ליצירת סיור חדש</div>':''}
function useNear(i){const g=_near[i];GEN[g.id]=g;localStorage.setItem(GK,JSON.stringify(GEN));regGen(g);su.area='gen:'+g.id;renderSetup();toast('נבחר: '+g.title)}
// gather real POIs in the browser (Overpass, fallback Nominatim+Wikipedia) and pass them to the server
async function clientPois(la,lo){const out=[],seen=new Set(),add=(name,lat,lng,kind,wiki)=>{if(name&&lat&&!seen.has(name)){seen.add(name);out.push({name,lat,lng,kind,wiki:wiki||''})}};
 const f=`(around:3000,${la},${lo})`,q=`[out:json][timeout:20];(nwr["historic"]["name"]${f};nwr["tourism"~"attraction|museum|viewpoint|artwork|gallery"]["name"]${f};nwr["amenity"~"place_of_worship|marketplace|theatre|fountain|townhall"]["name"]${f};nwr["leisure"~"park|nature_reserve"]["name"]${f};nwr["natural"~"beach|cape"]["name"]${f};nwr["man_made"~"pier|lighthouse"]["name"]${f};);out center tags 250;`;
 try{const ac=new AbortController();setTimeout(()=>ac.abort(),15000);const d=await (await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(q),signal:ac.signal})).json();
  (d.elements||[]).forEach(e=>{const t=e.tags||{};add(t.name,e.lat??e.center?.lat,e.lon??e.center?.lon,t.historic||t.tourism||t.amenity||t.leisure||t.natural||t.man_made,t.wikipedia)})}catch(e){}
 if(out.length<8){try{const w=await (await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${la}|${lo}&gsradius=6000&gslimit=50&format=json&origin=*`)).json();(w.query?.geosearch||[]).forEach(g=>add(g.title,g.lat,g.lon,'wikipedia','en:'+g.title))}catch(e){}
  const dy=.04,dx=.04/Math.cos(la*Math.PI/180),vb=`${lo-dx},${la+dy},${lo+dx},${la-dy}`;
  for(const k of ['museum','monument','church','market','park','plaza','beach','viewpoint','pier','town hall']){try{$('busyT').textContent='מחפשים מקומות בסביבה… ('+k+')';
   (await (await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=12&bounded=1&viewbox=${vb}&q=${encodeURIComponent(k)}`,{headers:UA_H})).json()).forEach(x=>{if(!/resort|hotel|guest_house|hostel|restaurant/.test(x.type))add(x.name,+x.lat,+x.lon,x.type)})}catch(e){}await new Promise(r=>setTimeout(r,1000))}}
 window.__lastPois=out;return out}
async function genTour(){if(!su.loc){toast('בחרו מיקום נוכחי או חפשו מקום');return null}
 $('busy').style.display='flex';$('busyT').textContent='מחפשים מקומות בסביבה…';
 try{const pois=await clientPois(su.loc.lat,su.loc.lng);$('busyT').textContent='כותבים את ההדרכה לכל תחנה…';
  const {data,error}=await SB.functions.invoke('tour-ai',{body:{lat:su.loc.lat,lng:su.loc.lng,place:su.loc.name,dur:su.dur,lang:su.lang==='en'?'en':'he',adults:su.adults,kids:su.kids,ages:su.ages,pois}});
  if(error||!data||data.error){let m=data&&data.error;try{m=m||(await error.context.json()).error}catch(e){}window.__genErr=m||String(error);
   toast(m==='rate_limit'?'הגעתם למגבלת הסיורים היומית – נסו מחר':m==='not_enough_places'?'לא נמצאו מספיק מקומות מעניינים בסביבה – נסו מקום אחר':'יצירת הסיור נכשלה, נסו שוב');return null}
  GEN[data.id]=data;localStorage.setItem(GK,JSON.stringify(GEN));regGen(data);window.__gen=data;return 'gen:'+data.id}
 catch(e){window.__genErr=String(e);toast('יצירת הסיור נכשלה: '+e.message);return null}finally{$('busy').style.display='none'}}
