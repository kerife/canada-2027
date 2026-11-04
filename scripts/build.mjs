import {readFile,writeFile} from 'node:fs/promises';
let html=await readFile('src/page.html','utf8');
for(const [token,file] of Object.entries({STYLE:'style.css',APP:'app.js',BUDGET:'budget.js',EDITORIAL_CSS:'editorial.css',EDITORIAL_JS:'editorial.js'})){
 if(html.includes(`@@${token}@@`))html=html.replace(`@@${token}@@`,await readFile(`src/${file}`,'utf8'));
}
if(/@@[A-Z_]+@@/.test(html))throw new Error('Plantilla incompleta');
await writeFile('index.html',html);console.log('Generado index.html: '+Buffer.byteLength(html)+' bytes');
