/* Shared, bounded advice catalog. The language model cannot invent action cards. */
(function(root){
 'use strict';
 const C=typeof module!=='undefined'&&module.exports?require('./ev.js'):root.Carwise;
 const actions={
  record:{title:'เตรียมข้อมูลให้ช่าง',text:'จดเวลา อาการ และข้อความบนจอที่เคยเห็น หากมีภาพเดิมให้เก็บไว้ ไม่ต้องทำให้อาการเกิดซ้ำ'},
  manual:{title:'อ่านคำอธิบายตามรุ่นรถ',text:'ใช้คู่มือเจ้าของรถตรงรุ่นและปี อ่านความหมายของข้อความเตือน ไม่ลบหรือรีเซ็ตรหัสเพื่อกลบอาการ'},
  chargeSettings:{title:'ดูข้อมูลการตั้งค่าที่มีอยู่',text:'เมื่อจอดอยู่ในจุดปลอดภัย อ่านสถานะกำหนดเวลาชาร์จและระดับชาร์จเป้าหมายจากแอปหรือหน้าจอที่เข้าถึงได้ตามปกติ ไม่เปลี่ยนค่าเพื่อฝืนคำเตือน'},
  operator:{title:'ติดต่อผู้ดูแลสถานีชาร์จ',text:'แจ้งชื่อสถานี หมายเลขหัวชาร์จ และรหัสข้อความที่พบ ให้ผู้ดูแลตรวจอุปกรณ์ ไม่เปิดตู้หรือซ่อมสายชาร์จเอง'},
  compareHistory:{title:'เปรียบเทียบประวัติการใช้พลังงาน',text:'เปรียบเทียบเส้นทาง ระดับชาร์จเริ่มต้น แอร์ อากาศ และสัมภาระจากข้อมูลเดิม ไม่ขับทดสอบเพื่อสร้างข้อมูลใหม่'},
  evService:{title:'ประสานศูนย์หรือช่างที่รองรับ EV',text:'ส่งสรุปเคสและถามว่ารองรับรุ่นรถของคุณหรือไม่ ให้ผู้ให้บริการประเมินการเคลื่อนย้ายและการตรวจจริง'},
  workshop:{title:'ติดต่อช่างพร้อมสรุปเคส',text:'แจ้งอาการและสิ่งที่ยังไม่ทราบ ถามขอบเขตตรวจ ราคา และคิวจากผู้ให้บริการจริงก่อนตัดสินใจ'}
 };
 const sources=[{label:'NHTSA — ความปลอดภัยรถไฟฟ้าและไฮบริด',url:'https://www.nhtsa.gov/vehicle-safety/electric-and-hybrid-vehicles'},{label:'ตัวอย่างคู่มือผู้ผลิต — ระบบไฟแรงสูง (ใช้คู่มือตรงรุ่นของคุณ)',url:'https://www.tesla.com/ownersmanual/model3/en_us/GUID-8FA15856-1720-440F-838B-ACFBA8D7D608.html'}];
 function risk(c,question=''){
  const t=[c.context,question,...(c.answers||[]).map(a=>a.answer)].join(' ').normalize('NFC');
  // Conservative signal scan; not an emergency classifier or safety clearance.
  return c.safety!=='no'||/(ควัน|กลิ่นไหม้|ไฟไหม้|น้ำท่วม|จมน้ำ|ชนรุนแรง|สายสีส้ม|ไฟแรงสูง|ไฟฟ้าแรงสูง|เปิดแบต|ถอดแบต|บายพาส|bypass|smoke|burning|flood|high.?voltage|orange.?cable)/i.test(t);
 }
 function plan(c,question=''){
  const blocked=risk(c,question),type=C.vehicleTypeFor(c);
  const ids=blocked?[]:c.category==='evcharge'?['record','chargeSettings','operator','manual','evService']:c.category==='evrange'?['record','compareHistory','manual','evService']:type!=='ice'?['record','manual','evService']:['record','manual','workshop'];
  return {blocked,ids,actions:ids.map(id=>({id,...actions[id]})),sources:type==='ice'?[]:sources,
   message:blocked?'หยุดการตรวจหรือทดลองด้วยตนเอง และติดต่อผู้ช่วยเหลือที่เหมาะสม หากมีควัน ไฟ หรืออันตรายทันที ให้ออกห่างเมื่อทำได้อย่างปลอดภัยและติดต่อหน่วยฉุกเฉินในพื้นที่ ไม่แตะอุปกรณ์ที่เสียหายหรือระบบไฟแรงสูง':'คำแนะนำเพื่อเตรียมข้อมูลและประสานบริการ ไม่ใช่การยืนยันสาเหตุหรือการอนุญาตให้ขับต่อ',
   service:type==='ice'?'ช่างตรวจอาการรถ':'ศูนย์หรือช่างที่ยืนยันว่ารองรับรถ EV / Hybrid รุ่นนี้'};
 }
 const api={actions,sources,risk,plan};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CarwiseAdvice=api;
})(typeof globalThis!=='undefined'?globalThis:this);
