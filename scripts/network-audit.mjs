import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import {base,baseline,save,readFile} from './common.mjs';
const browser=await chromium.launch();
try{
 const page=await browser.newPage();const origins=new Set();
 page.on('request',r=>{if(/^https?:/.test(r.url())&&new URL(r.url()).origin!==new URL(base).origin)origins.add(new URL(r.url()).origin);});
 await page.goto(`${base}/${baseline?'baseline/':''}index.html`);
 await page.locator('[data-itinerary-view=list]').click();await page.locator('details').evaluateAll(ns=>ns.forEach(n=>n.open=true));
 await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const result=[...origins].sort();await save('network.json',result);
 if(!baseline){const before=JSON.parse(await readFile('baseline/network.json','utf8'));assert.deepEqual(result.filter(x=>!before.includes(x)),[]);}
 console.log('PASS red: '+JSON.stringify(result));
}finally{await browser.close();}
