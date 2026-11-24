/* UI language: original Thai text remains the data value; translations never change form values. */
let shopLanguage=read('carwise-language-v1','th')==='en'?'en':'th';
const tr=(th,en)=>shopLanguage==='en'?en:th;
const shopDictionary={
'คลังอะไหล่':'Parts catalog','รายการโปรด':'Saved parts','เปรียบเทียบ':'Compare','ตะกร้า':'Cart','ติดตามออเดอร์':'Orders','AI เลือกอะไหล่ ✦':'AI parts assistant','คู่มือ / บัญชี':'Help / Account','กลับ Carwise ↗':'Back to Carwise','เอฟเฟกต์: เปิด':'Effects: on','เอฟเฟกต์: ปิด':'Effects: off','ข้อมูลสาธิต · บันทึกในเบราว์เซอร์นี้ · ไม่มีการชำระเงินจริง':'Demo data · Stored in this browser · No real payment',
'อะไหล่รถแต่ง & อะไหล่รถบ้าน':'Performance & daily car parts','เริ่มเลือกอะไหล่ ↗':'Browse parts','เปิดรายการโปรด ♡':'View saved parts','เลือกคันโปรดของคุณ':'Choose your car','จับคู่ตามรุ่นตัวอย่าง · ให้อู่ยืนยันการติดตั้งจริง':'Demo model match · Mechanic must confirm fitment','รถในโปรเจกต์':'Your vehicle','ยังไม่เลือกรถ':'Choose a vehicle','แสดงของสำหรับคันนี้ →':'Show parts for this car','หาอะไหล่ให้ตรงสไตล์':'Find parts for your needs','ล้างตัวกรอง':'Clear filters','ลักษณะการใช้งาน':'Usage','ทั้งหมด':'All','อะไหล่รถแต่ง':'Performance parts','อะไหล่รถบ้าน':'Daily car parts','ยี่ห้อรถ':'Make','ทุกยี่ห้อ':'All makes','รุ่นรถ':'Model','ทุกรุ่น':'All models','หมวดอะไหล่':'Category','ทุกหมวด':'All categories','ค้นหาชื่อ / รหัส':'Search name / SKU','งบต่อชิ้น (บาท ไม่รวมค่านำเข้า)':'Budget per item (THB, import excluded)','เรียงรายการ':'Sort by','รายการแนะนำ':'Recommended','ราคาน้อย → มาก':'Price: low to high','ราคามาก → น้อย':'Price: high to low','เฉพาะสินค้าที่มีสต็อก':'In-stock only','เพิ่ม +':'Add +','หมดสต็อกจำลอง':'Out of demo stock','♡ บันทึก':'Save','♥ บันทึกแล้ว':'Saved','⇄ เปรียบเทียบ':'Compare','✓ เลือกเทียบแล้ว':'Selected','ช่วงล่าง':'Suspension','เบรก':'Brakes','ไอดี':'Air intake','ล้อและตัวถัง':'Wheels & body','จุดระเบิด':'Ignition','← กลับคลังอะไหล่':'Back to catalog','เพิ่มลงตะกร้า +':'Add to cart','เปิดตะกร้า →':'Open cart','สินค้าสมมติ · JP → TH':'Demo product · JP → TH','รหัสสินค้า':'SKU','รุ่นตัวอย่าง':'Demo vehicle model','คลังต้นทาง':'Origin warehouse','น้ำหนัก / กล่อง':'Weight / package','สต็อกจำลอง':'Demo stock','คลังตัวอย่าง ประเทศญี่ปุ่น':'Demo warehouse, Japan','ให้ AI ช่วยเปรียบเทียบ →':'Compare with AI',
'หน้าแรก':'Home','เริ่มคัดกรอง':'Start screening','ประวัติเคส':'Case history','พื้นที่ช่าง':'Mechanic workspace','หลักการทำงาน':'How it works','ตั้งค่า AI':'AI settings','ไม่ทราบ':'Unknown','ค่าใช้จ่ายต่ำสุด':'Lowest cost','ใช้เวลาน้อยสุด':'Shortest time','สมดุลทั้งสองด้าน':'Balanced','กลับ':'Back','ถัดไป':'Next','บันทึก':'Save','ล้าง':'Clear','ไม่มีการชำระเงินจริง':'No real payment'};
function localizeShop(){
 document.documentElement.lang=shopLanguage;
 const select=document.getElementById('site-language');
 if(select&&select.value!==shopLanguage)select.value=shopLanguage;
 if(shopLanguage!=='en')return;
 document.querySelectorAll('select option').forEach(o=>{if(!o.hasAttribute('value'))o.setAttribute('value',o.value)});
 const walker=document.createTreeWalker(document.getElementById('app'),NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){if(node.parentElement.closest('script,style,textarea,[data-no-translate]'))continue;const raw=node.nodeValue,out=shopTx(raw);if(out!==raw)node.nodeValue=out;}
 for(const ta of document.querySelectorAll('#app textarea')){const v=ta.value.trim();if(shopDictionary[v])ta.value=shopDictionary[v];}
 for(const el of document.querySelectorAll('#app [placeholder],#app [aria-label],#app [title]'))for(const attr of ['placeholder','aria-label','title']){const v=el.getAttribute(attr);if(v){const out=shopTx(v);if(out!==v)el.setAttribute(attr,out)}}
 const t=shopTx(document.title);if(t!==document.title)document.title=t;
}
document.addEventListener('change',e=>{if(e.target&&e.target.id==='site-language'){shopLanguage=e.target.value==='en'?'en':'th';try{localStorage.setItem('carwise-language-v1',JSON.stringify(shopLanguage))}catch{}render();localizeShop();}});
new MutationObserver(()=>localizeShop()).observe(document.getElementById('app'),{childList:true,subtree:true});
{const toast=document.getElementById('toast');if(toast)new MutationObserver(()=>{if(shopLanguage==='en'){const t=toast.textContent,out=shopTx(t);if(out!==t)toast.textContent=out}}).observe(toast,{childList:true});}

