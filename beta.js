/* Beta-period notice, legal views, pre-tour safety confirmation, and feedback form.
   Hebrew copy comes from the launch drafts. Lawyer-review header notes are not shown.
   Feedback is stored with the existing tour_feedback insert (no new Supabase project). */
(function(){
const KEY_BANNER='tripme_beta_banner_v1';
const KEY_INTRO='tripme_beta_intro_v1';
const RAW_BANNER="tripme בהרצה: השימוש חינם כרגע. בעתיד ייגבה תשלום, ונודיע על כך מראש.\n";
const RAW_POPUP="tripme נמצאת בתקופת הרצה. בשלב זה השימוש בסיורים הוא בחינם.\n\nבעתיד ייגבה תשלום על השימוש בשירות. לפני שהתשלום יתחיל נודיע לכם מראש, כדי שתוכלו להחליט אם להמשיך.\n\nבתקופת ההרצה ייתכנו תקלות, וחלק מהמידע בסיורים עלול להיות לא מדויק. נשמח לשמוע מכם דרך כפתור המשוב.\n";
const RAW_TERMS="תנאי שימוש של tripme\nגרסה זמנית לתקופת ההרצה\nעודכן לאחרונה: [תאריך]\n\n1. מי אנחנו\ntripme היא אפליקציה לסיורי הליכה עירוניים, עם מפה, טקסט והדרכה קולית. משך הסיור הוא בדרך כלל כשעה עד שעתיים. את האפליקציה מפעיל גיל אלמליח, עוסק פטור שמספרו 069705846 (להלן: «המפעיל»), שכתובתו למשלוח דואר היא האלוף דוד 13, ראשון לציון 7564042. ליצירת קשר: tripme.walking@gmail.com.\n\n2. תקופת הרצה\nהשירות ניתן כרגע בגרסת הרצה (בטא) וללא תשלום. בעתיד ייגבה תשלום על השימוש בשירות. נודיע על כך מראש, ולא יבוצע חיוב בלי הסכמתכם.\n\n3. השירות ניתן «כמות שהוא»\nבתקופת ההרצה ייתכנו תקלות, הפסקות שירות וטעויות בתוכן. חלק מהסיורים נוצרים אוטומטית בעזרת בינה מלאכותית (Google Gemini) מתוך מידע ממפות פתוחות (OpenStreetMap). המידע עלול להיות שגוי או לא מעודכן, לרבות לגבי מסלולים, שעות פתיחה או נגישות של מקומות. אין לנו התחייבות שהשירות יהיה זמין בכל עת, מדויק או מתאים לצורך מסוים. יש לבדוק מידע חשוב לפני היציאה לדרך.\n\n4. אחריות המשתמש בזמן ההליכה\nאתם אחראים לבטיחותכם ולבטיחות מי שמלווה אתכם, כולל ילדים. יש לציית לחוקי התנועה ולשלטי הדרך, לשים לב לסביבה, שלא להסתכל במסך בזמן חציית כביש, ושלא להיכנס לשטח פרטי, סגור או מסוכן גם אם הוא מופיע במסלול. ההחלטה אם ללכת במסלול, ובאיזו דרך, היא שלכם בלבד. האפליקציה אינה מחליפה שיקול דעת, שילוט או הנחיות בשטח.\n\n5. גיל וקטינים\nבתקופת ההרצה אין הגבלת גיל לפתיחת חשבון או לשימוש בשירות. כשיתחיל גביית תשלום, פתיחת חשבון תהיה מגיל 15 ומעלה. נודיע על כך מראש, לפני תחילת הגבייה.\nשימוש של קטין בשירות ייעשה בידיעת הורה או אפוטרופוס. גילאי ילדים שמשתתפים בסיור מוזנים על ידי ההורה או המבוגר המלווה בלבד.\n\n6. קניין רוחני\nהטקסטים, ההקלטות, העיצוב, הסיורים והקוד של tripme שייכים למפעיל או לבעלי הזכויות בהם. מותר להשתמש בהם לשימוש אישי בלבד במהלך הסיור. אסור להעתיק, להפיץ, למכור או לפרסם אותם בלי אישור בכתב מראש. נתוני מפה מ־OpenStreetMap מוצגים לפי תנאי הרישיון שלהם (© OpenStreetMap contributors). אריחי המפה מסופקים על ידי Esri (ArcGIS World Street Map, Tiles © Esri).\n\n7. שימוש מותר\nאין להשתמש בשירות לכל מטרה בלתי חוקית, לנסות לפרוץ למערכת או לשבש אותה, להפעיל עליה כלים אוטומטיים בלי אישור, להתחזות לאחר, או לשלוח דרך האפליקציה תוכן פוגעני, מטעה או בלתי חוקי. אם תשלחו משוב או הערות, אתם מאשרים שאנחנו רשאים להשתמש בהם לשיפור השירות, בלי פרטים מזהים אם תבקשו זאת.\n\n8. הגבלת אחריות\nבמידה המרבית שהחוק מתיר, המפעיל לא יהיה אחראי לנזק ישיר או עקיף שנגרם עקב שימוש בשירות, תקלה, טעות בתוכן או הליכה לפי מסלול. אין באמור כדי לגרוע מאחריות שאי אפשר להגביל או להתנות עליה לפי דין, ואין בו כדי לגרוע מזכויות לפי חוק הגנת הצרכן, התשמ\"א-1981, ככל שהן חלות.\n\n9. הפסקת שימוש ושינויים\nאנחנו רשאים לשנות את השירות, להפסיק אותו או לחסום חשבון שמפר את התנאים האלה. אנחנו רשאים לעדכן את התנאים מעת לעת. על שינוי מהותי נודיע באפליקציה או במייל לפני שייכנס לתוקף. המשך שימוש אחרי מועד השינוי ייחשב להסכמה לתנאים המעודכנים, אלא אם הודיעו לנו שאינכם מסכימים.\n\n10. פרטיות\nהשימוש במידע האישי שלכם מתואר במדיניות הפרטיות של tripme.\n\n11. דין וסמכות שיפוט\nעל התנאים האלה יחול דין מדינת ישראל בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בראשון לציון, ישראל. אין בכך כדי לגרוע מזכויות צרכן שאינן ניתנות לוויתור לפי דין.\n\n12. יצירת קשר\nלשאלות בנוגע לתנאים אלה: tripme.walking@gmail.com.\n";
const RAW_PRIVACY="מדיניות פרטיות של tripme\nגרסה זמנית לתקופת ההרצה\nעודכן לאחרונה: [תאריך]\n\nמדיניות זו מתארת איזה מידע אישי אנחנו אוספים, למה, איך הוא נשמר ומהן הזכויות שלכם. היא נכתבה לפי חוק הגנת הפרטיות, התשמ\"א-1981, כולל תיקון 13, ולמשתמשים באיחוד האירופי גם לפי עקרונות ה־GDPR.\n\n1. מי אחראי למידע\nבעל השליטה במאגר המידע הוא גיל אלמליח, עוסק פטור שמספרו 069705846, שכתובתו למשלוח דואר היא האלוף דוד 13, ראשון לציון 7564042.\nלפניות בנושא פרטיות, עיון, תיקון או מחיקה: tripme.walking@gmail.com.\nאם לפי החוק נדרש רישום של מאגר המידע, פרטי הרישום יופיעו כאן: [מספר רישום מאגר, אם קיים].\nלא מונה ממונה על הגנת הפרטיות. אם בעתיד תחול חובה למנות ממונה, פרטיו יפורסמו כאן.\n\n2. איזה מידע נאסף ולשם מה\nאין חובה חוקית למסור לנו מידע. מסירת המידע תלויה ברצונכם ובהסכמתכם. בלי חלק מהפרטים לא נוכל לתת את השירות, או שחלק מהיכולות לא יעבדו.\n\n• כתובת מייל: כדי לפתוח חשבון, להתחבר, לאמת את החשבון ולשלוח הודעות על השירות (למשל אימות ומשוב). מסירת המייל נדרשת כדי להשתמש בחשבון.\n• מספר טלפון (מתוכנן, עדיין לא פעיל בהרצה): כדי לאפשר כניסה ואימות בטלפון. אם וכאשר האפשרות תופעל, נעדכן את המדיניות ונבקש את המספר רק אז.\n• מיקום GPS: כדי להציג את מיקומכם על המפה, להוביל בין תחנות הסיור ולהתאים סיור לאזור שבו אתם נמצאים. אישור המיקום הוא רשות דרך הגדרות המכשיר. בלי מיקום, הניווט בסיור לא יעבוד כראוי.\n• גילאי ילדים שמשתתפים בסיור: כדי להתאים את התוכן ואת ההפעלות לגילאים. השדה הוא רשות, וממלא אותו ההורה או המבוגר המלווה בלבד.\n• הערות, משוב ותגובות שאתם שולחים: כדי לשפר את השירות ולתקן תקלות. מסירתם רשות.\n• נתונים טכניים: סוג מכשיר או דפדפן, נתוני שימוש בסיסיים ויומני שגיאות, לצורך תפעול, אבטחה ותיקון תקלות. אלה נאספים אוטומטית בזמן השימוש.\n• נתוני כניסה במכשיר: ייתכן שנשמור במכשיר מזהה כניסה או הגדרות, כדי שתישארו מחוברים.\n\nאנחנו לא מבקשים מספר זהות, כתובת מגורים או אמצעי תשלום בתקופת ההרצה, משום שאין גבייה בשלב זה.\n\n3. מיקום בזמן הסיור\nאנחנו משתמשים במיקום רק כשהאפליקציה פתוחה, ורק אחרי שאישרתם את הגישה בהגדרות המכשיר. אפשר לבטל את ההרשאה בכל עת בהגדרות המכשיר. ביטול ההרשאה עלול למנוע ניווט בסיור.\nהמיקום לא משמש לפרסום של צדדים שלישיים. ככל שנתוני מיקום או מסלול הליכה נשמרים בשרת, הם יישמרו כל עוד החשבון פעיל, ויימחקו בתוך 30 יום ממועד מחיקת החשבון.\n\n4. מידע על ילדים\nבתקופת ההרצה אין הגבלת גיל לפתיחת חשבון. כשיתחיל גביית תשלום, פתיחת חשבון תהיה מגיל 15 ומעלה, ונודיע על כך מראש.\nהשירות עשוי לשמש גם משפחות עם ילדים. שימוש של קטין ייעשה בידיעת הורה או אפוטרופוס. את גילאי הילדים המשתתפים בסיור מזין ההורה או המבוגר המלווה. אנחנו לא מבקשים שמות של ילדים, תמונות שלהם או פרט מזהה אחר עליהם.\nאם הוזנו גילאי ילדים בעת יצירת סיור חדש, הם עשויים להישלח ל־Google Gemini, יחד עם האזור ומספר המשתתפים, כדי להתאים את ההדרכה וההפעלות לגילאים.\n\n5. הבסיס החוקי לעיבוד (למשתמשים מהאיחוד האירופי)\nאם אתם באיחוד האירופי, העיבוד נשען על הבסיסים האלה לפי ה־GDPR:\n• ביצוע השירות שביקשתם: הפעלת חשבון, שליחת מיילים תפעוליים ושימוש במיקום בזמן סיור.\n• הסכמה: מסירת גילאי ילדים, משוב, ואישור גישה למיקום במכשיר. אפשר לבטל הסכמה בכל עת.\n• אינטרס לגיטימי: אבטחת השירות, מניעת שימוש לרעה ושיפור האפליקציה, כל עוד אין בכך פגיעה יתרה בזכויותיכם.\n\n6. עם מי משתפים את המידע\nאנחנו לא מוכרים מידע אישי ולא מוסרים אותו לפרסום של אחרים. המידע נמסר לספקי שירות שעובדים בשבילנו כדי להפעיל את tripme, ורק במידה הדרושה לכך:\n• Supabase: אחסון הנתונים וניהול חשבונות. השרתים נמצאים בפרנקפורט, גרמניה, באיחוד האירופי.\n• Google (Gmail): שליחת מיילים מהכתובת tripme.walking@gmail.com.\n• GitHub Pages: אחסון האתר של האפליקציה.\n• Esri (ArcGIS World Street Map): אריחי המפה. בקשת האריחים עשויה לחשוף את האזור שבו אתם נמצאים.\n• OpenStreetMap Nominatim: חיפוש מקום וזיהוי כתובת לפי מיקום.\n• Overpass API (נתוני OpenStreetMap): איתור מקומות בסביבה.\n• OSRM (routing.openstreetmap.de): חישוב מסלול ההליכה בין התחנות.\n• ויקיפדיה (API): איתור מקומות בסביבה, כחלופה אם שירות אחר אינו זמין.\n• Google Gemini: כתיבת סיור חדש במקום שביקשתם, דרך פונקציית השרת tour-ai. לצורך זה עשויים להישלח האזור או שם המקום, משך הסיור, השפה, מספר המשתתפים וגילאי ילדים אם הוזנו. אין נשלח במכוון את שם המשתמש או את כתובת המייל לספק זה.\n\nההקראה הקולית נעשית במכשיר עצמו, באמצעות מנגנון ההקראה המובנה בדפדפן (Web Speech API). האפליקציה אינה שולחת את טקסט ההדרכה לשירות הקראה חיצוני.\n\nאם נדרש לפי דין, או לפי צו של בית משפט או רשות מוסמכת, נמסור מידע גם לרשות כזו.\n\n7. היכן נשמר המידע והעברות לחוץ לארץ\nהמידע העיקרי נשמר אצל Supabase באיחוד האירופי (פרנקפורט). ישראל והאיחוד האירופי מכירים זה בזה, בכפוף לדין החל, כבעלי רמת הגנה הולמת.\nחלק מהספקים (למשל Google, GitHub, Esri, או שירותי OpenStreetMap וויקיפדיה) עשויים לעבד מידע גם מחוץ לישראל או לאיחוד האירופי, לרבות בארצות הברית. [יש לאשר את מנגנון ההעברה מול עורך דין, אם נדרש.]\n\n8. כמה זמן שומרים את המידע\n• מידע החשבון (מייל ונתוני שימוש בחשבון): כל עוד החשבון פעיל.\n• אחרי בקשת מחיקה או מחיקת חשבון: נמחק את המידע האישי, כולל נתוני מיקום ומסלול ככל שנשמרו בשרת, בתוך 30 יום ממועד המחיקה, למעט מידע שהדין מחייב לשמור לתקופה ארוכה יותר.\n• משוב: אם אפשר להסיר ממנו פרטים מזהים, עותק לא מזהה עשוי להישמר כדי לשפר את השירות.\n• מיקום: משמש להפעלת הסיור. ככל שנשמר בשרת, יימחק בתוך 30 יום ממועד מחיקת החשבון.\n\n9. אבטחת מידע\nאנחנו נוקטים אמצעים סבירים כדי להגן על המידע, ובכלל זה הצפנה בתעבורה והגבלת גישה למי שצריך אותה לצורך הפעלת השירות. אין שיטה שהיא מאובטחת לחלוטין, ולכן אי אפשר להבטיח הגנה מוחלטת.\n\n10. הזכויות שלכם\nלפי חוק הגנת הפרטיות, התשמ\"א-1981, כולל תיקון 13, אתם רשאים:\n• לעיין במידע האישי עליכם המוחזק במאגר, בעברית, בערבית או באנגלית.\n• לבקש תיקון של מידע שאינו נכון, שלם, ברור או מעודכן, או את מחיקתו.\n• לבטל הסכמה שנתתם, כאשר העיבוד מבוסס על הסכמה.\n\nאם אתם באיחוד האירופי, לפי ה־GDPR אתם רשאים גם לבקש עותק מהמידע בפורמט נפוץ וקריא במחשב, להגביל את העיבוד או להתנגד לו, ולהגיש תלונה לרשות להגנת המידע במדינתכם.\n\nבישראל אפשר לפנות גם לרשות להגנת הפרטיות במשרד המשפטים, באתר: https://www.gov.il/he/departments/the_privacy_protection_authority\n\nאנחנו רשאים לבקש פרטים סבירים כדי לוודא שמי שמבקש את המידע הוא בעל החשבון. במקרים מסוימים הדין מתיר לסרב לבקשה, ואז נסביר את הסיבה, בכפוף לחוק.\n\n11. איך מבקשים עיון, תיקון או מחיקה\nשלחו מייל אל tripme.walking@gmail.com, רצוי מהכתובת הרשומה בחשבון. בנושא המייל כתבו «בקשת פרטיות», ובגוף ההודעה ציינו אם אתם מבקשים עיון, תיקון או מחיקה של החשבון והמידע.\nנשתדל להשיב בתוך 30 יום מיום קבלת הבקשה.\n[מומלץ להוסיף בעתיד באפליקציה כפתור «מחיקת חשבון».]\n\n12. שינויים במדיניות\nאנחנו רשאים לעדכן מדיניות זו. על שינוי מהותי נודיע באפליקציה או למייל של החשבון, לפני שהשינוי ייכנס לתוקף ככל שהדבר ישים.\n";
const RAW_SAFETY="לפני שיוצאים לדרך\n\nהסיור נעשה בהליכה בשטח עירוני, ברחובות וליד תנועה. האחריות לבטיחות היא שלכם.\n\n• שימו לב לתנועה ולסביבה. אל תסתכלו במסך כשאתם חוצים כביש או הולכים ליד כלי רכב.\n• חצו במעברי חצייה ובאור ירוק להולכי רגל, וצייתו לשלטים ולהוראות בשטח.\n• ילדים ומלווים הם באחריותכם. השגיחו עליהם לאורך כל הסיור.\n• המסלול והמידע בסיור נוצרים בחלקם אוטומטית, ועלולים לכלול טעויות. אם מקום נראה סגור, פרטי או מסוכן, דלגו עליו ואל תיכנסו אליו.\n• הסיור נמשך לרוב כשעה עד שעתיים. קחו מים, כובע ונעליים נוחות, ובדקו שסוללת הטלפון מספיקה.\n• אם אתם משתמשים בהדרכה קולית, השאירו אוזן אחת פנויה כדי לשמוע את הסביבה.\n\n[תיבת סימון:] קראתי, ואני אחראי או אחראית לבטיחותי ולבטיחות מי שמלווה אותי.\n[כפתור:] מתחילים את הסיור\n";
const RAW_FEEDBACK="המשוב שלכם\n\nתודה שהשתמשתם ב־tripme בתקופת ההרצה. התשובות עוזרות לנו לשפר את הסיורים. אין חובה למלא את כל השדות.\n\n1. איך היה הסיור בסך הכול?\n   (דירוג מ־1 עד 5)\n\n2. מה הכי עבד לכם, או מה הכי אהבתם?\n\n3. מה לא עבד, או מה היה מבלבל?\n\n4. נתקלתם בתקלה או בשגיאה?\n   (כן / לא)\n   אם כן: מה קרה, ובאיזו תחנה או מסך?\n\n5. האם המידע בסיור היה מדויק ומעניין?\n   (כן / חלקית / לא)\n\n6. כשבעתיד ייגבה תשלום, האם הייתם שוקלים לשלם על סיור כזה?\n   (כן / אולי / לא)\n\n7. כמה הייתם מוכנים לשלם על סיור אחד?\n   (עד 10 ₪ / 10–20 ₪ / 20–30 ₪ / יותר מ־30 ₪ / לא הייתי משלם)\n\n8. עוד משהו שתרצו לספר לנו?\n   אם נוכל לחזור אליכם, אפשר להשאיר מייל (לא חובה): ________\n\nהערה בתחתית הטופס:\nהמשוב משמש רק לשיפור tripme. אם השארתם מייל, נשתמש בו רק כדי לחזור אליכם בנוגע למשוב הזה.\n";
const RAW_ACCESS="הצהרת נגישות של tripme\nעודכן לאחרונה: [תאריך]\n\ntripme, המופעלת על ידי גיל אלמליח (עוסק פטור מס' 069705846), רואה חשיבות במתן שירות שוויוני לכל המשתמשים, לרבות אנשים עם מוגבלות. אנחנו פועלים להנגשת האפליקציה לפי חוק שוויון זכויות לאנשים עם מוגבלות, התשנ\"ח-1998, לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013, ולפי התקן הישראלי ת״י 5568, המבוסס על הנחיות WCAG 2.0.\n\nרמת ההתאמה\nהאפליקציה הונגשה בהתאמה [מלאה / חלקית] לת״י 5568, ברמה [AA].\n[אין לציין רמה או התאמה מלאה לפני שנעשתה בדיקה.]\n\nהתאמות הנגישות שבוצעו\nיש להשאיר כאן רק מה שבוצע ונבדק בפועל, למשל:\n• [הדרכה קולית לצד הטקסט בכל תחנה]\n• [אפשרות להגדיל טקסט עד 200% בלי שבירת התצוגה]\n• [ניגודיות צבעים לפי התקן]\n• [שמות ותוויות נגישים לכפתורים, לקישורים ולשדות]\n• [תמיכה בקורא מסך וניווט במקלדת]\n• [תמיכה בעברית מימין לשמאל]\n\nאיך נבדקה הנגישות\nהאפליקציה נבדקה ביום [תאריך הבדיקה], ב[בדיקה ידנית / כלים אוטומטיים / שניהם], בדפדפנים [שמות] ובקורא מסך [שם]. [אם הבדיקה נעשתה על ידי גורם מוסמך, ציינו זאת.]\n\nמגבלות ידועות וחלופות\n[פרטו חלקים שעדיין אינם נגישים, ומתי צפוי תיקון. אם אין עדיין מידע, אל תכתבו שהכול נגיש.]\nדוגמאות אפשריות לבדיקה:\n• רכיב המפה הוא שירות חיצוני ועשוי להיות מוגבל לקורא מסך. תוכן הסיור זמין גם כטקסט וכהדרכה קולית.\n• חלק מהמסלולים בשטח כוללים מדרגות, מדרכות צרות או מכשולים, ואיננו יכולים להבטיח את נגישות המסלול עצמו. אם מסלול אינו מתאים לכם, אל תמשיכו בו.\n[אם ניתן פטור בשל קושי טכנולוגי, יש לפרסם כאן את הפטור ואת ההתאמה החלופית.]\n\nדיווח על בעיית נגישות ובקשת הנגשה\nנתקלתם ברכיב שאינו נגיש, או שאתם צריכים את המידע או את השירות בדרך נגישה אחרת? נשמח שתפנו אלינו. כדאי לציין את המסך או הסיור, את הבעיה, ואת הדפדפן או הטכנולוגיה המסייעת שבה השתמשתם.\n\nרכז/ת נגישות או איש הקשר לנושא: [שם]\nטלפון: [מספר טלפון]\nדוא״ל: [כתובת מייל, למשל tripme.walking@gmail.com]\nכתובת למשלוח דואר: האלוף דוד 13, ראשון לציון 7564042\n\nנשתדל להשיב בתוך [מספר] ימי עסקים.\n\nתאריך עדכון ההצהרה: [תאריך]\n";
const EN_BANNER='tripme beta: use is free for now. A fee will be charged in the future, and we will let you know ahead of time.';
const H2=new Set(['רמת ההתאמה','התאמות הנגישות שבוצעו','איך נבדקה הנגישות','מגבלות ידועות וחלופות','דיווח על בעיית נגישות ובקשת הנגשה']);
const DOC_TITLE={terms:'תנאי שימוש',privacy:'מדיניות פרטיות',access:'הצהרת נגישות',feedback:'המשוב שלכם'};

function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function el(id){return document.getElementById(id)}
function langNow(){
  try{
    if(typeof su!=='undefined'&&su&&su.lang) return su.lang;
    if(typeof st!=='undefined'&&st&&st.setup&&st.setup.lang) return st.setup.lang;
  }catch(e){}
  return 'he';
}
function inline(s){
  return String(s)
    .replace(/\[([^\]]+)\]/g,'<span class="ph">[$1]</span>')
    .replace(/https:\/\/www\.gov\.il\/he\/departments\/the_privacy_protection_authority/g,'<a href="https://www.gov.il/he/departments/the_privacy_protection_authority" target="_blank" rel="noopener noreferrer">https://www.gov.il/he/departments/the_privacy_protection_authority</a>')
    .replace(/tripme\.walking@gmail\.com/g,'<a href="mailto:tripme.walking@gmail.com">tripme.walking@gmail.com</a>');
}
function proseToHtml(raw){
  const lines=String(raw).replace(/\r/g,'').split('\n');
  let html='', list=false;
  const close=()=>{if(list){html+='</ul>';list=false}};
  lines.forEach((line,i)=>{
    if(!line.trim()){close();return}
    if(line.startsWith('• ')){
      if(!list){html+='<ul>';list=true}
      html+='<li>'+inline(line.slice(2))+'</li>';
      return;
    }
    close();
    if(i===0) html+='<h1>'+inline(line)+'</h1>';
    else if(/^\d+\.\s/.test(line)||H2.has(line.trim())) html+='<h2>'+inline(line)+'</h2>';
    else html+='<p>'+inline(line)+'</p>';
  });
  close();
  return html;
}
function splitSafety(raw){
  let ack='', btn='מתחילים את הסיור';
  const keep=[];
  String(raw).split('\n').forEach(line=>{
    if(line.startsWith('[תיבת סימון:]')) ack=line.slice('[תיבת סימון:]'.length).trim();
    else if(line.startsWith('[כפתור:]')) btn=line.slice('[כפתור:]'.length).trim();
    else keep.push(line);
  });
  return {html:proseToHtml(keep.join('\n')), ack, btn};
}
function fbModel(raw){
  const lines=String(raw).split('\n').map(s=>s.trim()).filter(Boolean);
  const opt=s=>s.replace(/^\(|\)$/g,'').split(' / ');
  const email=lines[16].replace(/\s*:?\s*_+\s*$/,'').trim();
  return {
    title:lines[0], intro:lines[1], note:lines[18],
    q1:lines[2], hint1:lines[3].replace(/^\(|\)$/g,''),
    q2:lines[4], q3:lines[5], q4:lines[6], bugOpts:opt(lines[7]), bugDetail:lines[8],
    q5:lines[9], accOpts:opt(lines[10]),
    q6:lines[11], payOpts:opt(lines[12]),
    q7:lines[13], priceOpts:opt(lines[14]),
    q8:lines[15], email
  };
}
const FB=fbModel(RAW_FEEDBACK);
const SAFETY=splitSafety(RAW_SAFETY);

function css(){
  const s=document.createElement('style');
  s.textContent=`
header h1{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
#betaBanner{background:#fef3c7;color:#7c2d12;border:1px solid #f59e0b;border-radius:12px;padding:10px 12px;padding-inline-end:44px;font-size:14px;font-weight:600;line-height:1.45;margin:0 0 12px;position:relative}
#betaBanner .tx{display:block}
#betaBanner .x{position:absolute;inset-inline-end:4px;top:4px;background:transparent;color:#7c2d12;min-width:40px;min-height:40px;padding:0;font-size:20px;line-height:1}
#betaBanner.under-header{position:fixed;top:60px;left:8px;right:8px;z-index:950;margin:0;box-shadow:0 2px 8px #0003}
.beta-foot{display:flex;flex-wrap:wrap;gap:4px 14px;justify-content:center;margin:8px 0 4px}
.beta-foot button{background:transparent;color:#9a3412;text-decoration:underline;font-weight:700;padding:8px 4px;min-height:44px;border:0}
.beta-mask{position:fixed;inset:0;background:#0007;display:none;align-items:flex-end;justify-content:center;z-index:2700}
.beta-mask.open{display:flex}
.beta-mask .panel{position:relative;background:#fff;color:#1c1917;width:min(560px,100%);max-height:min(92dvh,100%);border-radius:18px 18px 0 0;display:flex;flex-direction:column;box-shadow:0 -4px 20px #0005;overflow:hidden}
.beta-mask .body{overflow:auto;flex:1 1 auto;min-height:0;padding:16px 16px 8px;-webkit-overflow-scrolling:touch}
.beta-mask .actions{flex:none;display:flex;flex-direction:column;gap:8px;padding:8px 16px calc(12px + env(safe-area-inset-bottom));background:#fff}
.beta-mask .actions .pri,.beta-mask .actions button{width:100%;min-height:48px;font-size:17px}
.beta-mask h1{font-size:22px;color:#c2410c;margin:0 0 8px;line-height:1.35}
.beta-mask p,.beta-mask li{font-size:16px;line-height:1.55;margin:0 0 10px}
.beta-mask ul{margin:0 0 10px;padding-inline-start:1.2em}
.beta-mask .ack{background:#fff7ed;border-radius:12px;padding:10px 12px;font-weight:700}
#betaSafe{z-index:2850}
#betaPage{position:fixed;inset:0;z-index:2900;background:#fff7ed;display:none;flex-direction:column}
#betaPage.open{display:flex}
#betaPage .bar{background:#c2410c;color:#fff;display:flex;align-items:center;gap:8px;padding:8px 10px;min-height:52px;flex:none}
#betaPage .bar button{background:#fff;color:#c2410c;min-height:40px;white-space:nowrap}
#betaPage .bar span{font-weight:700;font-size:16px;line-height:1.3;min-width:0}
#betaPage .scroll{flex:1;overflow:auto;padding:14px 16px calc(24px + env(safe-area-inset-bottom));-webkit-overflow-scrolling:touch}
.legal h1{font-size:22px;color:#c2410c;margin:4px 0 10px;line-height:1.35;overflow-wrap:break-word}
.legal h2{font-size:17px;color:#7c2d12;margin:16px 0 6px;line-height:1.4;overflow-wrap:break-word}
.legal p,.legal li{font-size:16px;line-height:1.65;margin:0 0 10px;overflow-wrap:break-word}
.legal ul{margin:4px 0 12px;padding-inline-start:1.25em}
.legal a{color:#9a3412}
.legal .ph{background:#fffbeb;box-shadow:inset 0 -1px 0 #c2410c;border-radius:2px}
#betaPage input,#betaPage textarea{width:100%;font:inherit;font-size:16px;padding:10px;border:1px solid #ccc;border-radius:8px;background:#fff}
#betaPage textarea{min-height:96px}
#betaPage fieldset{border:0;padding:0;margin:0 0 12px;background:#fff;border-radius:12px;padding:12px;box-shadow:0 1px 4px #0001}
#betaPage legend{font-weight:700;padding:0;margin-bottom:6px;font-size:16px}
#betaPage .hint{font-size:13px;color:#666;font-weight:400;margin-bottom:8px}
.choices{display:flex;flex-wrap:wrap;gap:6px}
.choices label{flex:1 1 calc(50% - 6px);display:flex;align-items:center;justify-content:center;text-align:center;min-height:44px;border:1px solid #c2410c;border-radius:10px;padding:8px;font-weight:700;color:#c2410c;position:relative;line-height:1.3}
.choices input{position:absolute;opacity:0;inset:0;margin:0}
.choices label.on,.choices label:has(input:checked){background:#c2410c;color:#fff}
.stars{display:flex;gap:4px;justify-content:center}
.stars label{font-size:32px;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;filter:grayscale(1);opacity:.45;position:relative;cursor:pointer}
.stars input{position:absolute;opacity:0;inset:0}
.stars label.on{filter:none;opacity:1}
.fine{font-size:13px;color:#444;line-height:1.5}
.sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
button:focus-visible,.choices label:focus-within,.stars label:focus-within,a:focus-visible{outline:3px solid #1d4ed8;outline-offset:2px}
#betaPopTitle:focus,#betaSafeTitle:focus,#betaPage h1:focus{outline:none}
#betaPage .go{width:100%;min-height:48px;font-size:17px;margin-top:8px}
`;
  document.head.appendChild(s);
}

let safetyResolve=null;
let pageOpener=null;

function syncInert(){
  const pageOn=el('betaPage').classList.contains('open');
  const safeOn=el('betaSafe').classList.contains('open');
  const popOn=el('betaPop').classList.contains('open');
  const block=pageOn||safeOn||popOn;
  const header=document.querySelector('header');
  if(header) header.inert=block;
  ['home','setup','map','chip','status','betaBanner'].forEach(id=>{const n=el(id);if(n) n.inert=block});
  el('betaPop').inert=pageOn||safeOn;
  el('betaSafe').inert=pageOn;
  el('betaPage').inert=false;
}

function fillBanner(){
  const b=el('betaBanner'); if(!b) return;
  const en=langNow()==='en';
  b.lang=en?'en':'he';
  b.dir=en?'ltr':'rtl';
  b.querySelector('.tx').textContent=en?EN_BANNER:String(RAW_BANNER).trim();
}
function placeBanner(){
  const b=el('betaBanner');
  const status=el('status');
  if(!b){if(status) status.style.top='';return}
  const home=el('home'), setup=el('setup');
  const homeOn=home&&home.style.display!=='none';
  const setupOn=setup&&!setup.classList.contains('hidden');
  b.classList.remove('under-header');
  if(homeOn) home.insertBefore(b, home.firstChild);
  else if(setupOn) setup.insertBefore(b, setup.firstChild);
  else {b.classList.add('under-header');document.body.appendChild(b)}
  if(b.classList.contains('under-header')){
    const header=document.querySelector('header');
    const top=(header?Math.ceil(header.getBoundingClientRect().bottom):56)+6;
    b.style.top=top+'px';
    if(status) status.style.top=(top+b.offsetHeight+6)+'px';
  }else{
    b.style.top='';
    if(status) status.style.top='';
  }
}
function dismissBanner(){
  lsSet(KEY_BANNER,'1');
  const b=el('betaBanner'); if(b) b.remove();
  const status=el('status'); if(status) status.style.top='';
}
function dismissIntro(){
  lsSet(KEY_INTRO,'1');
  el('betaPop').classList.remove('open');
  syncInert();
}
function finishSafety(ok){
  el('betaSafe').classList.remove('open');
  const r=safetyResolve; safetyResolve=null;
  syncInert();
  if(r) r(!!ok);
}
function askSafety(){
  return new Promise(resolve=>{
    safetyResolve=resolve;
    const m=el('betaSafe');
    m.classList.add('open');
    syncInert();
    const h=m.querySelector('h1');
    if(h){h.tabIndex=-1;h.focus()}
  });
}

function closeBetaPage(){
  const page=el('betaPage');
  if(!page.classList.contains('open')) return;
  page.classList.remove('open');
  page.querySelector('.scroll').innerHTML='';
  syncInert();
  if(pageOpener&&pageOpener.focus){try{pageOpener.focus()}catch(e){}}
  pageOpener=null;
}
function choiceHtml(name, options){
  return '<div class="choices">'+options.map(o=>`<label><input type="radio" name="${name}" value="${o.replace(/"/g,'&quot;')}"><span>${o}</span></label>`).join('')+'</div>';
}
function feedbackHtml(){
  const stars=[1,2,3,4,5].map(n=>`<label class="star"><input type="radio" name="stars" value="${n}"><span aria-hidden="true">⭐</span><span class="sr">${n} מתוך 5</span></label>`).join('');
  return `<article class="legal"><h1>${FB.title}</h1><p>${FB.intro}</p>
<form id="betaFbForm" novalidate>
<fieldset><legend>${FB.q1}</legend><div class="hint">${FB.hint1}</div><div class="stars" role="radiogroup" aria-label="${FB.hint1}">${stars}</div></fieldset>
<fieldset><legend><label for="fbWorked">${FB.q2}</label></legend><textarea id="fbWorked" name="worked" maxlength="700"></textarea></fieldset>
<fieldset><legend><label for="fbBroken">${FB.q3}</label></legend><textarea id="fbBroken" name="broken" maxlength="700"></textarea></fieldset>
<fieldset><legend>${FB.q4}</legend>${choiceHtml('bug',FB.bugOpts)}
<div id="fbBugBox" hidden style="margin-top:8px"><label for="fbBugDetail">${FB.bugDetail}</label><textarea id="fbBugDetail" name="bugDetail" maxlength="700"></textarea></div></fieldset>
<fieldset><legend>${FB.q5}</legend>${choiceHtml('accurate',FB.accOpts)}</fieldset>
<fieldset><legend>${FB.q6}</legend>${choiceHtml('pay',FB.payOpts)}</fieldset>
<fieldset><legend>${FB.q7}</legend>${choiceHtml('price',FB.priceOpts)}</fieldset>
<fieldset><legend><label for="fbMore">${FB.q8}</label></legend><textarea id="fbMore" name="more" maxlength="700"></textarea>
<label for="fbEmail" style="display:block;margin-top:8px">${FB.email}</label>
<input id="fbEmail" name="email" type="email" inputmode="email" dir="ltr" autocomplete="email" maxlength="200" placeholder="name@example.com"></fieldset>
<p class="fine">${FB.note}</p>
<button class="pri go" type="submit">שליחת המשוב</button>
</form></article>`;
}
function docHtml(id){
  if(id==='terms') return '<article class="legal">'+proseToHtml(RAW_TERMS)+'</article>';
  if(id==='privacy') return '<article class="legal">'+proseToHtml(RAW_PRIVACY)+'</article>';
  if(id==='access') return '<article class="legal">'+proseToHtml(RAW_ACCESS)+'</article>';
  if(id==='feedback') return feedbackHtml();
  return '';
}
function openBetaDoc(id){
  if(!DOC_TITLE[id]) return;
  pageOpener=document.activeElement;
  if(typeof hideAll==='function') hideAll();
  const page=el('betaPage');
  page.querySelector('.bar span').textContent=DOC_TITLE[id];
  const scroll=page.querySelector('.scroll');
  scroll.innerHTML=docHtml(id);
  scroll.scrollTop=0;
  page.classList.add('open');
  syncInert();
  const h=scroll.querySelector('h1');
  if(h){h.tabIndex=-1;h.focus()}
  if(id==='feedback') wireFeedback(scroll);
}
function wireFeedback(root){
  const form=root.querySelector('#betaFbForm');
  const bugBox=root.querySelector('#fbBugBox');
  const paint=()=>{
    root.querySelectorAll('.choices label').forEach(l=>{l.classList.toggle('on',!!l.querySelector('input:checked'))});
    const picked=root.querySelector('input[name="stars"]:checked');
    const n=picked?+picked.value:0;
    root.querySelectorAll('.stars label').forEach(l=>{l.classList.toggle('on',+l.querySelector('input').value<=n)});
    const bug=root.querySelector('input[name="bug"]:checked');
    if(bugBox) bugBox.hidden=!(bug&&bug.value==='כן');
  };
  form.addEventListener('change',paint);
  form.addEventListener('submit',ev=>{ev.preventDefault();submitFeedback(form)});
}
function onTourNow(){
  const home=el('home'), setup=el('setup');
  return !!(home&&home.style.display==='none'&&setup&&setup.classList.contains('hidden'));
}
function clip(s,n){s=String(s||'').trim();return s.length>n?s.slice(0,n-1)+'…':s}
function feedbackBody(fd){
  const stars=fd.get('stars');
  const bug=fd.get('bug');
  let where='';
  try{
    if(onTourNow()&&typeof TOUR==='string'){
      const name=(typeof TOURS!=='undefined'&&TOURS[TOUR]&&(TOURS[TOUR].name||TOURS[TOUR].title))||TOUR;
      where='סיור: '+name;
      if(typeof st!=='undefined'&&st&&st.cur) where+=' · תחנה '+st.cur;
    }
  }catch(e){}
  const rows=[
    'משוב tripme – תקופת הרצה',
    where,
    'מייל לחזרה: '+(clip(fd.get('email'),200)||'—'),
    FB.q1+' '+(stars?stars+'/5':'—'),
    FB.q2+'\n'+(clip(fd.get('worked'),700)||'—'),
    FB.q3+'\n'+(clip(fd.get('broken'),700)||'—'),
    FB.q4+' '+(bug||'—'),
    bug==='כן'?('אם כן: '+(clip(fd.get('bugDetail'),700)||'—')):'',
    FB.q5+' '+(fd.get('accurate')||'—'),
    FB.q6+' '+(fd.get('pay')||'—'),
    FB.q7+' '+(fd.get('price')||'—'),
    FB.q8+'\n'+(clip(fd.get('more'),700)||'—')
  ].filter(Boolean);
  let body=rows.join('\n\n');
  if(body.length>4000) body=body.slice(0,3980)+'\n…';
  return body;
}
function hasAnswer(fd){
  if(fd.get('stars')||fd.get('bug')||fd.get('accurate')||fd.get('pay')||fd.get('price')) return true;
  return ['worked','broken','bugDetail','more','email'].some(n=>(fd.get(n)||'').trim());
}
async function submitFeedback(form){
  const fd=new FormData(form);
  const btn=form.querySelector('button[type="submit"]');
  if(!hasAnswer(fd)){if(typeof toast==='function') toast('אפשר למלא לפחות שדה אחד');return}
  const email=(fd.get('email')||'').trim();
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){if(typeof toast==='function') toast('המייל לא נראה תקין');el('fbEmail')&&el('fbEmail').focus();return}
  const body=feedbackBody(fd);
  const stars=parseInt(fd.get('stars'),10);
  let tour=null, station=null;
  try{
    if(onTourNow()&&typeof TOUR==='string'&&TOUR.length<=50) tour=TOUR;
    if(onTourNow()&&typeof st!=='undefined'&&st&&Number.isInteger(+st.cur)) station=+st.cur;
  }catch(e){}
  btn.disabled=true;
  try{
    const sbOk=typeof SB!=='undefined'&&SB;
    if(typeof send==='function'&&sbOk){
      const ok=await send('tour_feedback',{tour,station,stars:(stars>=1&&stars<=5)?stars:null,free_text:body,req_area:null});
      closeBetaPage();
      if(typeof toast==='function') toast(ok?'תודה! המשוב נשלח':'נשמר במכשיר – יישלח כשיהיה חיבור');
      return;
    }
    const q=new URLSearchParams({subject:'משוב tripme – תקופת הרצה',body:body.slice(0,1800)});
    window.location.href='mailto:tripme.walking@gmail.com?'+q.toString();
    closeBetaPage();
    if(typeof toast==='function') toast('נפתח מייל עם המשוב');
  }catch(e){
    btn.disabled=false;
    if(typeof toast==='function') toast('לא הצלחנו לשלוח. נסו שוב');
  }
}

