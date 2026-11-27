# v8: beta notice, legal views, safety confirmation, feedback questionnaire.
t=open('index.html',encoding='utf-8').read()
t=t.replace("VER='tours-7'","VER='tours-8'",1).replace('>v7</small>','>v8</small>',1)
if 'src="beta.js"' not in t:
    anchor='</script></body></html>'
    if anchor not in t:
        anchor='</script>\n</body></html>'
    assert anchor in t, 'beta script anchor missing'
    t=t.replace(anchor,'</script>\n<script src="beta.js"></script>\n</body></html>',1)
open('index.html','w',encoding='utf-8').write(t)
