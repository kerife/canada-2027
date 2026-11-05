import assert from 'node:assert/strict';
import {open,baseline,content,save,readFile} from './common.mjs';
const {browser,page}=await open();
try {
 const current=await content(page);
 if(baseline){await save('content.json',current);console.log('Línea base de contenido guardada');}
 else {
  const before=JSON.parse(await readFile('baseline/content.json','utf8'));
  const canonical=s=>s.replace(/[\[\]]/g,'').replace(/\s*·\s*(?=\d{1,2}:\d{2})/g,' ').replace(/\s+/g,' ').trim();
  const missing=before.blocks.filter(s=>!canonical(current.text).includes(canonical(s)));
  const result={missing,structure:current.structure};
  await save('parity.json',result);
  for(const name of ['hrefs','numbers','states','structure'])assert.deepEqual(current[name],before[name],name);
  assert.deepEqual(missing,[],'Textos de base ausentes (comparación exacta, más estricta que 0.9)');
  console.log('PASS paridad: enlaces, números, estados, textos y estructura');
 }
} finally {await browser.close();}
