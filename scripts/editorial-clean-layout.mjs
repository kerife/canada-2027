import assert from 'node:assert/strict';
import {open,readyPhotos,save} from './common.mjs';
const results=[];
for(const width of [320,390,768,1024,1440]) {
 const {page,browser}=await open(width,900);
 try {
  await readyPhotos(page);
  for(const expanded of [false,true]) {
   await page.locator('[data-itinerary-view=list]').click();
   if(expanded)await page.locator('details').evaluateAll(ns=>ns.forEach(n=>n.open=true));
   const r=await page.evaluate(()=>{
    const visible=n=>n.checkVisibility({checkVisibilityCSS:true})&&!n.closest('.visually-hidden,[hidden],#view-help,.calendar-marker');
    const targets=[...document.querySelectorAll('a,button,input,select,summary')].filter(n=>visible(n)&&!n.disabled);
    const small=targets.filter(n=>{const r=n.getBoundingClientRect();return r.width<43.9||r.height<43.9;}).map(n=>({text:n.textContent.slice(0,60),id:n.id,w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height}));
    let chars=0,smallChars=0;const tiny=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {const n=walker.currentNode,p=n.parentElement;if(!n.textContent.trim()||p.closest('script,style')||!visible(p))continue;const range=document.createRange();range.selectNode(n);if(!range.getClientRects().length)continue;const size=parseFloat(getComputedStyle(p).fontSize),count=n.textContent.trim().length;chars+=count;if(size<=13)smallChars+=count;if(size<12)tiny.push(n.textContent.slice(0,40));}
    const captions=[...document.querySelectorAll('.photo-credit')].filter(visible).filter(n=>n.scrollWidth>n.clientWidth||getComputedStyle(n).textOverflow==='ellipsis');
    const media=[...document.querySelectorAll('.hotel-card')].map(n=>{const m=n.firstElementChild,r=m.getBoundingClientRect();return {w:r.width,h:r.height,body:n.querySelector('.hotel-body').getBoundingClientRect().top};});
    return {overflow:document.documentElement.scrollWidth>innerWidth,small,tiny,smallPercent:100*smallChars/chars,captions:captions.length,media};
   });
   results.push({width,expanded,...r});assert.equal(r.overflow,false,`Desbordamiento ${width}`);assert.deepEqual(r.small,[],`Objetivos ${width}`);assert.deepEqual(r.tiny,[],`Texto <12 ${width}`);assert.equal(r.captions,0);
   if(width===1440){assert.ok(r.smallPercent<=10);assert.ok(Math.abs(r.media[0].h-r.media[1].h)<1,'Foto y placeholder alineados');}
  }
 }finally{await browser.close();}
}
await save('editorial-layout.json',results,'docs/editorial-limpio/despues');console.log('PASS cinco anchos, tipografía, controles 44×44, créditos y medios de hoteles');
