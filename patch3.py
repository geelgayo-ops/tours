t=open('index.html').read()
def R(a,b):
    global t
    assert a in t,a[:60]; t=t.replace(a,b,1)
R('<header><h1>','<header><button id="bHome" onclick="showHome()" style="padding:6px 8px;white-space:nowrap">→ ראשי</button><h1>')
R('<button id="bFb" title="משוב">💬</button>','<button id="bRate" title="דרגו">⭐</button><button id="bFb" title="משוב">💬</button>')
R('#chip{','''#home{position:fixed;inset:0;background:#fff7ed;z-index:2100;overflow:auto;padding:14px 14px 40px}#home h1{color:#c2410c;margin:4px 0;font-size:24px}#home h3{margin:18px 4px 6px;color:#7c2d12}
.tc{background:#fff;border-radius:14px;padding:12px;margin:8px 0;box-shadow:0 1px 5px #0002}.tc b{font-size:16px}.tm{font-size:13px;color:#555;margin-top:3px}
.big{width:100%;padding:16px;font-size:19px;border-radius:14px;box-shadow:0 3px 10px #c2410c55}.rvi{border-bottom:1px solid #eee;padding:8px 0}
#rev,#revs,#fb{z-index:2600}header h1{font-size:15px}header button{padding:6px 9px}
#chip{''')
R('<div id="setup" class="hidden"><h2>🧭 בואו נתכנן את הסיור <small style="font-size:11px;color:#999;font-weight:400">v3</small></h2>',
'''<div id="home"><div style="display:flex;align-items:center;justify-content:space-between"><h1>🚶 סיורים בהליכה</h1><small style="color:#999">v4</small></div>
<div style="color:#555;margin-bottom:12px">סיורים מודרכים עם מפה, הדרכה והפעלות לכל תחנה</div>
<button class="pri big" onclick="openNew()">➕ סיור חדש – בכל מקום בעולם</button>
<input type="text" id="hq" placeholder="🔍 חיפוש סיור לפי מקום" oninput="renderHome()" style="margin-top:12px">
<div id="hList"></div><div class="row" style="margin-top:18px"><button onclick="openFb()">💬 משוב על האפליקציה</button></div></div>
<div id="setup" class="hidden"><button onclick="history.back()" style="border:1px solid #c2410c;margin-bottom:6px">→ חזרה</button><h2 id="setTitle"></h2>''')
R('<div class="fld"><b>📍 אזור הסיור</b>','<div class="fld" id="areaFld" style="display:none"><b>📍 אזור הסיור</b>')
R('<div class="sheet" id="rev"></div>','<div class="sheet" id="rev"></div><div class="sheet" id="revs"></div>')
# move newBox out of hidden area field: show it as its own field
R('<div id="newBox" style="display:none;margin-top:10px">','</div><div class="fld" id="newBox" style="display:none"><b>📍 איפה?</b>')
R("""placeholder="מקום אחר? הקלידו כאן (למשל Manhattan, New York)" style="margin-top:8px"><div id="reqOk" style="font-size:13px;color:#16a34a"></div></div>""","""style="display:none"><div id="reqOk"></div>""")
R("$('newBox').style.display=su.area==='new'?'':'none';","$('newBox').style.display=su.area==='new'?'':'none';$('goBtn').textContent=su.area==='new'?'✨ צרו לי סיור':'יוצאים לסיור! 🚶';")
R('onclick="startTour()">יוצאים לסיור! 🚶</button>','onclick="startTour()" id="goBtn">יוצאים לסיור! 🚶</button>')
# startTour: use su.area (not dropdown) and push tour state
R("async function startTour(){if($('sArea').value==='new')","async function startTour(){if(su.area!=='new'){ensureOpt(su.area);$('sArea').value=su.area}if(su.area==='new')")
R("$('setup').classList.add('hidden');renderChip();","$('setup').classList.add('hidden');$('home').style.display='none';history.replaceState({v:'tour'},'');renderChip();")
# reviews: per tour key
R("function openReview(keep){","function openReview(keep,k){if(k)RVT=k;else if(!keep)RVT=TOUR;const RK=RVT||TOUR,RT=TOURS[RK];")
R("${TOURS[TOUR].name} · ביקרתם ב-${st.visited.length} מתוך ${STATIONS.length} תחנות","${esc(RT.title)}${RK===TOUR?` · ביקרתם ב-${st.visited.length} מתוך ${STATIONS.length} תחנות`:''}")
R("<h2>🎉 כל הכבוד! איך היה הסיור?</h2>","<h2>${RK===TOUR&&st.visited.length===STATIONS.length?'🎉 כל הכבוד! ':''}איך היה הסיור?</h2>")
R("const ok=await send('tour_reviews',{tour:TOUR,","const RK=RVT||TOUR;const ok=await send('tour_reviews',{tour:RK,")
R("visited:st.visited.length,total:STATIONS.length,","visited:RK===TOUR?st.visited.length:null,total:TOURS[RK].stations.length,")
R("hide('rev');toast(ok?'תודה! הדירוג נשלח 🙏'","hide('rev');if(ok){loadStats();if(!$('home').style.display||$('home').style.display==='block')openRevs(RK)}toast(ok?'תודה! הדירוג נשלח 🙏'")
R("function hideAll(){['card','list','menu','rev','fb']","function hideAll(){['card','list','menu','rev','fb','revs']")
R("$('bFb').onclick=()=>openFb();","$('bFb').onclick=()=>openFb();$('bRate').onclick=()=>openReview();")
R("VER='tours-3'","VER='tours-4'")
H=open('home.js').read()
R("renderChip();openSetup();",H+"renderChip();history.replaceState({v:'home'},'');showHome(false);loadStats();")
open('index.html','w').write(t)
t=open('index.html').read()
R("const x=r[0];let la","const x=r.find(y=>/^(place|boundary)$/.test(y.category||y.class))||r.find(y=>/^(historic|tourism|leisure|landuse|highway)$/.test(y.category))||r[0];let la")
open('index.html','w').write(t)
