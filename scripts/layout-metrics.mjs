import {chromium} from 'playwright';
import {base,save,readyPhotos} from './common.mjs';
const browser=await chromium.launch();const results=[];
try{
 for(const width of [390,768,1440])for(const name of ['baseline','after']){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(`${base}/${name==='baseline'?'baseline/':''}index.html`);await page.evaluate(()=>document.fonts.ready);await readyPhotos(page);
  await page.locator('[data-itinerary-view=list]').click();await page.locator('#recorrido details').evaluateAll(ns=>ns.forEach(n=>n.open=true));
  const list=await page.locator('#day-panels').evaluate(n=>n.getBoundingClientRect().height);
  await page.locator('#recorrido').evaluate(n=>n.classList.remove('list-view'));
  const expanded=await page.locator('#day-panels').evaluate(n=>n.getBoundingClientRect().height);
  results.push({name,width,list:Math.round(list),expanded:Math.round(expanded),reductionPercent:Math.round((1-list/expanded)*100)});await page.close();
 }
 await save('density.json',results);console.log(JSON.stringify(results));
}finally{await browser.close();}
