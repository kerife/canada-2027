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
  document.querySelectorAll('.photo-credit').forEach(caption=>{
    const text=caption.querySelector('.credit-text');if(!text)return;
    let anchor=text.querySelector('a');
    if(!anchor){
      const alt=caption.closest('figure').querySelector('img')?.alt;
      const credits=[...document.querySelectorAll('.credits-list li')];const name=text.textContent.split(' · ')[0].trim();
      const credit=credits.find(item=>item.textContent.startsWith(alt))||credits.find(item=>item.textContent.includes(name));
      const source=credit?.querySelector('a[href]');
      if(source){anchor=document.createElement('a');anchor.href=source.href;anchor.target='_blank';anchor.rel='noopener noreferrer';anchor.dataset.addedCredit='';}
    }
    if(anchor){
      const content=document.createDocumentFragment();
      [...text.childNodes].forEach(node=>{if(node===anchor){while(node.firstChild)content.append(node.firstChild);}else content.append(node);});
      anchor.replaceChildren(content);anchor.title=anchor.textContent.replace(/\s+/g,' ').trim();caption.replaceChildren(anchor);
    }else {caption.replaceChildren(...text.childNodes);}
  });
  document.querySelectorAll('#actualizacion .review-decision').forEach(detail=>{
    detail.classList.add('review-stop');detail.open=true;
    const summary=detail.querySelector(':scope>summary');const body=document.createElement('div');body.className='review-stop-body';
    while(summary.nextSibling)body.append(summary.nextSibling);detail.append(body);
  });
  document.querySelectorAll('.hotel-body .price').forEach(price=>{
    if(!/pendiente|por cotizar|por confirmar/i.test(price.textContent))return;
    price.classList.add('pending-price');const badge=document.createElement('span');badge.className='state-badge';badge.dataset.states='pending';badge.dataset.editorialUi='';badge.textContent='[Pendiente de confirmar]';price.after(badge);
  });
})();
