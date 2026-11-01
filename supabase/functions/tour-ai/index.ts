import { createClient } from "npm:@supabase/supabase-js@2";
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const MODEL=Deno.env.get("GEMINI_MODEL")||"gemini-3.1-flash-lite", LIM_USER=15, LIM_IP=8;
const j=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{...CORS,"Content-Type":"application/json"}});
const s=(x:unknown,n=1500)=>typeof x==="string"?x.slice(0,n):"";
const UA={"User-Agent":"tours-app/1 (geelgayo-ops.github.io/tours)"};
const LN:Record<string,string>={he:"Hebrew",en:"English",ar:"Arabic",ru:"Russian"};
function dist(a:number,b:number,c:number,d:number){const R=6371e3,r=Math.PI/180,x=(d-b)*r*Math.cos((a+c)/2*r),y=(c-a)*r;return Math.sqrt(x*x+y*y)*R}
async function pois(lat:number,lng:number,rad:number){
 const f=`(around:${rad},${lat},${lng})`;
 const q=`[out:json][timeout:20];(nwr["historic"]["name"]${f};nwr["tourism"~"attraction|museum|viewpoint|artwork|gallery"]["name"]${f};nwr["amenity"~"place_of_worship|marketplace|theatre|fountain|townhall"]["name"]${f};nwr["leisure"~"park|nature_reserve"]["name"]${f};nwr["natural"~"beach|cape|peak"]["name"]${f};nwr["man_made"~"pier|lighthouse"]["name"]${f};);out center tags 300;`;
 const one=async(ep:string)=>{const r=await fetch(ep,{method:"POST",headers:{...UA,"Content-Type":"application/x-www-form-urlencoded"},body:"data="+encodeURIComponent(q),signal:AbortSignal.timeout(15000)});
  if(!r.ok) throw new Error(String(r.status)); return await r.json()};
 let d:any; try{d=await Promise.any(["https://overpass-api.de/api/interpreter","https://overpass.private.coffee/api/interpreter"].map(one))}catch(_){return null}
 const out:any[]=[],seen=new Set<string>();
 for(const e of d.elements||[]){const la=e.lat??e.center?.lat, lo=e.lon??e.center?.lon, nm=e.tags?.name; if(!la||!nm||seen.has(nm))continue; seen.add(nm);
  const t=e.tags; out.push({name:nm,name_en:t["name:en"]||"",name_he:t["name:he"]||"",kind:t.historic||t.tourism||t.amenity||t.leisure||t.natural||t.man_made||"",
   desc:(t.description||"").slice(0,150),wiki:t.wikipedia||"",lat:+la.toFixed(6),lng:+lo.toFixed(6),d:Math.round(dist(lat,lng,la,lo))});}
 return out;
}
const dbg:string[]=[];const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
// fallback when Overpass is down/slow: Wikipedia geosearch + a few Nominatim category searches (real places, real coordinates)
async function fallback(lat:number,lng:number,rad:number){
 const out:any[]=[],seen=new Set<string>();const add=(nm:string,la:number,lo:number,kind:string,wiki="")=>{if(!nm||seen.has(nm))return;seen.add(nm);out.push({name:nm,name_en:"",name_he:"",kind,desc:"",wiki,lat:+(+la).toFixed(6),lng:+(+lo).toFixed(6),d:Math.round(dist(lat,lng,la,lo))})};
 const wk=fetch(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lng}&gsradius=${Math.min(10000,rad)}&gslimit=50&format=json`,{headers:UA,signal:AbortSignal.timeout(10000)}).then(r=>r.json()).catch(()=>({}));
 const dy=rad/111000,dx=rad/(111000*Math.cos(lat*Math.PI/180)),vb=`${lng-dx},${lat+dy},${lng+dx},${lat-dy}`;
 for(const q of ["museum","monument","church","market","park","plaza","beach","viewpoint"]){
  try{const r=await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2&limit=12&bounded=1&viewbox=${vb}`,{headers:UA,signal:AbortSignal.timeout(6000)});
   for(const x of await r.json()) if(!/resort|hotel|guest_house|hostel|restaurant/.test(x.type)) add(x.name,+x.lat,+x.lon,x.type||q)}catch(e){dbg.push(q+':'+String(e).slice(0,60))}
  await sleep(1000);
 }
 for(const g of (await wk).query?.geosearch||[]) add(g.title,g.lat,g.lon,"wikipedia","en:"+g.title);
 return out;
}
function pick(all:any[],n:number){for(const rad of [1200,2500,4000,6000]){const P=all.filter(p=>p.d<=rad);if(P.length>=n||rad===6000)return {P,rad}}return {P:all,rad:0}}
async function findPois(lat:number,lng:number,n:number,cp:any[]){
 const seen0=new Set<string>();const client=(Array.isArray(cp)?cp:[]).slice(0,120).map((x:any)=>({name:s(x?.name,120),name_en:"",name_he:"",kind:s(x?.kind,40),desc:"",wiki:s(x?.wiki,120),lat:+x?.lat,lng:+x?.lng}))
  .filter((x:any)=>x.name&&Number.isFinite(x.lat)&&Number.isFinite(x.lng)&&!seen0.has(x.name)&&seen0.add(x.name)).map((x:any)=>({...x,lat:+x.lat.toFixed(6),lng:+x.lng.toFixed(6),d:Math.round(dist(lat,lng,x.lat,x.lng))})).filter((x:any)=>x.d<=6000);
 if(client.filter((p:any)=>p.d<=4000).length>=n){const {P,rad}=pick(client,n);P.sort((a:any,b:any)=>(b.wiki?1:0)-(a.wiki?1:0)||a.d-b.d);return {P:P.slice(0,60).map((p:any,i:number)=>({...p,id:i})),src:"client-osm",rad}}
 let all=await pois(lat,lng,4000),src="overpass";
 if(client.length){const sn=new Set((all||[]).map(p=>p.name));all=[...(all||[]),...client.filter((p:any)=>!sn.has(p.name))];src=(all.length>client.length?"overpass+":"")+"client-osm"}
 if(!all||all.filter(p=>p.d<=4000).length<Math.min(n,5)){const fb=await fallback(lat,lng,6000);const seen=new Set((all||[]).map(p=>p.name));all=[...(all||[]),...fb.filter(p=>!seen.has(p.name))];src=all.length?"overpass+wikipedia+nominatim":"none"}
 const {P,rad}=pick(all,n);P.sort((a,b)=>(b.wiki?1:0)-(a.wiki?1:0)||a.d-b.d);
 return {P:P.slice(0,60).map((p,i)=>({...p,id:i})),src,rad};
}
async function route(st:any[]){
 const c=st.map(p=>`${p.lng},${p.lat}`).join(";");
 try{const r=await fetch(`https://routing.openstreetmap.de/routed-foot/route/v1/foot/${c}?overview=full&geometries=geojson`,{headers:UA,signal:AbortSignal.timeout(20000)});
  const d=await r.json(); const rt=d.routes?.[0]; if(!rt) return null;
  return {coords:rt.geometry.coordinates.map(([x,y]:number[])=>[+y.toFixed(6),+x.toFixed(6)]),dist:Math.round(rt.distance),dur:Math.round(rt.duration/60)};
 }catch(_){return null}
}
// order greedily by nearest neighbour from the start point
function order(st:any[],lat:number,lng:number){const left=[...st],o:any[]=[];let cl=lat,cg=lng;
 while(left.length){let bi=0,bd=1e12;left.forEach((p,i)=>{const d=dist(cl,cg,p.lat,p.lng);if(d<bd){bd=d;bi=i}});const p=left.splice(bi,1)[0];o.push(p);cl=p.lat;cg=p.lng}return o}
