import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {open,save,baseline} from './common.mjs';
const results=[];
for(const width of [390,768,1440]){
 const {browser,page}=await open(width);
 try{for(const expanded of [false,true]){
  if(expanded){await page.locator('[data-itinerary-view=list]').click();await page.locator('details').evaluateAll(ns=>ns.forEach(n=>n.open=true));}
  const r=await new AxeBuilder({page}).analyze();results.push({width,expanded,violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 }}finally{await browser.close();}
}
await save('axe.json',results);
const serious=results.flatMap(r=>r.violations.filter(v=>['serious','critical'].includes(v.impact)));
console.log(JSON.stringify(results.map(r=>({width:r.width,expanded:r.expanded,violations:r.violations.map(v=>v.id)}))));
if(!baseline)assert.equal(serious.length,0,'Violaciones serias/críticas de axe');
