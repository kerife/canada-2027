import {open,mkdir} from './common.mjs';
const block=process.argv[2];const dir=`docs/design/blocks/${block}`;await mkdir(dir,{recursive:true});
for(const width of [390,768,1440]){
 const {page,browser}=await open(width,width===768?1024:900);
 try{await page.screenshot({path:`${dir}/hero-${width}.png`});await page.locator('#recorrido').evaluate(n=>window.scrollTo(0,n.getBoundingClientRect().top+scrollY-80));await page.screenshot({path:`${dir}/itinerary-${width}.png`});}
 finally{await browser.close();}
}