function addHomeLinks(){
  const home=el('home'); if(!home||home.querySelector('.beta-foot')) return;
  const nav=document.createElement('nav');
  nav.className='beta-foot';
  nav.setAttribute('aria-label','מידע');
  nav.innerHTML=`<button type="button" onclick="openBetaDoc('terms')">תנאי שימוש</button><button type="button" onclick="openBetaDoc('privacy')">מדיניות פרטיות</button><button type="button" onclick="openBetaDoc('access')">הצהרת נגישות</button>`;
  const sub=home.querySelector('div[style*="color:#555"]');
  if(sub) sub.insertAdjacentElement('afterend', nav);
  else home.appendChild(nav);
}
function addMenuLinks(){
  const menu=el('menu'); if(!menu||menu.querySelector('.beta-links')) return;
  const box=document.createElement('div');
  box.className='fld beta-links';
  box.innerHTML=`<b>מידע</b>
    <div class="row"><button type="button" onclick="openBetaDoc('terms')">תנאי שימוש</button></div>
    <div class="row"><button type="button" onclick="openBetaDoc('privacy')">מדיניות פרטיות</button></div>
    <div class="row"><button type="button" onclick="openBetaDoc('access')">הצהרת נגישות</button></div>
    <div class="row"><button type="button" onclick="openFb()">💬 משוב</button></div>`;
  const h2=menu.querySelector('h2');
  if(h2) h2.insertAdjacentElement('afterend', box);
  else menu.appendChild(box);
}

