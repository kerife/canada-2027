import assert from 'node:assert/strict';
import {open,base,save} from './common.mjs';
const {page,browser}=await open();
const grouped=()=>page.evaluate(()=>{
 const words=n=>{
  const root=n.cloneNode(true);root.querySelectorAll('[data-editorial-ui],script,style').forEach(n=>n.remove());
  const terms=[];const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walk.nextNode())terms.push(...(walk.currentNode.textContent.match(/[\p{L}\p{N}]+(?:[.,:/–-][\p{L}\p{N}]+)*/gu)||[]));
  return terms.sort();
 };
 return {days:[...document.querySelectorAll('.print-day')].map(words),hotels:[...document.querySelectorAll('.hotel-card')].map(words)};
});
try {
 const current=await grouped();await page.goto(`${base}/baseline/index.html`);const original=await grouped();
 assert.deepEqual(current.days,original.days,'Contenido conservado dentro de cada día');
 assert.deepEqual(current.hotels,original.hotels,'Contenido conservado dentro de cada alojamiento');
 await save('editorial-content.json',{days:current.days.length,hotels:current.hotels.length,result:'PASS'},'docs/editorial-limpio/despues');
 console.log('PASS contenido por día y hotel, además de la paridad global');
}finally{await browser.close();}
