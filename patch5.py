# v6: spoken narration for the station explanation and the kids activity
t=open('index.html',encoding='utf-8').read()
def R(a,b):
    global t
    assert a in t, a[:80]
    t=t.replace(a,b,1)

R('#chip{position:fixed','''.sayrow{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}
.sayrow b{flex:1}
button.say{flex:none;padding:6px 10px;font-size:14px;border:1px solid #c2410c;white-space:nowrap}
button.say.on{background:#c2410c;color:#fff}
.narrline{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13px;color:#444;margin:2px 0 8px}
.narrline select{width:auto;max-width:100%;padding:4px 8px;font:inherit;border:1px solid #ccc;border-radius:8px;background:#fff}
.narrhint{font-size:13px;color:#666;margin-top:6px}
#narrHome label,.narlab{display:flex;align-items:center;gap:6px;margin-top:8px;font-weight:400}
#chip{position:fixed''')
R('>v5</small>','>v6</small>')
R("VER='tours-5'","VER='tours-6'")
R('סיורים מודרכים עם מפה, הדרכה והפעלות לכל תחנה','סיורים מודרכים עם מפה, הדרכה מוקראת והפעלות לכל תחנה')
R('onclick="openNew()">➕ סיור חדש – בכל מקום בעולם</button>\n',
  'onclick="openNew()">➕ סיור חדש – בכל מקום בעולם</button>\n<div class="fld" id="narrHome"></div>\n')
R(''' <div class="box par"><b>👨‍👩‍👧‍👦 להורים:</b><br>${s.parents}</div>
 ${s.kids&&kidsOn()?`<div class="box kid"><b>🧒 משימה לילדים:</b><br>${s.kids}</div>`:''}${s.q?`<div class="box kid"><b>❓ שאלת התבוננות:</b><br>${s.q}</div>`:''}''',
 ''' ${narrCardLine()}
 ${narrParentsBox(s)}
 ${narrKidsBox(s)}
 ${narrQBox(s)}''')
R("function loadTour(t){if(!TOURS[t])t='talpiot';","function loadTour(t){narrStop();if(!TOURS[t])t='talpiot';")
R("function openCard(n,auto){const s=byN(n);openN=n;","function openCard(n,auto){const prevOpen=openN;const s=byN(n);openN=n;")
R("show('card');refresh()}","show('card');refresh();narrAfterCard(prevOpen,n)}")
R("function hide(id){$(id).classList.remove('open');if(id==='card')openN=null}",
  "function hide(id){$(id).classList.remove('open');if(id==='card'){openN=null;narrStop()}}")
R('<h2>הגדרות</h2>\n <p><label><input type="checkbox" id="simCb"',
  '<h2>הגדרות</h2>\n <div class="fld">${narrPanelHtml()}</div>\n <p><label><input type="checkbox" id="simCb"')
R("סיורים זמינים</div>';return;","סיורים זמינים</div>';narrMount();return;")
R("function showHome(push){hideAll();","function showHome(push){narrStop();hideAll();")
js=open('speech.js',encoding='utf-8').read()
R("renderChip();history.replaceState({v:'home'},'');showHome(false);loadStats();",
  js+"\nrenderChip();history.replaceState({v:'home'},'');showHome(false);loadStats();")
open('index.html','w',encoding='utf-8').write(t)
