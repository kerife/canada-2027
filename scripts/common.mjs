import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
export { readFile, writeFile, mkdir };
export const base = process.env.SITE_URL || 'http://127.0.0.1:8874';
export const baseline = process.argv.includes('--baseline');
export const out = baseline ? 'baseline' : 'docs/design/after';
export async function open(width=390, height=844) {
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${base}/${baseline?'baseline/':''}index.html`);
  await page.evaluate(()=>document.fonts.ready);
  return {browser,page,errors};
}
export async function save(name,data,dir=out){await mkdir(dir,{recursive:true});await writeFile(`${dir}/${name}`,JSON.stringify(data,null,2)+'\n');}
export async function readyPhotos(page){await page.evaluate(async()=>{for(const image of document.images)image.loading='eager';await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));});}
export async function content(page){return page.evaluate(()=>{
  const root=document.body.cloneNode(true);
  root.querySelectorAll('script,style,[data-editorial-ui],noscript').forEach(n=>n.remove());
  const norm=s=>s.replace(/\s+/g,' ').trim();
  const text=norm(root.textContent);
  const numeric=[];const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode())numeric.push(...(walker.currentNode.textContent.match(/\d+(?:[.,:/–−-]\d+)*(?:%|h)?/g)||[]));
  const count=items=>Object.fromEntries([...new Set(items)].sort().map(s=>[s,items.filter(x=>x===s).length]));
  const states=['Confirmado publicado','Sujeto a cambio','Estimado','Pendiente de confirmar','Propuesto','Plan base'];
  return {text,hrefs:count([...root.querySelectorAll('a[href]:not([data-added-credit])')].map(a=>a.getAttribute('href'))),numbers:count(numeric),states:Object.fromEntries(states.map(s=>[s,text.split(s).length-1])),blocks:[...root.querySelectorAll('p,h1,h2,h3,h4,li,td,th,dd,dt,summary,figcaption,label,button')].map(n=>norm(n.textContent)).filter(Boolean),structure:{days:root.querySelectorAll('.print-day').length,bases:root.querySelectorAll('.route-list>li').length,hotels:root.querySelectorAll('.hotel-card').length,slots:root.querySelectorAll('.activity-card').length}};
});}
