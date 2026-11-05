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
      time.textContent=text.slice(match.index).replace(/^\s*·\s*/,' ');const clock=time.textContent.match(/\d{1,2}:\d{2}/)[0];
      time.dateTime=`2027-02-${old.closest('.activity-card').dataset.day}T${clock.padStart(5,'0')}:00-05:00`;row.append(time);
    }else heading.textContent=text;
    old.remove();
  });
  document.querySelectorAll('.activity-card').forEach(card=>{
    const story=card.querySelector('.place-story');const practical=card.querySelector('.practical');const companion=card.querySelector('.companion');
    const detail=document.createElement('details');detail.className='stop-details';
    const summary=document.createElement('summary');summary.dataset.editorialUi='';summary.textContent='Ver detalles de esta parada';detail.append(summary);story.before(detail);
    [story,practical,companion].filter(Boolean).forEach(old=>{
      const label=old.querySelector(':scope>summary');const section=document.createElement('section');section.className='stop-subsection';
      const heading=document.createElement('h4');if(label.hasAttribute('data-editorial-ui'))heading.dataset.editorialUi='';
      while(label.firstChild)heading.append(label.firstChild);label.remove();section.append(heading);
      while(old.firstChild)section.append(old.firstChild);detail.append(section);old.remove();
    });
    detail.open=false;
    card.append(detail);
  });
  document.querySelectorAll('.photo-credit').forEach(caption=>{
    const text=caption.querySelector('.credit-text');if(!text)return;
    const label=document.createElement('span');label.className='visually-hidden';label.dataset.editorialUi='';label.textContent=caption.querySelector('.credit-disclosure>summary').textContent;
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
      const copy=document.createElement('span');copy.className='photo-credit__text';copy.append(content);
      anchor.replaceChildren(copy);anchor.title=anchor.textContent.replace(/\s+/g,' ').trim();caption.replaceChildren(label,anchor);
    }else {caption.replaceChildren(label,...text.childNodes);}
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
  const values=['total-person','total-couple'].map(id=>{
    const original=document.getElementById(id);const amount=document.createElement('p');amount.className='summary-amount';amount.dataset.editorialUi='';
    const missing=document.createElement('p');missing.className='summary-missing fine';missing.dataset.editorialUi='';original.after(amount,missing);return {amount,missing};
  });
  function showKnownAmounts(){
    // Reuse the already-rendered exact output, including its reserve and rounding.
    const exact=document.getElementById('exact-total').textContent.match(/: ([^:]+)\/persona y ([^:]+)\/pareja\.$/);
    const pending=document.querySelectorAll('#pending-costs li').length;
    values.forEach((view,index)=>{
      view.amount.textContent=exact?exact[index+1]:'—';
      view.missing.textContent=pending?`Faltan ${pending} conceptos por cotizar`:'Todos los conceptos seleccionados tienen importe.';
    });
  }
  new MutationObserver(showKnownAmounts).observe(document.getElementById('exact-total'),{childList:true,subtree:true});showKnownAmounts();
  document.querySelectorAll('.state-badge').forEach(badge=>{
    const text=badge.textContent;if(!text.startsWith('[')||!text.endsWith(']'))return;
    const opening=document.createElement('span'),label=document.createElement('span'),closing=document.createElement('span');
    opening.className=closing.className='visually-hidden';opening.textContent='[';closing.textContent=']';
    label.className='state-badge__label';label.textContent=text.slice(1,-1);badge.replaceChildren(opening,label,closing);
  });
  document.querySelectorAll('.hotel-card>.note-visual').forEach(panel=>{
    const copy=document.createElement('div');copy.className='hotel-placeholder-copy';
    while(panel.firstChild)copy.append(panel.firstChild);
    const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');icon.setAttribute('focusable','false');icon.classList.add('hotel-bed-icon');
    icon.innerHTML='<path d="M3 18V6m18 12v-7H3m0 4h18M7 11V7h5v4m0-4h5v4"/>';panel.append(icon,copy);
  });
  document.querySelectorAll('.hotel-body').forEach(body=>{
    const about=body.querySelector('.hotel-description'),quality=body.querySelector('.hotel-quality');
    const terms=[...body.querySelectorAll(':scope>details')].find(n=>n!==about&&n!==quality);
    const room=body.querySelector(':scope>p:not(.eyebrow):not(.fine)'),quote=body.querySelector(':scope>p.fine');
    const detail=document.createElement('details');detail.className='hotel-details';
    const summary=document.createElement('summary');summary.dataset.editorialUi='';summary.textContent='Ver detalles del alojamiento';detail.append(summary);about.before(detail);
    [about,quality,terms].forEach((old,index)=>{
      const section=document.createElement('section');section.className='hotel-subsection';const heading=document.createElement('h4');const label=old.querySelector(':scope>summary');
      if(label.hasAttribute('data-editorial-ui'))heading.dataset.editorialUi='';
      while(label.firstChild)heading.append(label.firstChild);label.remove();section.append(heading);
      if(index===0&&room)body.querySelector('h3').after(room);if(index===2&&quote)section.append(quote);
      while(old.firstChild)section.append(old.firstChild);detail.append(section);old.remove();
    });
    const price=body.querySelector('.price');const badge=price.nextElementSibling;
    const line=document.createElement('div');line.className='hotel-price-line';price.before(line);line.append(price);
    if(badge?.classList.contains('state-badge'))line.append(badge);
  });
  document.querySelectorAll('.hotel-card meter').forEach((meter,index)=>{
    const group=document.createElement('div');group.className='hotel-meter';group.dataset.editorialUi='';
    const label=document.createElement('label');meter.id='hotel-coverage-'+index;label.htmlFor=meter.id;
    label.textContent=`Cobertura de datos · ${meter.value}%`;
    meter.setAttribute('aria-label','Cobertura de datos · '+meter.closest('.hotel-card').querySelector('h3').textContent);
    meter.setAttribute('aria-valuemin',String(meter.min));meter.setAttribute('aria-valuemax',String(meter.max));meter.setAttribute('aria-valuenow',String(meter.value));
    meter.setAttribute('aria-valuetext',`${meter.value}% de cobertura de datos`);
    const heading=meter.closest('.hotel-subsection').querySelector('h4');heading.after(group);group.append(label,meter);
  });

  // One presentation owner for disclosure, navigation and known-cost summaries.
  const itinerary=document.getElementById('recorrido');
  const heading=itinerary.querySelector('.section-head');
  const info=document.createElement('details');info.className='itinerary-info';
  const infoTitle=document.createElement('summary');infoTitle.dataset.editorialUi='';infoTitle.textContent='Información del itinerario';info.append(infoTitle);
  info.append(heading.querySelector(':scope>p'),heading.nextElementSibling);
  info.append(document.getElementById('actualizacion'));
  itinerary.querySelector('.itinerary-dock').after(info);
  function revealInformation(){
    const target=document.getElementById(location.hash.slice(1));
    if(target&&info.contains(target)){info.open=true;target.scrollIntoView({block:'start'});}
  }
  addEventListener('hashchange',revealInformation);revealInformation();
  const stopDetails=[...itinerary.querySelectorAll('.stop-details')];
  const states={day:new Set(),list:new Set()};let view='day',restoring=false,printing=false;
  function scrollAgenda(){
    // A sticky toolbar's visual rectangle is not its place in the document.
    const margin=parseFloat(getComputedStyle(heading).marginBottom)||0;
    const top=heading.getBoundingClientRect().bottom+scrollY+margin-document.querySelector('.topbar').offsetHeight-12;
    scrollTo({top,behavior:'instant'});
  }
  function remember(){states[view]=new Set(stopDetails.filter(n=>n.open));}
  function restore(){restoring=true;stopDetails.forEach(n=>n.open=states[view].has(n));queueMicrotask(()=>restoring=false);}
  stopDetails.forEach(n=>n.addEventListener('toggle',()=>{if(!restoring&&!printing)remember();}));
  const actions=document.createElement('div');actions.className='list-actions';actions.dataset.editorialUi='';actions.hidden=true;
  [['Expandir todos los detalles',true],['Contraer todos',false]].forEach(([text,open])=>{
    const button=document.createElement('button');button.type='button';button.textContent=text;
    button.addEventListener('click',()=>{states.list=new Set(open?stopDetails:[]);restore();});actions.append(button);
  });
  info.after(actions);
  itinerary.querySelectorAll('.day-header').forEach(header=>{
    const copy=header.querySelector('p:not(.eyebrow)');if(!copy)return;
    const context=document.createElement('section');context.className='stop-subsection day-context';
    const label=document.createElement('h4');label.dataset.editorialUi='';label.textContent='Contexto del día';context.append(label,copy);
    header.closest('.print-day').querySelector('.stop-details').append(context);
  });
  stopDetails.forEach(detail=>{
    const practical=detail.querySelectorAll(':scope>.stop-subsection')[1];
    const copy=practical?.querySelector('p');if(!copy)return;
    const logistics=document.createElement('p');logistics.className='stop-logistics';logistics.dataset.editorialUi='';
    const text=copy.textContent.replace(/[\[\]]/g,'');
    logistics.textContent=text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim()||text;
    detail.closest('.activity-card').querySelector('.activity-body').append(logistics);
  });
  document.querySelectorAll('[data-itinerary-view]').forEach(button=>button.addEventListener('click',()=>{
    const next=button.dataset.itineraryView;if(next===view)return;
    remember();view=next;restore();actions.hidden=view!=='list';
    if(view==='list')scrollAgenda();else itinerary.scrollIntoView({block:'start',behavior:'instant'});
  }));
  window.addEventListener('beforeprint',()=>{printing=true;});
  // app.js restores its synchronous DOM snapshot; only then remember that state.
  window.addEventListener('afterprint',()=>{remember();setTimeout(()=>{printing=false;},0);});
  const header=document.querySelector('.topbar');
  new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${Math.ceil(header.getBoundingClientRect().height)}px`)).observe(header);
  document.querySelector('.hero-brand').classList.add('visually-hidden');
  document.querySelectorAll('.topbar a[href="#recorrido"]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();history.replaceState(null,'','#recorrido');
    if(view==='list')scrollAgenda();else itinerary.scrollIntoView({block:'start',behavior:'instant'});
  }));
  document.querySelectorAll('.hotel-description').forEach(n=>n.removeAttribute('open'));
  document.querySelectorAll('.hotel-details .hotel-subsection:first-of-type').forEach(section=>{
    const description=section.querySelector('p');if(!description)return;
    const preview=document.createElement('p');preview.className='hotel-preview';preview.dataset.editorialUi='';
    preview.textContent=description.textContent.match(/^.*?[.!?](?:\s|$)/)?.[0].trim()||description.textContent;
    section.closest('.hotel-body').querySelector('h3').nextElementSibling.after(preview);
  });
  const budget=document.getElementById('presupuesto'),layout=budget.querySelector('.budget-layout');
  const summary=document.getElementById('budget-summary');layout.prepend(summary);
  const breakdown=document.createElement('details');breakdown.className='summary-breakdown';
  const breakdownTitle=document.createElement('summary');breakdownTitle.dataset.editorialUi='';breakdownTitle.textContent='Desglose y pendientes';breakdown.append(breakdownTitle);
  ['total-cad','comparison','category-totals','pending-costs'].forEach(id=>breakdown.append(document.getElementById(id)));
  breakdown.append(summary.querySelector(':scope>details'));
  summary.querySelector('#reset-budget').before(breakdown);
  const explanation=document.createElement('details');explanation.className='budget-explanation-details';
  const explanationTitle=document.createElement('summary');explanationTitle.dataset.editorialUi='';explanationTitle.textContent='Supuestos y alcance del presupuesto';explanation.append(explanationTitle);
  budget.querySelectorAll('.budget-head>p:not(.eyebrow)').forEach(p=>explanation.append(p));
  const form=layout.querySelector(':scope>div');form.prepend(explanation);
  const bar=budget.querySelector('.mobile-budget');
  bar.querySelector('.reserve-hint').classList.add('visually-hidden');
  const mobileOriginal=document.getElementById('mobile-total');mobileOriginal.classList.add('visually-hidden');
  const mobileAmount=document.createElement('strong');mobileAmount.className='mobile-known';mobileAmount.dataset.editorialUi='';mobileOriginal.after(mobileAmount);
  const perPerson=document.createElement('span');perPerson.className='mobile-known-label';perPerson.dataset.editorialUi='';perPerson.textContent='Conocido / persona · MXN';mobileAmount.before(perPerson);
  const barLink=bar.querySelector('a');barLink.textContent='Ver detalle';
  function syncKnownSummary(){mobileAmount.textContent=values[0].amount.textContent||'—';}
  new MutationObserver(syncKnownSummary).observe(values[0].amount,{childList:true});syncKnownSummary();
  const narrow=matchMedia('(max-width:1023px)');let frame;
  function updateBar(){
    frame=null;const b=budget.getBoundingClientRect(),s=summary.getBoundingClientRect();
    const headerHeight=header.getBoundingClientRect().height;
    const summaryVisible=s.bottom>headerHeight&&s.top<innerHeight;
    const visible=narrow.matches&&b.top<innerHeight&&b.bottom>headerHeight&&!summaryVisible;
    bar.classList.toggle('is-visible',visible);
    budget.style.setProperty('--budget-bar-space',visible?`${bar.offsetHeight}px`:'0px');
  }
  function scheduleBar(){if(!frame)frame=requestAnimationFrame(updateBar);}
  addEventListener('scroll',scheduleBar,{passive:true});addEventListener('resize',scheduleBar);narrow.addEventListener('change',scheduleBar);
  new ResizeObserver(scheduleBar).observe(summary);new ResizeObserver(scheduleBar).observe(bar);scheduleBar();
})();
