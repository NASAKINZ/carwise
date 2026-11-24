/* A* tree search over a finite, acyclic procurement tree. All rates are mock data. */
(function(root){
 'use strict';
 const T=typeof module!=='undefined'&&module.exports?require('./tuners-engine.js'):root.TunersEngine;
 const goals={cost:'ค่าใช้จ่ายต่ำสุด',time:'ใช้เวลาน้อยสุด',balanced:'สมดุล 50/50'};
 const suppliers=[{id:'value',label:'Value JP',factor:.95,days:7},{id:'express',label:'Express JP',factor:1.12,days:1},{id:'partner',label:'Partner JP',factor:1.02,days:3}];
 const delivery=[{id:'standard',label:'ส่งถึงอู่แบบปกติ',cost:120,days:3},{id:'priority',label:'ส่งถึงอู่แบบด่วน',cost:280,days:1}];
 const round=n=>Math.round(n*100)/100;
 function problem({part='TG-086-S01',goal='balanced',budget=null,fx=.25,tax=800}={}){
  const p=T.get(part);if(!p)throw Error('ไม่พบสินค้า');if(!Object.hasOwn(goals,goal))throw Error('ไม่พบเป้าหมาย');
  if(!Number.isFinite(fx)||fx<=0||fx>100||!Number.isFinite(tax)||tax<0||tax>1e6)throw Error('เรทหรือภาษีไม่ถูกต้อง');
  const cap=budget===null||budget===''?Infinity:Number(budget);if(cap<0||Number.isNaN(cap))throw Error('งบต้องเป็นตัวเลขตั้งแต่ศูนย์');
  const charge=Math.ceil(Math.max(p.kg,p.cm.reduce((a,b)=>a*b,1)/5000));
  const levels=[suppliers.map(s=>({id:s.id,label:s.label,cost:round(p.yen*fx*s.factor),days:s.days})),Object.entries(T.modes).map(([id,m])=>({id,label:m.label,cost:round(m.base+charge*m.perKg),days:id==='air'?9:30})),delivery.map(d=>({...d,cost:d.cost+tax}))];
  const weights=goal==='cost'?[1,0]:goal==='time'?[0,1]:[.5,.5];
  const score=(cost,days)=>weights[0]*cost/5000+weights[1]*days/30;
  const remaining=stage=>({cost:round(levels.slice(stage).reduce((n,l)=>n+Math.min(...l.map(x=>x.cost)),0)),days:levels.slice(stage).reduce((n,l)=>n+Math.min(...l.map(x=>x.days)),0)});
  const heuristic=stage=>{const r=remaining(stage);return score(r.cost,r.days)};
  return {part:p,goal,budget:cap,fx,tax,levels,score,remaining,heuristic};
 }
 function search(input){
  const p=problem(input),trace=[];if(!p.part.stock)return {status:'out-of-stock',best:null,trace,expanded:0,generated:0};
  let serial=0,expanded=0,generated=1;
  const node=(stage,cost,days,path)=>({stage,cost:round(cost),days,path,g:p.score(round(cost),days),h:p.heuristic(stage),seq:serial++});
  const frontier=[node(0,0,0,[])];
  while(frontier.length){
   frontier.sort((a,b)=>(a.g+a.h)-(b.g+b.h)||a.seq-b.seq);
   const n=frontier.shift(),lowerCost=round(n.cost+p.remaining(n.stage).cost);
   const entry={step:trace.length+1,stage:n.stage,path:n.path.map(x=>x.label).join(' → ')||'START',cost:n.cost,days:n.days,g:n.g,h:n.h,f:n.g+n.h,open:frontier.length,action:'expand',children:0};
   if(lowerCost>p.budget){entry.action='budget-pruned';trace.push(entry);continue}
   if(n.stage===3){entry.action='goal';trace.push(entry);return {status:'found',best:n,trace,expanded,generated}}
   expanded++;
   for(const edge of p.levels[n.stage]){frontier.push(node(n.stage+1,n.cost+edge.cost,n.days+edge.days,[...n.path,edge]));generated++;entry.children++}
   entry.open=frontier.length;trace.push(entry);
  }
  return {status:'no-route',best:null,trace,expanded,generated};
 }
 // Independent exhaustive oracle for verification and the all-results table; never used by search().
 function enumerate(input){const p=problem(input);if(!p.part.stock)return [];const rows=[];
  for(const a of p.levels[0])for(const b of p.levels[1])for(const c of p.levels[2]){const cost=round(a.cost+b.cost+c.cost),days=a.days+b.days+c.days;rows.push({path:[a,b,c],cost,days,score:p.score(cost,days),eligible:cost<=p.budget})}
  return rows.sort((a,b)=>a.score-b.score);
 }
 const api={goals,suppliers,delivery,problem,search,enumerate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TunersSearch=api;
})(typeof globalThis!=='undefined'?globalThis:this);