function mount(){
  css();
  if(!lsGet(KEY_BANNER)){
    const b=document.createElement('div');
    b.id='betaBanner';
    b.setAttribute('role','region');
    b.setAttribute('aria-label','הודעת הרצה');
    b.innerHTML='<span class="tx"></span><button type="button" class="x" aria-label="סגירת הודעת ההרצה">✕</button>';
    document.body.appendChild(b);
    b.querySelector('.x').onclick=dismissBanner;
    fillBanner();
  }
  const popParas=String(RAW_POPUP).trim().split(/\n\n+/);
  const pop=document.createElement('div');
  pop.id='betaPop';
  pop.className='beta-mask';
  pop.setAttribute('role','dialog');
  pop.setAttribute('aria-modal','true');
  pop.setAttribute('aria-labelledby','betaPopTitle');
  pop.innerHTML=`<div class="panel"><div class="body">
      <p id="betaPopTitle"><b>${popParas[0]||''}</b></p>
      ${popParas.slice(1).map(p=>'<p>'+p+'</p>').join('')}
      <nav class="beta-foot" aria-label="מסמכים">
        <button type="button" onclick="openBetaDoc('terms')">תנאי שימוש</button>
        <button type="button" onclick="openBetaDoc('privacy')">מדיניות פרטיות</button>
        <button type="button" onclick="openBetaDoc('access')">הצהרת נגישות</button>
        <button type="button" onclick="openFb()">💬 משוב</button>
      </nav>
    </div><div class="actions"><button type="button" class="pri" id="betaPopOk">הבנתי</button></div></div>`;
  document.body.appendChild(pop);
  el('betaPopOk').onclick=dismissIntro;

  const safe=document.createElement('div');
  safe.id='betaSafe';
  safe.className='beta-mask';
  safe.setAttribute('role','dialog');
  safe.setAttribute('aria-modal','true');
  safe.innerHTML=`<div class="panel"><div class="body">
      <div class="xrow" style="display:flex"><button type="button" class="x" id="betaSafeX" aria-label="סגירה" style="margin-inline-start:auto;background:#eee;color:#333;min-width:40px;min-height:40px">✕</button></div>
      <div class="legal">${SAFETY.html}</div>
      <p class="ack">${SAFETY.ack}</p>
    </div><div class="actions">
      <button type="button" class="pri" id="betaSafeOk">${SAFETY.btn}</button>
      <button type="button" id="betaSafeNo">חזרה</button>
    </div></div>`;
  document.body.appendChild(safe);
  const safeH=safe.querySelector('h1');
  if(safeH) safeH.id='betaSafeTitle';
  safe.setAttribute('aria-labelledby','betaSafeTitle');
  el('betaSafeOk').onclick=()=>finishSafety(true);
  el('betaSafeNo').onclick=()=>finishSafety(false);
  el('betaSafeX').onclick=()=>finishSafety(false);

  const page=document.createElement('div');
  page.id='betaPage';
  page.innerHTML='<div class="bar"><button type="button" id="betaBack">→ חזרה</button><span></span></div><div class="scroll"></div>';
  document.body.appendChild(page);
  el('betaBack').onclick=closeBetaPage;

  addHomeLinks();
  if(typeof renderMenu==='function'){
    const prev=renderMenu;
    window.renderMenu=function(){prev.apply(this,arguments);addMenuLinks()};
  }
  if(typeof renderSetup==='function'){
    const prev=renderSetup;
    window.renderSetup=function(){const r=prev.apply(this,arguments);fillBanner();return r};
  }
  if(typeof showHome==='function'){
    const prev=showHome;
    window.showHome=function(){closeBetaPage();const r=prev.apply(this,arguments);placeBanner();return r};
  }
  if(typeof openTourSetup==='function'){
    const prev=openTourSetup;
    window.openTourSetup=function(){closeBetaPage();const r=prev.apply(this,arguments);placeBanner();return r};
  }
  if(typeof openNew==='function'){
    const prev=openNew;
    window.openNew=function(){closeBetaPage();const r=prev.apply(this,arguments);placeBanner();return r};
  }
  if(typeof startTour==='function'){
    const prev=startTour;
    let busy=false;
    window.startTour=async function(){
      if(busy) return;
      busy=true;
      try{
        const ok=await askSafety();
        if(!ok) return;
        return await prev.apply(this,arguments);
      }finally{busy=false;placeBanner()}
    };
    if(window.__tour) window.__tour.startTour=window.startTour;
  }
  window.openFb=function(){openBetaDoc('feedback')};
  window.openBetaDoc=openBetaDoc;
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape') return;
    if(el('betaPage').classList.contains('open')){e.preventDefault();closeBetaPage();return}
    if(el('betaSafe').classList.contains('open')){e.preventDefault();finishSafety(false);return}
    if(el('betaPop').classList.contains('open')){e.preventDefault();dismissIntro()}
  });
  window.addEventListener('popstate',()=>setTimeout(placeBanner,0));
  placeBanner();
  requestAnimationFrame(placeBanner);
  if(!lsGet(KEY_INTRO)){
    el('betaPop').classList.add('open');
    syncInert();
    const title=el('betaPopTitle');
    if(title){title.tabIndex=-1;title.focus()}
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
else mount();
})();
