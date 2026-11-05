/* Presentation corrections; no budget inputs or formulas are changed. */
(() => {
  'use strict';
  const baseDays={Quebec:13,Ottawa:17,Montreal:19};
  document.querySelectorAll('.route-position>span').forEach(span=>{
    const button=document.createElement('button');button.type='button';button.dataset.editorialUi='';
    button.setAttribute('aria-label','Ir a '+span.textContent);span.before(button);button.append(span);
    const sync=()=>button.setAttribute('aria-pressed',String(span.hasAttribute('data-active')));
    sync();new MutationObserver(sync).observe(span,{attributes:true,attributeFilter:['data-active']});
    button.addEventListener('click',()=>document.getElementById('tab-'+baseDays[span.dataset.city]).click());
  });
})();
