'use strict';
let aiAccessToken='',aiBusy=false;
const aiReplies=new Map();
function aiOrigin(){const saved=read('carwise-ai-origin',''); if(saved && saved!=='https://nasakinz.github.io')return saved; if(location.hostname==='nasakinz.github.io')return 'https://carwise-ai-015o.onrender.com'; return ['http:','https:'].includes(location.protocol)?location.origin:'';}
function adviceCards(cards){return `<div class="advice-grid">${cards.map(a=>`<div class="advice-card"><h4>${esc(a.title)}</h4><p>${esc(a.text)}</p></div>`).join('')}</div>`;}
function assistantPanel(c,review=false){
 const plan=CarwiseAdvice.plan(c),saved=aiReplies.get(c.id);
 return `<section class="summary-section assistant-panel"><div class="eyebrow">CARWISE ASSIST / EV + HYBRID + ICE</div><h3>คำแนะนำเบื้องต้นและผู้ช่วย AI</h3><span class="pill ${plan.blocked?'warn':'neutral'}">${plan.blocked?'หยุดและประสานความช่วยเหลือ':'คำแนะนำตามกฎ · ใช้ได้โดยไม่เรียก AI'}</span><p>${esc(plan.message)}</p>${adviceCards(plan.actions)}<p><strong>บริการที่ควรประสาน:</strong> ${esc(plan.service)} · ต้องยืนยันความสามารถและราคากับผู้ให้บริการจริง</p>${plan.sources.length?`<details><summary>แหล่งข้อมูลความปลอดภัย</summary>${plan.sources.map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></p>`).join('')}</details>`:''}
 ${review?'<p>ช่างต้องตรวจยืนยันเอง คำแนะนำส่วนนี้ไม่ถูกบันทึกเป็นผลวินิจฉัย</p>':`<div class="divider"></div><h4>ให้ AI ช่วยอธิบายจากข้อมูลเคส</h4><p>AI ช่วยเรียบเรียงอาการและเลือกคำแนะนำจากรายการที่กำหนด ไม่สั่งซ่อมหรือยืนยันว่ารถขับต่อได้</p><a class="text-link" href="#assistant-settings">ตั้งค่าการเชื่อมต่อ / ตรวจสถานะ AI →</a>${plan.blocked?'<p>ปิดการเรียก AI สำหรับเคสที่ต้องหยุดด้านความปลอดภัย</p>':`<form id="ai-advice-form" data-case="${esc(c.id)}"><label class="field">อยากให้ช่วยอธิบายเรื่องใด?<select name="question"><option>สรุปอาการและข้อมูลที่ควรแจ้งช่าง</option><option>อธิบายคำแนะนำเบื้องต้นที่ทำได้จากข้อมูลที่มี</option><option>ควรเลือกบริการแบบใดและถามช่างเรื่องอะไร</option></select></label><label class="field">คำถามเพิ่มเติม (ถ้ามี)<textarea name="extra" maxlength="300" placeholder="ไม่ต้องใส่ชื่อ เบอร์โทร ทะเบียนรถ หรือข้อมูลส่วนตัว"></textarea></label><details><summary>ข้อมูลที่จะส่งเมื่อกดขอคำตอบ</summary><p>รุ่นและปีรถ ประเภทรถ อาการ ข้อความเหตุการณ์ คำตอบคัดกรอง เป้าหมายการรับบริการ และคำถามด้านบน ไม่ส่งรหัสเคสหรือบันทึกชื่อช่าง</p><p>ระบบส่งผ่านหลังบ้านไปยังผู้ให้บริการที่ตั้งค่า (Google Gemini หรือ OpenAI) ตรวจผู้ให้บริการในหน้าตั้งค่า AI ก่อนส่ง Gemini Free Tier อาจใช้ข้อมูลเพื่อปรับปรุงผลิตภัณฑ์ จึงควรใช้เคสจำลองที่ไม่มีข้อมูลส่วนตัว โปรดลบข้อมูลส่วนตัวออกจากข้อความเหตุการณ์ก่อน</p></details><label class="ai-consent"><input type="checkbox" name="consent" required> ยินยอมส่งข้อมูลข้างต้นไปยังหลังบ้านและผู้ให้บริการ AI ที่ตั้งค่า เพื่อรับคำอธิบาย</label><button class="btn dark" type="submit">ให้ AI ช่วยอธิบาย →</button></form>`}<div id="ai-reply" role="status" aria-live="polite">${saved?aiReplyHTML(saved):'<p class="ai-status">ยังไม่ได้ส่งข้อมูลหรือเรียก AI สำหรับเคสนี้</p>'}</div>`}</section>`;
}
function aiReplyHTML(r){return `<div class="ai-response"><span class="pill ${['openai','gemini'].includes(r.source)?'blue':'warn'}">${['openai','gemini'].includes(r.source)?'คำอธิบายจาก AI':'คำแนะนำตามกฎความปลอดภัย'}</span><p>${esc(r.summary)}</p>${adviceCards(r.actions||[])}<small>ตรวจทานกับช่างก่อนดำเนินการ · ไม่ใช่ผลวินิจฉัย${r.model?' · '+esc(r.model):''}</small></div>`;}
function assistantSettings(){
 shell(`${intro('AI CONNECTION','เชื่อมต่อผู้ช่วย Carwise','API key อยู่ฝั่งเซิร์ฟเวอร์เท่านั้น ไม่กรอกคีย์ Google / OpenAI ในเว็บนี้')}<section class="panel"><form id="ai-settings-form"><label class="field">URL ของหลังบ้าน<input name="origin" type="url" required value="${esc(aiOrigin())}" placeholder="https://your-carwise-server.example"><small>ใช้ HTTPS สำหรับออนไลน์ หรือ http://127.0.0.1:4174 สำหรับเครื่องนี้</small></label><label class="field">รหัสเข้าใช้ Carwise AI<input name="token" type="password" autocomplete="off" minlength="32" placeholder="รหัส CARWISE_ACCESS_TOKEN ที่ผู้ดูแลกำหนด"><small>ไม่ใช่ API key ของ Google / OpenAI · เก็บในหน่วยความจำหน้านี้เท่านั้น โหลดหน้าใหม่ต้องกรอกอีกครั้ง</small></label><div class="actions"><button class="btn dark" type="submit">บันทึกและตรวจการเชื่อมต่อ</button><button class="btn ghost" type="button" id="ai-clear">ล้างการเชื่อมต่อ</button></div></form><p id="ai-health" role="status" aria-live="polite">ยังไม่ได้ตรวจสถานะหลังบ้าน</p><p>ถ้าเปิดเว็บจากไฟล์ ให้เปิดผ่านหลังบ้านที่ http://127.0.0.1:4174 ก่อนใช้ AI ข้อมูลคัดกรองยังอยู่ในเบราว์เซอร์ต้นทางเดิม ย้ายเคสด้วยไฟล์ .json ได้</p><a href="#history" class="text-link">กลับไปเลือกเคส →</a></section>`,'home','ตั้งค่า AI');
 $('#ai-settings-form').addEventListener('submit',async e=>{
  e.preventDefault();const health=$('#ai-health');const f=new FormData(e.target),token=String(f.get('token')||'');let origin;
  try{const u=new URL(String(f.get('origin')));if(u.username||u.password||u.search||u.hash||!['','/'].includes(u.pathname)||!(u.protocol==='https:'||u.protocol==='http:'&&['localhost','127.0.0.1'].includes(u.hostname)))throw Error();origin=u.origin;if(/^(sk-|AIza)/.test(token))throw Error('key');}
  catch{health.textContent='ใช้ URL ต้นทาง HTTPS หรือ localhost และอย่ากรอก API key ของ Google / OpenAI';return}
  if(origin!==aiOrigin())aiAccessToken='';
  try{localStorage.setItem('carwise-ai-origin',origin)}catch{}
  if(token)aiAccessToken=token;
  e.target.elements.token.value='';health.textContent='กำลังตรวจสถานะ...';
  try{const r=await fetch(origin+'/api/health',{signal:AbortSignal.timeout(90000)});if(!r.ok)throw Error();const s=await r.json();if(!['OpenAI','Gemini'].includes(s.provider)||s.ok!==true)throw Error();health.textContent=s.provider+' · '+s.model+' · '+(s.aiReady?'หลังบ้านตั้งค่า AI แล้ว · ยังต้องทดสอบคำขอจากเคสจริงเพื่อยืนยันเครดิตและสิทธิ์ API':'เชื่อมหลังบ้านได้ แต่ยังไม่ได้ตั้ง API key หรือรหัสเข้าใช้ฝั่งเซิร์ฟเวอร์');}
  catch{health.textContent='เชื่อมหลังบ้านไม่ได้ ตรวจ URL ว่าเซิร์ฟเวอร์เปิดอยู่และอนุญาตต้นทางเว็บนี้';}
 });
 $('#ai-clear').addEventListener('click',()=>{aiAccessToken='';aiReplies.clear();try{localStorage.removeItem('carwise-ai-origin')}catch{}assistantSettings();});
}
function bindAssistant(){
 const form=$('#ai-advice-form');if(!form)return;
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(aiBusy)return;const c=cases.find(c=>c.id===form.dataset.case);if(!c)return;
  const f=new FormData(form),question=String(f.get('question'))+' '+String(f.get('extra')||''),target=$('#ai-reply');
  const plan=CarwiseAdvice.plan(c,question);
  if(plan.blocked){target.innerHTML=aiReplyHTML({source:'safety-rule',summary:plan.message,actions:[]});return;}
  if(location.protocol==='file:'){target.textContent='กรุณาเปิดเว็บผ่านหลังบ้าน HTTP/HTTPS ก่อนใช้งาน AI';return}
  if(!aiAccessToken){target.textContent='ยังไม่มีรหัสเข้าใช้ AI กรุณาเปิดตั้งค่าการเชื่อมต่อก่อน (ไม่ใช่ API key)';return}
  if(f.get('consent')!=='on')return;
  aiBusy=true;const button=form.querySelector('button[type=submit]');button.disabled=true;target.textContent='กำลังขอคำอธิบายจาก AI...';
  try{
   const payload={consent:true,question,case:{vehicle:c.vehicle,year:c.year||'',vehicleType:C.vehicleTypeFor(c),category:c.category,safety:c.safety,serviceGoal:G.goalFor(c.serviceGoal),context:c.context||'',answers:c.answers.map(a=>({id:a.id,answer:a.answer}))}};
   const r=await fetch(aiOrigin()+'/api/advice',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+aiAccessToken},body:JSON.stringify(payload),signal:AbortSignal.timeout(90000)});
   const data=await r.json();if(!r.ok)throw Error(data.error||'AI ไม่พร้อม');if(!['openai','gemini','safety-rule'].includes(data.source)||typeof data.summary!=='string'||!Array.isArray(data.actions))throw Error('รูปแบบคำตอบไม่ถูกต้อง');
   aiReplies.set(c.id,data);target.innerHTML=aiReplyHTML(data);
  }catch(error){target.textContent='ยังไม่ได้รับคำตอบ AI: '+(error.name==='TimeoutError'?'หมดเวลารอ':error.message)+ ' · ใช้คำแนะนำตามกฎด้านบนได้';}
  finally{aiBusy=false;button.disabled=false}
 });
}
