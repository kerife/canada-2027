import assert from 'node:assert/strict';
import {open,save} from './common.mjs';
const {browser,page}=await open();
try{
 assert.equal(await page.evaluate(()=>scrollY),0,'La página debe abrir en la portada');
 const tabs=page.getByRole('tab');assert.equal(await tabs.count(),13);
 for(let i=0;i<13;i++){
  await tabs.nth(i).click();assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');assert.ok(await page.locator(`#day-${i+13}`).isVisible());
  await tabs.nth(i).focus();await page.keyboard.press('ArrowRight');const next=(i+1)%13;
  assert.equal(await page.evaluate(()=>document.activeElement.id),`tab-${next+13}`);
 }
 await page.keyboard.press('Home');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-13');
 await page.keyboard.press('End');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-25');
 await page.locator('[data-itinerary-view=list]').click();assert.equal(await page.locator('.print-day:visible').count(),13);
 for(let n=13;n<=25;n++)assert.ok(await page.locator(`#day-title-${n}`).isVisible());
 await page.locator('[data-itinerary-view=day]').click();assert.ok(await page.locator('#day-25').isVisible());
 const widths=[];
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);widths.push({width,overflow});assert.equal(overflow,false,`Desbordamiento a ${width}`);}
 await save('tabs.json',{days:13,views:2,widths});console.log('PASS 13 fechas, clic, flechas, Home/End, dos vistas y cinco anchos');
}finally{await browser.close();}