const ST={type:"OBJECT",properties:{poi_id:{type:"INTEGER"},name:{type:"STRING"},where:{type:"STRING"},dir:{type:"STRING"},parents:{type:"STRING"},kids:{type:"STRING"},q:{type:"STRING"},video:{type:"STRING"}},required:["poi_id","name","where","dir","parents","q","video"]};
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:CORS});
 try{
  const url=Deno.env.get("SUPABASE_URL")!, admin=createClient(url,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const auth=(req.headers.get("Authorization")||"").replace(/^Bearer\s+/i,"");
  let uid:string|null=null; try{const {data}=await admin.auth.getUser(auth); uid=data?.user?.id||null}catch(_){}
  const ip=(req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||"unknown";
  const {error:rl}=await admin.rpc("bump_tour_ai",{key:uid?"u:"+uid:"ip:"+ip,lim:uid?LIM_USER:LIM_IP});
  if(rl) return j({error:rl.message.includes("rate_limit")?"rate_limit":"usage_error"},429);
  const b=await req.json(); const lat=+b.lat,lng=+b.lng;
  if(!(Math.abs(lat)<=85&&Math.abs(lng)<=180)) return j({error:"bad location"},400);
  const lang=LN[b.lang]?b.lang:"he", dur=[60,90,120].includes(+b.dur)?+b.dur:90, ad=Math.min(10,Math.max(1,+b.adults||2)), kids=Math.min(10,Math.max(0,+b.kids||0));
  const ages=(Array.isArray(b.ages)?b.ages:[]).slice(0,10).map((x:unknown)=>parseInt(String(x))).filter((x:number)=>x>0&&x<18);
  const place=s(b.place,200), n=dur===60?6:dur===90?7:9;
  dbg.length=0;const {P,src,rad}=await findPois(lat,lng,n,b.pois);
  if(P.length<3) return j({error:"not_enough_places",found:P.length,src,dbg:dbg.slice(0,4)},422);
  const prompt=`You are an expert local walking-tour guide. Build a ${dur}-minute urban WALKING tour near "${place||`${lat},${lng}`}" (start point ${lat},${lng}) for ${ad} adults and ${kids} children${ages.length?` aged ${ages.join(", ")}`:""}.
Choose ${Math.min(n,P.length)} stations (fewer if the area is sparse; include beaches, piers, markets, churches, viewpoints if walkable; skip places requiring a vehicle) ONLY from this list of real places from OpenStreetMap (refer by poi_id; never invent places). Prefer well-known, interesting, publicly accessible places that form a compact walk (total walk ideally under ${dur===60?2:dur===90?3:4} km; dist_m is distance from start) starting near the start point.
POIS: ${JSON.stringify(P.map(({id,name,name_en,kind,desc,wiki,d})=>({id,name,name_en,kind,desc,wiki,dist_m:d})))}
Write ALL text in ${LN[lang]}${lang==="he"?" (use local names transliterated to Hebrew, with the original name in parentheses once)":""}. For each station:
- name: station title; where: short location hint; dir: walking direction from previous station (first: how to find the start).
- parents: 90-160 word engaging narration with real, well-established history/facts only. If unsure about a fact, stay general rather than invent dates or numbers.
- kids: ${kids?"a fun, safe 1-2 sentence task for children (look/count/find), suitable for the ages":"empty string"}.
- q: an observation question for adults. video: one line script idea for a short station video.
Also return a tour title.`;
  const key=Deno.env.get("GEMINI_API_KEY");
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{responseMimeType:"application/json",temperature:0.6,
    responseSchema:{type:"OBJECT",properties:{title:{type:"STRING"},stations:{type:"ARRAY",items:ST}},required:["title","stations"]}}})});
  if(!r.ok) throw new Error("gemini "+r.status+": "+(await r.text()).slice(0,200));
  const d=await r.json(); const out=JSON.parse(d?.candidates?.[0]?.content?.parts?.map((p:any)=>p.text||"").join("")||"{}");
  const used=new Set<number>();
  let st=(out.stations||[]).filter((x:any)=>P[x.poi_id]&&!used.has(x.poi_id)&&used.add(x.poi_id)).slice(0,9)
   .map((x:any)=>({name:s(x.name,120),where:s(x.where,200),dir:s(x.dir,400),parents:s(x.parents),kids:kids?s(x.kids,500):"",q:s(x.q,500),video:s(x.video,300),
    lat:P[x.poi_id].lat,lng:P[x.poi_id].lng,osm:P[x.poi_id].name}));
  if(st.length<3) throw new Error("model returned too few stations");
  st=order(st,lat,lng).map((x,i)=>({n:i+1,...x}));
  const rt=await route(st);
  const title=s(out.title,200)||place;
  const {data:row,error}=await admin.from("tours_generated").insert({user_id:uid,place,lat,lng,lang,duration:dur,title,stations:st,route:rt,model:MODEL}).select("id,created_at").single();
  if(error) throw new Error(error.message);
  return j({id:row.id,title,place,lat,lng,lang,duration:dur,stations:st,route:rt,pois_found:P.length,poi_source:src,radius:rad});
 }catch(e){return j({error:String((e as Error).message||e)},500)}
});
