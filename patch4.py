t=open('index.html').read()
def R(a,b):
    global t
    assert a in t,a[:60]; t=t.replace(a,b,1)
R('<input type="text" id="hq" placeholder="🔍 חיפוש סיור לפי מקום" oninput="renderHome()" style="margin-top:12px">\n<div id="hList"></div>',
'<div class="fld" style="margin-top:14px"><b>📋 בחרו סיור מוכן</b><select id="hSel" onchange="renderHome()"></select><div id="hList"></div></div>')
R('<small style="color:#999">v4</small>','<small style="color:#999">v5</small>')
R("VER='tours-4'","VER='tours-5'")
R("function renderHome(){",r"""const CITY={talpiot:'חיפה – שוק תלפיות',tlv:'תל אביב – העיר הלבנה',germancolony:'חיפה – המושבה הגרמנית',jaffa:'תל אביב-יפו – יפו העתיקה',mahaneyehuda:'ירושלים – שוק מחנה יהודה'};
function dname(k){if(CITY[k])return CITY[k];const T=TOURS[k];const pl=String(T.name||'').split(',')[0].trim();return pl+' – '+String(T.title).replace(/^🌍\s*/,'')}
function renderHome(){const sel=$('hSel'),cur=sel.value;
 const grp=(lab,ks)=>{ks=ks.filter(k=>TOURS[k]).sort((a,b)=>dname(a).localeCompare(dname(b),'he'));return ks.length?`<optgroup label="${lab}">`+ks.map(k=>`<option value="${k}">${esc(dname(k))}</option>`).join('')+'</optgroup>':''};
 sel.innerHTML='<option value="">— בחרו סיור —</option>'+grp('סיורים מומלצים',CUR)+grp('הסיורים שלי',Object.keys(GEN).map(i=>'gen:'+i))+grp('סיורי הקהילה (AI)',COMM.map(g=>'gen:'+g.id));
 if(cur&&TOURS[cur])sel.value=cur;$('hList').innerHTML=sel.value?card(sel.value):'<div class="tm" style="margin-top:8px">'+(sel.options.length-1)+' סיורים זמינים</div>';return;
""")
R("<b>${esc(T.title)}</b>","<b>${esc(dname(k))}</b>")
R("if(q)document.querySelectorAll","if(0)document.querySelectorAll")
R("const q=($('hq').value||'').trim().toLowerCase();","")
open('index.html','w').write(t)
