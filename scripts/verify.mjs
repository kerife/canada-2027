import {spawnSync} from 'node:child_process';
import {stat,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
for(const script of ['build','parity-check','calc-regression','tabs-regression','ui-regression','navigation-regression','a11y','network-audit']){
 const result=spawnSync(process.execPath,[`scripts/${script}.mjs`],{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status||1);
}
const before=(await stat('baseline/index.html')).size,after=(await stat('index.html')).size;
assert.ok(after<=before*1.15,'Peso máximo de +15%');
const original=await readFile('baseline/index.html','utf8'),current=await readFile('index.html','utf8');
for(const pattern of [/@font-face\{[^}]+\}/g,/<img\b[^>]*>/g,/<script id="photo-data" type="application\/json">([\s\S]*?)<\/script>/g,/<script id="daily-data" type="application\/json">([\s\S]*?)<\/script>/g]){
 assert.deepEqual([...current.matchAll(pattern)].map(m=>m[0]),[...original.matchAll(pattern)].map(m=>m[0]),'Recursos originales idénticos');
}
console.log(`PASS peso: ${before} → ${after} bytes (+${((after/before-1)*100).toFixed(2)}%); fuentes y fotografías idénticas`);
