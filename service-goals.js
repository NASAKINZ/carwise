(function (root) {
  'use strict';
  const C=typeof module!=='undefined'&&module.exports?require('./ev.js'):root.Carwise;
  const A=typeof module!=='undefined'&&module.exports?require('./advice.js'):root.CarwiseAdvice;
  const evOptions=[{id:'EV-A',label:'บริการ EV ตัวอย่าง A',cost:900,minutes:180,eligible:true},{id:'EV-B',label:'บริการ EV ตัวอย่าง B',cost:1500,minutes:60,eligible:true},{id:'EV-C',label:'บริการ EV ตัวอย่าง C',cost:1150,minutes:90,eligible:true}];
  const goals = Object.freeze({
    cost: { label: 'ค่าใช้จ่ายต่ำสุด', description: 'เลือกค่าใช้จ่ายรวมต่ำสุด ถ้าเท่ากันเลือกเวลาน้อยกว่า' },
    time: { label: 'ใช้เวลาน้อยสุด', description: 'เลือกเวลารวมน้อยสุด ถ้าเท่ากันเลือกค่าใช้จ่ายต่ำกว่า' },
    balanced: { label: 'สมดุลทั้งสองด้าน', description: 'ให้น้ำหนักค่าใช้จ่าย 50% และเวลา 50%' }
  });
  // Illustrative, comparable initial-inspection services; no real provider or quotation.
  const sampleOptions = Object.freeze([
    Object.freeze({ id: 'A', label: 'บริการตัวอย่าง A', cost: 300, minutes: 120, eligible: true }),
    Object.freeze({ id: 'B', label: 'บริการตัวอย่าง B', cost: 700, minutes: 30, eligible: true }),
    Object.freeze({ id: 'C', label: 'บริการตัวอย่าง C', cost: 450, minutes: 60, eligible: true })
  ]);
  const validGoal = goal => typeof goal === 'string' && Object.prototype.hasOwnProperty.call(goals, goal);
  const goalFor = goal => validGoal(goal) ? goal : 'balanced';
  function rankOptions(options, goal, safety) {
    if (!validGoal(goal)) throw new TypeError('Unknown service goal');
    if (!Array.isArray(options)) throw new TypeError('Options must be an array');
    // A goal can never bypass the safety stop. "no" is still not a driving clearance.
    if (safety !== 'no') return [];
    const eligible = options.filter(o => o && o.eligible === true &&
      Number.isFinite(o.cost) && o.cost >= 0 && Number.isFinite(o.minutes) && o.minutes >= 0);
    if (!eligible.length) return [];
    const minCost = Math.min(...eligible.map(o => o.cost)), maxCost = Math.max(...eligible.map(o => o.cost));
    const minTime = Math.min(...eligible.map(o => o.minutes)), maxTime = Math.max(...eligible.map(o => o.minutes));
    const norm = (value, min, max) => min === max ? 0 : (value - min) / (max - min);
    return eligible.map(o => ({ ...o, score: goal === 'cost' ? o.cost : goal === 'time' ? o.minutes :
      0.5 * norm(o.cost, minCost, maxCost) + 0.5 * norm(o.minutes, minTime, maxTime)
    })).sort((a, b) => a.score - b.score || (goal === 'cost' ? a.minutes - b.minutes : goal === 'time' ? a.cost - b.cost : 0));
  }
  function evaluate(c) {
    const goal = goalFor(c.serviceGoal);
    return { goal, label: goals[goal].label, ranked: rankOptions(C.vehicleTypeFor(c)==='ice'?sampleOptions:evOptions, goal, A.risk(c)?'unknown':c.safety), source: 'ข้อมูลสมมติสำหรับสาธิต ไม่ใช่ราคาและคิวจริงของอู่' };
  }
  function report(c) {
    const result = evaluate(c);
    const rows = result.ranked.map((o, i) => `${i + 1}. ${o.label}: ${o.cost} บาท / ${o.minutes} นาที`);
    return `เป้าหมายการรับบริการ: ${result.label}\n${result.source}\n${rows.length ? rows.join('\n') : 'งดจัดอันดับบริการ เนื่องจากหยุดด้านความปลอดภัย ให้ติดต่อช่างเพื่อประเมินการช่วยเหลือ'}\nขอบเขตสมมติ: ตรวจเบื้องต้น รวมค่าเคลื่อนย้ายและเวลารอ ไม่รวมค่าซ่อม/อะไหล่\nแบบสมดุลปรับราคาและเวลาเป็นสเกล 0–1 ก่อนรวมคะแนน น้ำหนักด้านละ 50% เลือกคะแนนต่ำสุด\nไม่ใช่การจองบริการหรือการรับรองว่าขับต่อได้`;
  }
  const api = { goals, sampleOptions, evOptions, validGoal, goalFor, rankOptions, evaluate, report };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CarwiseServiceGoals = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
