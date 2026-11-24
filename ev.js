/* EV extension: question weights are illustrative, not diagnostic evidence. */
(function(root){
  'use strict';
  const C=typeof module!=='undefined'&&module.exports?require('./engine.js'):root.Carwise;
  C.vehicleTypes={ice:'รถน้ำมัน',hybrid:'ไฮบริด / Plug-in hybrid',ev:'รถไฟฟ้า EV'};
  C.vehicleTypeFor=c=>Object.hasOwn(C.vehicleTypes,c?.vehicleType)?c.vehicleType:String(c?.category||'').startsWith('ev')?'ev':'ice';
  const definitions={
    evcharge:{label:'EV ชาร์จไม่เข้า',desc:'บันทึกข้อความและสถานะที่พบตอนชาร์จ',icon:'power',causes:['ข้อมูลจากสถานี / อุปกรณ์ชาร์จ','การตั้งค่าหรือเงื่อนไขการชาร์จ','ระบบรถที่ต้องให้ช่าง EV ตรวจ'],questions:[
      ['evcharge-message','หน้าจอรถหรือสถานีแสดงอะไรในครั้งนั้น?',5,5,['มีข้อความหรือรหัสผิดพลาด','รอเวลาชาร์จ / ถึงระดับที่ตั้งไว้','ไม่แสดงสถานะ'],[[3,0,1],[0,4,0],[1,1,1]]],
      ['evcharge-mode','ครั้งนั้นใช้การชาร์จแบบใด?',4,5,['AC ที่บ้าน / Wallbox','AC สาธารณะ','DC ชาร์จเร็ว'],[[1,0,0],[1,0,0],[1,0,0]]],
      ['evcharge-history','จากประวัติเดิม อาการเกิดที่ใด?',3,4,['สถานีเดิมแห่งเดียว','หลายสถานีที่เคยใช้','ยังไม่มีข้อมูลเปรียบเทียบ'],[[3,0,0],[0,0,3],[0,0,0]]]
    ]},
    evready:{label:'EV ไม่ขึ้น READY',desc:'รถไม่เข้าสถานะพร้อมใช้งาน',icon:'car',causes:['ข้อมูลการเข้าใช้งานรถ','ระบบไฟเลี้ยงหรือการแสดงผล','ระบบขับเคลื่อนที่ต้องตรวจจริง'],questions:[
      ['evready-screen','ครั้งนั้นหน้าจอรถมีลักษณะใด?',5,5,['หน้าจอไม่ติด','หน้าจอติด แต่ไม่ขึ้น READY','มีข้อความเตือน'],[[0,3,0],[2,1,1],[0,1,3]]],
      ['evready-message','ข้อความที่จำได้เกี่ยวข้องกับอะไร?',4,5,['กุญแจ / การเข้าใช้งาน','สถานะสายชาร์จ','ระบบรถหรือไม่ทราบความหมาย'],[[3,0,0],[3,0,0],[0,1,2]]],
      ['evready-history','ก่อนพบอาการ รถมีประวัติใด?',3,5,['จอดนาน','เพิ่งชาร์จหรือมีงานบริการ','ไม่พบเหตุการณ์ที่จำได้'],[[0,2,0],[1,1,1],[0,0,0]]]
    ]},
    evrange:{label:'EV ระยะทางลดลง',desc:'เก็บข้อมูลการใช้พลังงานจากประวัติเดิม',icon:'wave',causes:['รูปแบบการเดินทางและสภาพแวดล้อม','ข้อมูลระดับชาร์จและการตั้งค่า','สภาพรถที่ต้องตรวจวัดจริง'],questions:[
      ['evrange-change','สิ่งที่เปลี่ยนไปคืออะไร?',5,5,['ระยะทางคาดการณ์บนจอลดลง','ใช้แบตมากขึ้นในเส้นทางเดิม','ทั้งสองอย่าง'],[[1,2,0],[2,0,1],[2,1,1]]],
      ['evrange-context','การใช้งานช่วงนั้นต่างจากเดิมหรือไม่?',4,5,['เปลี่ยนเส้นทาง / ความเร็ว / สภาพอากาศ','ใช้แอร์หรือบรรทุกต่างจากเดิม','การใช้งานใกล้เคียงเดิม'],[[3,0,0],[3,0,0],[0,1,2]]],
      ['evrange-charge','ระดับชาร์จเริ่มต้นเทียบกับเดิมเป็นอย่างไร?',3,5,['ต่ำกว่าเดิม','ใกล้เคียงเดิม','ไม่มีข้อมูลบันทึก'],[[0,3,0],[0,0,1],[0,0,0]]]
    ]},
    evwarning:{label:'EV มีไฟหรือข้อความเตือน',desc:'เก็บข้อความให้ศูนย์หรือช่าง EV ตรวจต่อ',icon:'alert',causes:['ข้อมูลข้อความเตือนจากรถ','ข้อมูลการชาร์จและการใช้งาน','ระบบรถที่ต้องตรวจด้วยเครื่องมือ'],questions:[
      ['evwarning-message','ข้อความเตือนที่พบเกี่ยวข้องกับอะไร?',5,5,['การชาร์จ','ระบบขับเคลื่อน / แบตเตอรี่','ข้อความอื่น'],[[2,2,0],[2,0,3],[2,0,1]]],
      ['evwarning-time','พบข้อความในช่วงใด?',4,5,['ขณะชาร์จ','เมื่อเปิดรถ','ระหว่างใช้งาน'],[[1,3,0],[2,0,1],[1,0,2]]],
      ['evwarning-repeat','จากที่เคยพบ ข้อความแสดงอย่างไร?',3,5,['ต่อเนื่อง','เป็นบางครั้ง','พบครั้งเดียว'],[[1,0,2],[1,1,0],[1,0,0]]]
    ]}
  };
  for(const [id,d] of Object.entries(definitions)){
    C.groups[id]={label:d.label,desc:d.desc,icon:d.icon,causes:d.causes};
    C.questions[id]=d.questions.map(([id,text,S,E,options,weights])=>({id,text,S,E,R:0,options,weights,hint:'ตอบจากสิ่งที่เคยเห็น ไม่ต้องทดลองชาร์จ ขับรถ หรือเปิดอุปกรณ์เพื่อตอบ'}));
  }
  C.categoriesFor=type=>Object.entries(C.groups).filter(([id])=>type==='ev'?id.startsWith('ev'):type==='hybrid'?true:!id.startsWith('ev'));
  const oldValid=C.validCase;
  C.validCase=c=>oldValid(c)&&(c.vehicleType===undefined||Object.hasOwn(C.vehicleTypes,c.vehicleType))&&(!c.vehicleType||C.categoriesFor(c.vehicleType).some(([id])=>id===c.category));
  if(typeof module!=='undefined'&&module.exports)module.exports=C;
})(typeof globalThis!=='undefined'?globalThis:this);
