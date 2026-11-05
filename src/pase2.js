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
  document.querySelectorAll('.activity-body>h4').forEach(old=>{
    const heading=document.createElement('h3');const row=document.createElement('div');row.className='stop-heading';
    const text=old.textContent;const match=text.match(/\s·\s(?=\d{1,2}:\d{2})| a las (?=\d{1,2}:\d{2})|\s(?=\d{1,2}:\d{2})/);
    old.before(row);row.append(heading);
    if(match){
      heading.textContent=text.slice(0,match.index);const time=document.createElement('time');
      time.textContent=text.slice(match.index);const clock=time.textContent.match(/\d{1,2}:\d{2}/)[0];
      time.dateTime=`2027-02-${old.closest('.activity-card').dataset.day}T${clock.padStart(5,'0')}:00-05:00`;row.append(time);
    }else heading.textContent=text;
    old.remove();
  });
  document.querySelectorAll('.activity-card').forEach(card=>{
    const story=card.querySelector('.place-story');const practical=card.querySelector('.practical');const companion=card.querySelector('.companion');
    const detail=document.createElement('details');detail.className='place-story practical stop-details';
    const summary=document.createElement('summary');summary.dataset.editorialUi='';summary.textContent='Ver detalles de esta parada';detail.append(summary);story.before(detail);
    [story,practical,companion].filter(Boolean).forEach(old=>{
      const label=old.querySelector(':scope>summary');const section=document.createElement('section');section.className='stop-subsection';
      const heading=document.createElement('h4');if(label.hasAttribute('data-editorial-ui'))heading.dataset.editorialUi='';
      while(label.firstChild)heading.append(label.firstChild);label.remove();section.append(heading);
      while(old.firstChild)section.append(old.firstChild);detail.append(section);old.remove();
    });
    detail.open=card.dataset.slot==='0';
  });
})();