/* 24 Nov 2026: wider TunersGate English coverage.
   Exact strings first, then patterns, then known fragments inside mixed text. */
Object.assign(shopDictionary,{
'แนะนำตามความต้องการ':'Recommendations',
'ตั้งแต่รถไปทำงาน ถึงโปรเจกต์คันโปรด':'From the daily commute to your weekend project car',
'เลือกหมวด เปรียบเทียบงบ และให้ AI ช่วยอธิบาย':'Pick a category, compare budgets and let AI explain the options',
'ชื่อสินค้า':'Product name','เฉพาะที่มีสต็อกจำลอง':'Demo stock only',
'สินค้า สต็อก และราคาเป็นข้อมูลสาธิต · ภาพถ่ายอ้างอิงประเภทอะไหล่ · เรทตัวอย่าง ¥1 = ฿0.25 ไม่ใช่อัตราสด':'Products, stock and prices are demo data · Photos show the part type only · Sample rate ¥1 = ฿0.25, not a live rate',
'ภาพอ้างอิงประเภทอะไหล่':'Reference photo of the part type','เปิดตารางเทียบ →':'Open comparison →',
'TunersGate หน้าหลัก':'TunersGate home','เมนูอะไหล่รถแต่งและรถบ้าน':'Parts menu','ภาพประกอบรถยนต์':'Car illustration',
'เช่น TG-086 หรือ เบรก':'e.g. TG-086 or brakes','ไม่จำกัดงบ':'No budget limit','ภาพ:':'Photo:',
'· แสดงเต็มภาพ ไม่ดัดแปลง · ไม่ใช่ภาพสินค้าจริงของร้าน':'· shown unedited · not a photo of the actual product',
'ชิ้นที่ใช่ เก็บไว้ก่อน':'Save the right parts for later','รายการโปรดบันทึกในเบราว์เซอร์นี้ เปิดกลับมาเลือกต่อได้':'Saved parts stay in this browser so you can come back to them',
'เทียบให้ชัด ก่อนตัดสินใจ':'Compare clearly before you decide','ราคาเทียบต่อ 1 ชิ้น รวมค่าขนส่งและยอดภาษีที่ตั้งไว้แยกแต่ละชิ้น':'Prices are per item, including shipping and the configured tax for each item',
'นำออก ×':'Remove ×','รถตัวอย่าง':'Demo vehicle','หมวด':'Category','ค่าสินค้า':'Item price','น้ำหนักจริง':'Actual weight',
'รวมทางอากาศ / 1 ชิ้น':'Total by air / item','รวมทางเรือ / 1 ชิ้น':'Total by sea / item','เลือกชิ้นนี้':'Choose this part','ตารางเทียบอะไหล่ เลื่อนแนวนอนได้':'Parts comparison table, scrolls horizontally',
'ค้นหาเส้นทางที่เหมาะกับเป้าหมาย':'Find the route that fits your goal',
'A* Search · ผู้ใช้เลือกอะไหล่ → ระบบค้นหาเส้นทาง → ส่งถึงอู่ให้ช่างตรวจความเข้ากันได้':'A* Search · You pick a part → the system searches routes → delivered to the garage for a fitment check',
'เลือกแหล่งซื้อและขนส่งอย่างไร?':'Which seller and shipping should you choose?','ราคาถูกอาจรอนาน ต้องเทียบเส้นทางครบ ไม่ดูแค่ราคาสินค้า':'Cheap can mean slow — compare full routes, not just the item price',
'ยังไม่เลือกเส้นทาง':'No route selected yet','ได้แผนส่งถึงอู่ภายในงบ':'Found a delivery plan within budget','ผ่านผู้ขาย → ขนส่งระหว่างประเทศ → ส่งถึงอู่ และได้คะแนนต่ำสุด':'Seller → international shipping → garage delivery, with the lowest score',
'อะไหล่สำหรับค้นหา':'Part to search','เป้าหมายค้นหา':'Search goal','สมดุล 50/50':'Balanced 50/50','งบรวมสูงสุด (บาท)':'Maximum total budget (THB)','ค้นหาด้วย A* →':'Search with A* →',
'Heuristic Function และวิธีค้นหา':'Heuristic function and search method','f(n) = g(n) + h(n) เลือกค่าน้อยสุดจาก OPEN':'f(n) = g(n) + h(n), expand the lowest value from OPEN',
'State = (ขั้นตอน, เส้นทางที่เลือก, ค่าใช้จ่ายสะสม, วันสะสม) · แต่ละเส้นทางเป็นคนละ state เพื่อไม่ตัดแผนที่ยังอยู่ในงบทิ้งผิดพลาด':'State = (stage, chosen route, accumulated cost, accumulated days) · each route is its own state so in-budget plans are never pruned by mistake',
'ค่าใช้จ่ายต่ำสุดใช้ (wC,wT) = (1,0) · เวลาน้อยสุด (0,1) · สมดุล (0.5,0.5) · 5000 บาทและ 30 วันเป็นสเกลคงที่ของแบบจำลอง ไม่ใช่ค่า min-max ของตัวเลือก':'Lowest cost uses (wC,wT) = (1,0) · shortest time (0,1) · balanced (0.5,0.5) · 5,000 THB and 30 days are fixed model scales, not min-max of the options',
'h รวมค่าต่ำสุดของแต่ละขั้นตอนที่ยังเหลือ แยกฝั่งราคาและวัน จึงอาจมาจากคนละตัวเลือกและไม่เกินต้นทุนจริงที่ต้องจ่ายต่อ เมื่อถึงเป้าหมาย h = 0 หาก cost สะสม + ราคาต่ำสุดที่ยังเหลือเกินงบจะตัดเส้นทางนั้น':'h sums the cheapest remaining option per stage, separately for cost and days, so it never exceeds the real remaining cost. At the goal h = 0. A route is pruned if accumulated cost + cheapest remaining cost exceeds the budget',
'ต้นไม้มีความลึก 3 ไม่มีวงวน ค่า edge ไม่ติดลบ ใช้ A* tree search และหยุดเมื่อดึง goal จาก OPEN จึงได้คะแนนดีที่สุดใน 12 เส้นทางสมมติ หากคะแนนเท่ากันใช้ลำดับสร้างก่อน ไม่รับรองผลนอกชุดข้อมูลนี้':'The tree has depth 3, no cycles and non-negative edges. A* tree search stops when a goal is popped from OPEN, so it returns the best score among the 12 simulated routes. Ties go to the earlier-created node. No guarantee outside this dataset',
'อ้างอิงหลักการ':'Reference',
'ชุดสถานการณ์ Search Lab แยกจากตะกร้า: ผู้ขายสมมติ 3 ราย × ขนส่ง 2 แบบ × ส่งถึงอู่ 2 แบบ = 12 เส้นทาง · จำนวน 1 ชิ้น · เรทคงที่ ¥1 = ฿0.25 · ภาษีสมมติ ฿800':'Search Lab scenario, separate from the cart: 3 simulated sellers × 2 shipping modes × 2 garage deliveries = 12 routes · quantity 1 · fixed rate ¥1 = ฿0.25 · simulated tax ฿800',
'อะไหล่คนละหมวดหรือคนละรุ่นใช้แทนกันไม่ได้ ตารางนี้ช่วยเทียบข้อมูลและงบ ไม่ยืนยันความเข้ากันได้ · เรท ¥1 = ฿0.25 / ภาษีสมมติ ฿800':'Parts from different categories or models are not interchangeable. This table compares data and budget only, not fitment · rate ¥1 = ฿0.25 / simulated tax ฿800',
'เลือกให้เข้าใจ ก่อนตัดสินใจซื้อ':'Understand your options before you buy',
'AI ช่วยอธิบายสินค้า เปรียบเทียบงบ และเตรียมคำถามถามผู้ขาย โดยใช้แคตตาล็อกตัวอย่างของเว็บนี้':'AI explains products, compares budgets and prepares questions for the seller, using this site\'s demo catalog',
'1. เลือกอะไหล่ 1–3 รายการ':'1. Choose 1–3 parts','2. เป้าหมาย':'2. Goal','สมดุลราคาและเวลา':'Balanced cost & time','ประหยัดค่าใช้จ่าย':'Save money','ได้รับเร็วขึ้น':'Get it sooner',
'3. อยากให้ช่วยเรื่องอะไร':'3. What do you need help with?','ช่วยเปรียบเทียบสินค้าที่เลือกตามเป้าหมาย และบอกสิ่งที่ควรถามผู้ขายก่อนซื้อ':'Compare the selected parts for my goal and tell me what to ask the seller before buying',
'ส่งเฉพาะรายการที่เลือก เป้าหมายและคำถามผ่านหลังบ้านไป Google Gemini · Free Tier อาจใช้ข้อมูลปรับปรุงผลิตภัณฑ์ ไม่ใส่ข้อมูลส่วนตัว':'Only the selected parts, goal and question are sent through the backend to Google Gemini · the Free Tier may use data to improve its products — do not include personal information',
'ยินยอมส่งข้อมูลข้างต้นให้ Google Gemini':'I agree to send the information above to Google Gemini','ให้ AI ช่วยเปรียบเทียบ ✦':'Compare with AI ✦',
'ผู้ช่วยเลือก ไม่ใช่ช่างติดตั้ง':'A shopping assistant, not an installer','AI ไม่ยืนยันว่าอะไหล่ใส่ได้จริง ไม่รับรองแรงม้าหรือความปลอดภัย และไม่สั่งซื้อแทนคุณ':'AI does not confirm fitment, does not guarantee power or safety, and never orders for you',
'ราคา สต็อกและเวลาขนส่งเป็นข้อมูลสมมติ ค่าเงินตัวอย่าง ¥1 = ฿0.25':'Prices, stock and shipping times are simulated. Sample rate ¥1 = ฿0.25','ตั้งค่าการเชื่อมต่อ AI':'AI connection settings','ยังไม่ได้เรียก AI':'AI has not been called yet',
'ค้นหาได้ทันที ไม่ต้องสมัครสมาชิก':'Browse right away, no sign-up needed','คู่มือใช้งานต้นแบบ และสิ่งที่ต้องมีเมื่อเปิดเป็นร้านค้าจริง':'Prototype guide, and what a real store would still need',
'เลือกอะไหล่ใน 4 ขั้นตอน':'Choose parts in 4 steps','เลือกหมวดรถแต่งหรือรถบ้าน แล้วกรองยี่ห้อและรุ่น':'Pick performance or daily, then filter by make and model','บันทึกรายการโปรดหรือเลือกเทียบไม่เกิน 3 ชิ้น':'Save favourites or compare up to 3 parts',
'ใช้ AI ช่วยอธิบาย หรือ Search Lab หาแผนตาม Goal':'Use AI to explain, or Search Lab to plan by goal','ลองตะกร้าและออเดอร์จำลอง ไม่มีการชำระเงินจริง':'Try the demo cart and orders — no real payment',
'ตอนนี้ต้อง Login ไหม?':'Do I need to log in?',
'ไม่ต้องสำหรับการดูสินค้าและทดลองใช้ ข้อมูลโปรด รถ และออเดอร์เก็บเฉพาะเบราว์เซอร์นี้ ยังไม่มีบัญชีผู้ใช้หรือการซิงก์ข้ามเครื่อง รหัสเข้าใช้ AI เป็นรหัสบริการแยกจากบัญชีสมาชิก':'Not for browsing or trying the demo. Saved parts, vehicle and orders stay in this browser only; there are no user accounts or cross-device sync yet. The AI access code is a service code, separate from any account',
'ก่อนเปิดเป็นร้านค้าจริง':'Before opening a real store','ระบบสมาชิกและกู้คืนบัญชี พร้อมฐานข้อมูลและสิทธิ์ผู้ใช้/ผู้ดูแล':'Accounts and recovery, with a database and user/admin permissions',
'ข้อมูลอะไหล่และความเข้ากันได้ที่ผู้ขายตรวจยืนยัน':'Seller-verified parts and fitment data','ราคา สต็อก การชำระเงินและสถานะจัดส่งจริง':'Real prices, stock, payment and shipping status',
'ช่องทางติดต่อ นโยบายคืนสินค้าและข้อมูลส่วนบุคคล':'Contact channels, returns and privacy policies','ระบบจำกัด AI ต่อผู้ใช้และตรวจการใช้โควตา':'Per-user AI limits and quota monitoring',
'รายการเหล่านี้ยังไม่ใช่บริการที่เปิดใช้งานในต้นแบบ':'None of these are live in the prototype','เครดิตภาพถ่าย':'Photo credits',
'ภาพจริงใช้ประกอบประเภทอะไหล่ ไม่ใช่ภาพสินค้าของร้านหรือหลักฐานว่าเข้ากับรุ่นรถ ภาพแสดงเต็มโดยไม่ดัดแปลง สินค้าบางชนิดใช้ภาพวาดเดิม':'Real photos illustrate the part type only; they are not store product photos or proof of fitment. Photos are shown unedited; some items use the original illustration',
'รวมประมาณการ':'Estimated total','เวลารวมสมมติ':'Simulated total time','คะแนนเป้าหมาย ↓':'Goal score ↓','ขยาย / สร้างโหนด':'Expanded / generated nodes',
'นี่คือแผนคำนวณสาธิต ไม่มีการสั่งซื้อจริง และไม่ได้ยืนยันว่าสินค้าติดตั้งกับรถได้':'This is a demo calculation — no real order, and fitment is not confirmed',
'ดาวน์โหลดผล Search .json':'Download search result .json','ดูการค้นหาทีละขั้น':'Step through the search','← ก่อนหน้า':'← Previous','ขั้นถัดไป →':'Next step →','ดูครบทุกขั้น':'Show all steps',
'ลำดับโหนดที่ A* ดึงออกจาก OPEN':'Order in which A* pops nodes from OPEN','ขั้น':'Step','เส้นทาง':'Route','การทำงาน':'Action',
'ผลลัพธ์ครบ 12 เส้นทาง สำหรับเงื่อนไขนี้':'All 12 routes for these conditions',
'ตารางนี้ไล่ครบทุกเส้นทางเพื่อใช้ตรวจคำตอบ แยกจากขั้นตอน A* ด้านบน แถวเกินงบไม่มีสิทธิ์เป็นคำตอบ':'This table enumerates every route to check the answer, separately from the A* steps above. Over-budget rows cannot be the answer',
'บาท':'THB','วัน':'Days','คะแนน ↓':'Score ↓','เงื่อนไขงบ':'Budget','อยู่ในงบ':'Within budget','เกินงบ':'Over budget',
'รถแต่ง':'Performance','รถบ้าน':'Daily',
'กรุณากดคำนวณประมาณการใหม่ก่อนสร้างคำสั่งซื้อ':'Please recalculate the estimate before creating the order','คำนวณใหม่ตามวิธีขนส่งที่เลือกแล้ว':'Recalculated for the selected shipping method',
'ถึงจำนวนสต็อกจำลองแล้ว':'Demo stock limit reached','บันทึกการตั้งค่าในเครื่องไม่ได้':'Could not save settings on this device','บันทึกในเครื่องไม่ได้ กรุณาส่งออกข้อมูลเก็บไว้':'Could not save on this device — please export a backup',
'อัปเดตประมาณการแล้ว':'Estimate updated','เปรียบเทียบได้สูงสุด 3 ชิ้น นำชิ้นเดิมออกก่อน':'You can compare up to 3 parts — remove one first',
'สร้างคำสั่งซื้อจำลองแล้ว ไม่มีการเรียกเก็บเงิน':'Demo order created — no charge made','สร้างในหน่วยความจำแล้ว แต่บันทึกถาวรไม่ได้ กรุณาส่งออกสรุป':'Created in memory but could not be saved permanently — please export the summary',
'บันทึกในรายการโปรดแล้ว':'Saved to favourites','นำออกจากรายการโปรดแล้ว':'Removed from favourites','ประมาณการนำเข้า':'Import estimate','ทางอากาศ':'Air','ทางเรือ':'Sea'
});
const shopFragments=[['ส่งถึงอู่แบบด่วน','express garage delivery'],['ส่งถึงอู่แบบปกติ','standard garage delivery'],['ทางอากาศ','air'],['ทางเรือ','sea'],['เฉพาะสินค้า','item only'],['พร้อมจำลอง','demo stock'],['รถแต่ง','performance'],['รถบ้าน','daily'],['ช่วงล่าง','Suspension'],['เบรก','Brakes'],['ไอดี','Air intake'],['ล้อและตัวถัง','Wheels & body'],['จุดระเบิด','Ignition'],['ไม่มีสต็อก','out of stock'],['รายการ','items'],['ชิ้น','pcs'],['กก.','kg'],['วัน','days'],['นิ้ว','-inch'],['วง','wheel']];
const shopPatterns=[
 [/^ดู (.+)$/,m=>'View '+shopTx(m[1])],[/^บันทึก (.+)$/,m=>'Save '+shopTx(m[1])],[/^เปรียบเทียบ (.+)$/,m=>'Compare '+shopTx(m[1])],
 [/^เพิ่ม (.+) ลงตะกร้า$/,m=>'Add '+shopTx(m[1])+' to cart'],[/^นำ (.+) ออกจากตาราง$/,m=>'Remove '+shopTx(m[1])+' from table'],
 [/^เพิ่ม (.+) แล้ว$/,m=>'Added '+shopTx(m[1])],[/^แผนที่ค้นพบ: (.+)$/,m=>'Plan found: '+shopTx(m[1])],[/^ขั้น (\d+) \/ (\d+)$/,m=>`Step ${m[1]} / ${m[2]}`],
 [/^ขยายโหนด สร้างลูก (\d+) โหนด$/,m=>`Expanded node, generated ${m[1]} children`],[/^ถึงเป้าหมาย(.*)$/,m=>'Goal reached'+m[1]],
 [/^อะไหล่ (\d+) ชิ้น งบและเป้าหมายที่เลือก(.*)$/,m=>`${m[1]} part, chosen budget and goal${m[2]}`],
 [/^OPEN หลังดำเนินการ = (\d+)$/,m=>'OPEN after step = '+m[1]],[/(.*)OPEN หลังดำเนินการ = (\d+)$/,m=>m[1]+'OPEN after step = '+m[2]],
 [/^เปรียบเทียบอะไหล่ (\d+) ชิ้น · ราคาและเวลาสมมติ$/,m=>`Comparing ${m[1]} parts · simulated prices and times`],[/^(.+) \(ไม่มีสต็อก\)$/,m=>shopTx(m[1])+' (out of stock)'],[/^(.+) · (.+)$/,m=>m[0].split(' · ').map(shopTx).join(' · ')]
];
function shopTx(text){
 const key=String(text).trim();if(!/[฀-๿]/.test(key))return text;
 if(shopDictionary[key])return String(text).replace(key,shopDictionary[key]);
 for(const [re,fn] of shopPatterns){const m=key.match(re);if(m){const out=fn(m);if(out!==key)return String(text).replace(key,out)}}
 if(!document.body.classList.contains('tg-theme'))return text;
 let out=key;for(const [th,en] of shopFragments)out=out.split(th).join(en);
 return String(text).replace(key,out);
}
