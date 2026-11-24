(function(root){
 'use strict';
 const T=typeof module!=='undefined'&&module.exports?require('./tuners-engine.js'):root.TunersEngine;
 function recommend(input,settings=T.defaults){
  const qty=Number(input.qty),budget=input.budget===''?Infinity:Number(input.budget);
  if(!T.products.some(p=>p.model===input.model))throw Error('model');
  if(!Number.isInteger(qty)||qty<1||qty>99)throw Error('qty');
  if(budget<0||Number.isNaN(budget)||(!Number.isFinite(budget)&&input.budget!==''))throw Error('budget');
  if(!['cost','time','balanced'].includes(input.goal))throw Error('goal');
  const candidates=T.products.filter(p=>p.model===input.model&&(!input.category||p.category===input.category)&&(!input.segment||p.segment===input.segment));
  const available=candidates.filter(p=>p.stock>=qty);
  let rows=[];
  for(const part of available)for(const mode of ['air','sea']){
   const quote=T.quote([{id:part.id,qty}],{...settings,mode});
   if(quote.total<=budget)rows.push({part,mode,quote,days:mode==='air'?12:40});
  }
  if(!rows.length)return {status:!candidates.length?'no-match':!available.length?'stock':'budget',rows:[],input:{...input,qty}};
  const costs=rows.map(r=>r.quote.total),days=rows.map(r=>r.days);
  const norm=(n,values)=>Math.max(...values)===Math.min(...values)?0:(n-Math.min(...values))/(Math.max(...values)-Math.min(...values));
  rows.forEach(r=>r.score=input.goal==='cost'?r.quote.total:input.goal==='time'?r.days:.5*norm(r.quote.total,costs)+.5*norm(r.days,days));
  rows.sort((a,b)=>a.score-b.score||a.quote.total-b.quote.total||a.days-b.days||a.part.id.localeCompare(b.part.id));
  // One delivery alternative per product; results are alternatives, never a combined cart.
  const seen=new Set();rows=rows.filter(r=>{if(seen.has(r.part.id))return false;seen.add(r.part.id);return true;});
  return {status:'found',rows,input:{...input,qty}};
 }
 const api={recommend};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TunersRecommend=api;
})(typeof globalThis!=='undefined'?globalThis:this);
