import assert from 'node:assert/strict';
import {open,save} from './common.mjs';
const {browser,page}=await open();
try{
 await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.className),'skip');
 assert.ok(await page.locator('.skip').evaluate(n=>{const r=n.getBoundingClientRect();const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return top===n||n.contains(top);}), 'El enlace para saltar debe verse sobre la navegación');
 await page.getByRole('tab').nth(7).click();
 await page.locator('.hero-jump').click();
 assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-20','CTA conserva la fecha elegida');
 await page.locator('[data-itinerary-view=list]').click();
 await page.locator('.hero-jump').click();
 assert.equal(await page.evaluate(()=>document.activeElement.id),'day-20','CTA enfoca el día visible en lista');
 await page.locator('[data-itinerary-view=day]').click();
 assert.ok(await page.locator('#day-20').isVisible());
 await save('navigation.json',{skipVisible:true,currentDayPreserved:true,heroFocusInBothViews:true});console.log('PASS salto visible y CTA con fecha elegida en ambas vistas');
}finally{await browser.close();}
