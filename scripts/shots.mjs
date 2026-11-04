import {open,out,mkdir} from './common.mjs';
await mkdir(out,{recursive:true});
for(const [width,height] of [[390,844],[768,1024],[1440,900]]){
 const {browser,page}=await open(width,height);
 try {
  await page.screenshot({path:`${out}/hero-${width}.png`});
  await page.screenshot({path:`${out}/full-${width}.png`,fullPage:true});
  for(const id of ['actualizacion','recorrido','aniversario','hoteles','presupuesto','preparativos']){
   await page.locator('#'+id).evaluate(n=>window.scrollTo(0,n.getBoundingClientRect().top+scrollY-90));
   await page.screenshot({path:`${out}/${id}-${width}.png`});
  }
  if(width===390){await page.locator('[data-itinerary-view=list]').click();await page.locator('#day-22').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/lista-390.png`});}
  if(width===1440){await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));await page.pdf({path:`${out}/impresion.pdf`,format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});}
 } finally {await browser.close();}
}
console.log('Capturas 390/768/1440, movimiento reducido y PDF guardados');
