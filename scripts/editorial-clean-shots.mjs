import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
import {base} from './common.mjs';
const before=process.argv.includes('--before'),out=`docs/editorial-limpio/${before?'antes':'despues'}`;
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
try {
 for(const width of [390,768,1440]) {
  const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});
  await page.goto(before?'file:///private/tmp/canada-editorial-before.html':`${base}/index.html`);
  await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode()));});
  const shot=async(name)=>page.screenshot({path:`${out}/${name}-${width}.png`});
  await shot('portada');
  await page.locator('.topbar a[href="#recorrido"]').click();await shot('itinerario');
  await page.locator('[data-itinerary-view=list]').click();await shot('lista');
  await page.locator('.topbar a[href="#hoteles"]').click();
  await page.locator('.hotel-card').first().scrollIntoViewIfNeeded();await shot('hoteles');
  await page.locator('.topbar a[href="#presupuesto"]').click();await shot('presupuesto');
  await page.locator('#fx').fill('14');await page.locator('#hotel-scenario').fill('1800.25');
  await page.locator('#budget-summary').scrollIntoViewIfNeeded();await shot('presupuesto-con-datos');
  if(!before&&width===1440){
   await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));
   await page.pdf({path:`${out}/impresion.pdf`,format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});
  }
  await page.close();
 }
 console.log(`PASS capturas con fuentes y fotos cargadas: ${out}`);
} finally {await browser.close();}
