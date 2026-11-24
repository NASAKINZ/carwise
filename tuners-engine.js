(function(root){
  'use strict';
  // All products, stock, fitment, prices and delivery times are illustrative.
  const products=[
    {id:'TG-086-S01',name:'ชุดคอยล์โอเวอร์ Street Comfort',brand:'Toyota',model:'GT86 / ZN6',category:'ช่วงล่าง',yen:48000,stock:4,kg:12,cm:[65,40,25],kind:'coil',tag:'STREET SERIES',detail:'ชุดช่วงล่างตัวอย่างสำหรับสำรวจการเลือกอะไหล่ตามรุ่นรถ ปรับรายละเอียดการติดตั้งกับช่างก่อนสั่งซื้อจริง'},
    {id:'TG-FD-B02',name:'ชุดจานเบรก Sport Disc',brand:'Honda',model:'Civic / FD',category:'เบรก',yen:26000,stock:5,kg:9,cm:[38,38,18],kind:'disc',tag:'BRAKE SYSTEM',detail:'ชุดจานเบรกตัวอย่าง ตรวจขนาดจาน จุดยึด และชุดเบรกเดิมกับอู่เพื่อยืนยันความเข้ากันได้'},
    {id:'TG-S15-I03',name:'ชุดกรองอากาศ Intake Kit',brand:'Nissan',model:'Silvia / S15',category:'ไอดี',yen:18500,stock:3,kg:3,cm:[45,30,25],kind:'filter',tag:'AIR & INTAKE',detail:'ชุดไอดีตัวอย่าง แสดงข้อมูลไทยและรหัสสินค้าเพื่อใช้สอบถามผู้ขาย ไม่ยืนยันสมรรถนะหรือการติดตั้ง'},
    {id:'TG-ND-W04',name:'ล้ออัลลอย Touring 17 นิ้ว / 1 วง',brand:'Mazda',model:'MX-5 / ND',category:'ล้อและตัวถัง',yen:32000,stock:4,kg:8,cm:[50,50,28],kind:'wheel',tag:'LIGHTWEIGHT LOOK',detail:'ล้อหนึ่งวงสำหรับสาธิตการคำนวณจำนวนและขนาดพัสดุ ต้องตรวจ PCD, offset และระยะเคลียร์กับช่าง'},
    {id:'TG-086-B05',name:'ผ้าเบรก Everyday Sport',brand:'Toyota',model:'GT86 / ZN6',category:'เบรก',yen:12500,stock:5,kg:2,cm:[25,18,12],kind:'disc',tag:'DAILY ESSENTIAL',detail:'ผ้าเบรกตัวอย่าง เลือกตามข้อมูลรถและตรวจรหัสคาลิเปอร์ก่อนซื้อจริง'},
    {id:'TG-FD-I06',name:'แผงกรองอากาศ Replacement',brand:'Honda',model:'Civic / FD',category:'ไอดี',yen:6500,stock:5,kg:1,cm:[35,25,10],kind:'filter',tag:'EASY TO EXPLORE',detail:'แผงกรองตัวอย่างสำหรับแสดงการเทียบรหัสสินค้าและประมาณการนำเข้า'},
    {id:'TG-S15-S07',name:'ชุดค้ำตัวถัง Front Brace',brand:'Nissan',model:'Silvia / S15',category:'ช่วงล่าง',yen:15000,stock:2,kg:3,cm:[110,18,14],kind:'brace',tag:'CHASSIS SERIES',detail:'ค้ำตัวถังตัวอย่าง ต้องให้ช่างตรวจตำแหน่งยึดและพื้นที่ในห้องเครื่องก่อนสั่งซื้อ'},
    {id:'TG-ND-W08',name:'ชุดแต่งตัวถัง Side Detail',brand:'Mazda',model:'MX-5 / ND',category:'ล้อและตัวถัง',yen:22000,stock:0,kg:4,cm:[120,30,20],kind:'brace',tag:'BODY COLLECTION',detail:'สินค้าตัวอย่างที่หมดสต็อก ใช้สาธิตการป้องกันเพิ่มสินค้าที่ไม่พร้อมจำหน่าย'}
,
{"id": "TG-DAILY-09", "name": "ผ้าเบรกหน้า Daily Stop", "brand": "Toyota", "model": "Yaris / XP150", "category": "เบรก", "yen": 3200, "stock": 6, "kg": 2, "cm": [40, 30, 20], "kind": "disc", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-10", "name": "กรองอากาศ Daily Air", "brand": "Toyota", "model": "Yaris / XP150", "category": "ไอดี", "yen": 1200, "stock": 6, "kg": 1, "cm": [40, 30, 20], "kind": "filter", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-11", "name": "หัวเทียน Maintenance Set", "brand": "Honda", "model": "City / GM6", "category": "จุดระเบิด", "yen": 2400, "stock": 6, "kg": 0.5, "cm": [40, 30, 20], "kind": "plug", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-12", "name": "โช้คอัพ Comfort", "brand": "Honda", "model": "City / GM6", "category": "ช่วงล่าง", "yen": 7200, "stock": 6, "kg": 4, "cm": [40, 30, 20], "kind": "coil", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-13", "name": "กรองอากาศ Eco Care", "brand": "Nissan", "model": "Almera / N17", "category": "ไอดี", "yen": 1000, "stock": 6, "kg": 1, "cm": [40, 30, 20], "kind": "filter", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-14", "name": "จานเบรก Daily Disc", "brand": "Nissan", "model": "Almera / N17", "category": "เบรก", "yen": 4400, "stock": 6, "kg": 7, "cm": [40, 30, 20], "kind": "disc", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-15", "name": "หัวเทียน Daily Ignition", "brand": "Mazda", "model": "Mazda2 / DJ", "category": "จุดระเบิด", "yen": 2800, "stock": 6, "kg": 0.5, "cm": [40, 30, 20], "kind": "plug", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"},
{"id": "TG-DAILY-16", "name": "ล้ออัลลอย Everyday 15 นิ้ว / 1 วง", "brand": "Mazda", "model": "Mazda2 / DJ", "category": "ล้อและตัวถัง", "yen": 8000, "stock": 6, "kg": 6, "cm": [40, 30, 20], "kind": "wheel", "tag": "DAILY / รถบ้าน", "segment": "daily", "detail": "สินค้าสมมติสำหรับรถใช้งานทั่วไป ต้องตรวจปีรถ รหัสเครื่องยนต์ ขนาดและรหัสอะไหล่กับช่างก่อนซื้อ ไม่รับรองว่าใส่ได้จริง"}
,
{"id": "TG-NEW-17", "name": "ชุดจานเบรก Daily Plus", "brand": "Toyota", "model": "Yaris / XP150", "category": "เบรก", "yen": 4800, "stock": 5, "kg": 7, "cm": [40, 30, 20], "kind": "disc", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-18", "name": "โช้คอัพ Everyday Comfort", "brand": "Toyota", "model": "Yaris / XP150", "category": "ช่วงล่าง", "yen": 6400, "stock": 5, "kg": 4, "cm": [40, 30, 20], "kind": "coil", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-19", "name": "กรองอากาศ Service Fit", "brand": "Honda", "model": "City / GM6", "category": "ไอดี", "yen": 1400, "stock": 5, "kg": 1, "cm": [40, 30, 20], "kind": "filter", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-20", "name": "ผ้าเบรก City Care", "brand": "Honda", "model": "City / GM6", "category": "เบรก", "yen": 2800, "stock": 5, "kg": 2, "cm": [40, 30, 20], "kind": "disc", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-21", "name": "โช้คอัพ Road Comfort", "brand": "Nissan", "model": "Almera / N17", "category": "ช่วงล่าง", "yen": 6000, "stock": 5, "kg": 4, "cm": [40, 30, 20], "kind": "coil", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-22", "name": "กรองอากาศ Everyday Flow", "brand": "Mazda", "model": "Mazda2 / DJ", "category": "ไอดี", "yen": 1600, "stock": 5, "kg": 1, "cm": [40, 30, 20], "kind": "filter", "segment": "daily", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-23", "name": "ผ้าเบรก Street Response", "brand": "Toyota", "model": "GT86 / ZN6", "category": "เบรก", "yen": 15000, "stock": 5, "kg": 2, "cm": [40, 30, 20], "kind": "disc", "segment": "sport", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"},
{"id": "TG-NEW-24", "name": "โช้คอัพ Street Balance", "brand": "Honda", "model": "Civic / FD", "category": "ช่วงล่าง", "yen": 22000, "stock": 5, "kg": 8, "cm": [40, 30, 20], "kind": "coil", "segment": "sport", "tag": "EXPANDED DEMO", "detail": "ข้อมูลอะไหล่จำลอง ต้องยืนยันปีรถ รหัสเครื่องยนต์ และหมายเลข OEM กับผู้ขายก่อนสั่งซื้อจริง"}
  ].map(p=>Object.freeze({...p,segment:p.segment||(['TG-086-B05','TG-FD-I06'].includes(p.id)?'daily':'sport')}));
  const defaults=Object.freeze({fx:0.25,mode:'air',tax:800});
  const modes=Object.freeze({air:{label:'ทางอากาศ',base:450,perKg:180,days:'7–12 วัน'},sea:{label:'ทางเรือ',base:300,perKg:75,days:'25–40 วัน'}});
  const stages=['รับคำสั่งซื้อจำลอง','ซัพพลายเออร์รับออเดอร์','ขนส่งต่างประเทศ','ผ่านศุลกากร','จัดส่งถึงผู้รับ / อู่'];
  const get=id=>products.find(p=>p.id===id);
  function cleanCart(value){
    if(!Array.isArray(value))return [];
    const cart=[];
    for(const row of value){const p=get(row?.id);if(!p||!Number.isInteger(row.qty)||row.qty<1||p.stock<1)continue;const old=cart.find(x=>x.id===p.id);if(old)old.qty=Math.min(p.stock,old.qty+row.qty);else cart.push({id:p.id,qty:Math.min(p.stock,row.qty)});}
    return cart;
  }
  function config(value){
    return {fx:Number.isFinite(value?.fx)&&value.fx>=0.001&&value.fx<=100?value.fx:defaults.fx,mode:Object.hasOwn(modes,value?.mode)?value.mode:defaults.mode,tax:Number.isFinite(value?.tax)&&value.tax>=0&&value.tax<=1000000?value.tax:defaults.tax};
  }
  function filter({segment='',brand='',model='',category='',search='',inStock=false,budget='',sort='featured',fx=defaults.fx}={}){
    const query=String(search).trim().toLowerCase();
    const rate=config({fx}).fx;
    const rows=products.filter(p=>(!segment||p.segment===segment)&&(!brand||p.brand===brand)&&(!model||p.model===model)&&(!category||p.category===category)&&(!inStock||p.stock>0)&&(budget===''||!Number.isFinite(Number(budget))||p.yen*rate<=Number(budget))&&(!query||[p.id,p.name,p.brand,p.model,p.category].join(' ').toLowerCase().includes(query)));
    if(sort==='price-asc')rows.sort((a,b)=>a.yen-b.yen);
    if(sort==='price-desc')rows.sort((a,b)=>b.yen-a.yen);
    if(sort==='name')rows.sort((a,b)=>a.name.localeCompare(b.name,'th'));
    return rows;
  }
  const round=n=>Math.round((n+Number.EPSILON)*100)/100;
  function quote(value,settings){
    const cart=cleanCart(value),c=config(settings),m=modes[c.mode];
    const lines=cart.map(row=>{const p=get(row.id),volume=p.cm.reduce((a,b)=>a*b,1)/5000,billable=Math.max(p.kg,volume);return {id:p.id,name:p.name,brand:p.brand,model:p.model,qty:row.qty,yen:p.yen,baht:round(p.yen*c.fx),total:round(p.yen*c.fx*row.qty),kg:p.kg*row.qty,chargeKg:billable*row.qty};});
    const goods=round(lines.reduce((n,x)=>n+x.total,0)),kg=round(lines.reduce((n,x)=>n+x.kg,0)),chargeKg=round(lines.reduce((n,x)=>n+x.chargeKg,0));
    const shipping=lines.length?round(m.base+Math.ceil(chargeKg)*m.perKg):0,tax=lines.length?c.tax:0;
    return {lines,goods,kg,chargeKg,shipping,tax,total:round(goods+shipping+tax),settings:c,days:m.days,count:cart.reduce((n,x)=>n+x.qty,0)};
  }
  function makeOrder(cart,settings,destination,confirmed,now=new Date().toISOString(),id='TG-'+Date.now().toString(36).toUpperCase()){
    const q=quote(cart,settings),name=String(destination||'').trim();
    if(!q.lines.length)throw Error('กรุณาเพิ่มสินค้าก่อน');
    if(!name||name.length>120)throw Error('ระบุชื่อผู้รับหรืออู่ตัวอย่าง ไม่เกิน 120 ตัวอักษร');
    if(!confirmed)throw Error('กรุณายืนยันว่าเป็นคำสั่งซื้อสาธิต');
    return {id,created:now,destination:name,quote:q,stage:0,events:[{stage:0,at:now}],demo:true};
  }
  function validOrder(o){return !!(o&&o.demo===true&&typeof o.id==='string'&&o.id.length<100&&typeof o.destination==='string'&&Number.isInteger(o.stage)&&o.stage>=0&&o.stage<stages.length&&Number.isFinite(o.quote?.total)&&Array.isArray(o.quote?.lines)&&o.quote.lines.length>0&&o.quote.lines.every(l=>typeof l.id==='string'&&typeof l.name==='string'&&Number.isInteger(l.qty)&&l.qty>0&&Number.isFinite(l.total))&&Array.isArray(o.events)&&typeof o.created==='string');}
  function advance(o,now=new Date().toISOString()){
    if(!validOrder(o))throw Error('Invalid order');
    if(o.stage===stages.length-1)return o;
    return {...o,stage:o.stage+1,events:[...o.events,{stage:o.stage+1,at:now}]};
  }
  const api={products,defaults,modes,stages,get,cleanCart,config,filter,quote,makeOrder,validOrder,advance};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TunersEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
