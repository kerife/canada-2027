import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {open,base,baseline,save,readFile} from './common.mjs';
const {page,browser,errors}=await open();
try{
 assert.match(await page.title(),/Un invierno para nosotros/);assert.ok(await page.locator('main h1').isVisible());
 assert.equal(await page.evaluate(()=>scrollY),0);
 const before=await page.locator('#budget-summary').textContent();
 await page.locator('.hero-jump').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-13');
 const credit=page.locator('#day-13 .photo-credit a').first();assert.ok(await credit.isVisible());assert.ok(await credit.getAttribute('href'));
 const story=page.locator('#day-13 .activity-card[data-slot="1"] .stop-details');
 assert.equal(await story.getAttribute('open'),null);
 await page.locator('[data-itinerary-view=list]').click();await page.locator('[data-itinerary-view=list]').click();
 assert.equal(await page.locator('.print-day:visible').count(),13);assert.equal(await page.locator('.stop-details[open]').count(),0);
 await page.locator('[data-itinerary-view=day]').click();assert.equal(await story.getAttribute('open'),null);
 assert.equal(await page.locator('#budget-summary').textContent(),before);
 const food=page.locator('tr[data-id=foodextra]');await food.locator('.option-check').check();
 await food.locator('.step-minus').click();assert.equal(await food.locator('.people').inputValue(),'1');
 assert.ok(await food.locator('.step-minus').isDisabled());await food.locator('.step-plus').click();assert.equal(await food.locator('.people').inputValue(),'2');
 await page.locator('#reset-budget').click();assert.equal(await page.locator('#budget-summary').textContent(),before);
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.locator('[data-itinerary-view=list]').click();await page.locator('details').evaluateAll(ns=>ns.forEach(n=>n.open=true));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Todo abierto a ${width}`);
  await page.locator('#budget-summary').scrollIntoViewIfNeeded();
  const reset=page.locator('#reset-budget');await reset.scrollIntoViewIfNeeded();assert.ok(await reset.isVisible());await reset.click();
  await page.locator('[data-itinerary-view=day]').click();
 }
 await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));
 assert.equal(await page.locator('.print-day:visible').count(),13);assert.equal(await page.locator('details:not([open])').count(),0);
 await page.evaluate(()=>dispatchEvent(new Event('afterprint')));
 assert.equal(await page.locator('.print-day:visible').count(),1);
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('h1').evaluate(n=>getComputedStyle(n).animationName),'none');
 const originals=await readFile('baseline/index.html','utf8');
 for(const file of ['budget.js','app.js'])assert.ok(originals.includes(await readFile('src/'+file,'utf8')),`Lógica original intacta: ${file}`);
 assert.deepEqual(errors,[]);await save('ui.json',{result:'PASS',widths:[320,390,768,1024,1440],errors,printDays:13,allDetailsExpanded:true});
 console.log('PASS interfaz, créditos, stepper, lista repetida, impresión, movimiento reducido y todo abierto');
}finally{await browser.close();}
// A fresh context proves that all runtime assets are bundled.
const offlineBrowser=await chromium.launch();
try{
 const context=await offlineBrowser.newContext();const p=await context.newPage();
 await context.setOffline(true);await p.goto(pathToFileURL(resolve('index.html')).href);await p.evaluate(()=>document.fonts.ready);await p.locator('[data-itinerary-view=list]').click();
 await p.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode()));});
 assert.equal(await p.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).length),0);
 console.log('PASS imágenes y navegación sin conexión');
}finally{await offlineBrowser.close();}
