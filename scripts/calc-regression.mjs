import assert from 'node:assert/strict';
import {open,baseline,save,readFile} from './common.mjs';
const {browser,page}=await open();
try {
 const results={};
 async function record(name){results[name]=await page.evaluate(()=>Object.fromEntries(['base-costs','category-totals','total-person','total-cad','mobile-total','mobile-pending','total-couple','comparison','pending-costs','exact-total','fx-breakdown','daily-costs','budget-live'].map(id=>[id,document.getElementById(id).textContent.replace(/\s+/g,' ').trim()]).concat([...document.querySelectorAll('.option-mxn')].map((n,i)=>['option-'+i,n.textContent]))));}
 async function reset(){await page.locator('#reset-budget').click();}
 await record('propuesta');
 await page.locator('#presupuesto details').evaluateAll(ns=>ns.forEach(n=>n.open=true));
 await page.locator('#presupuesto input[type=number]').evaluateAll(ns=>ns.forEach(n=>{if(!n.disabled&&n.id!=='fx')n.value='';}));
 await page.locator('#fx').dispatchEvent('input');await record('vacío');
 await page.locator('#amount-quebec-hotel').fill('450.75');await record('parcial');
 for(const buffer of ['0','.05','.08'])for(const people of ['1','2']){
  await reset();
  await page.locator('.option-check:not(:disabled)').evaluateAll(ns=>ns.forEach(n=>n.checked=true));
  await page.locator('#fx').dispatchEvent('input');
  await page.locator('#hotel-scenario').fill('1800.25');
  await page.locator('.cost-input').evaluateAll(ns=>ns.forEach((n,i)=>n.value=String(60+i*17.25)));
  await page.locator('.people:not(:disabled)').evaluateAll((ns,value)=>ns.forEach(n=>n.value=value),people);
  await page.locator('#fx-buffer').selectOption(buffer);await record(`completo-${buffer}-${people}`);
 }
 await reset();await record('restablecer');
 if(baseline)await save('calculator.json',results);
 else {assert.deepEqual(results,JSON.parse(await readFile('baseline/calculator.json','utf8')));await save('calculator.json',results);}
 console.log('PASS calculadora: 10 escenarios, todas las cifras y tabla diaria');
} finally {await browser.close();}
