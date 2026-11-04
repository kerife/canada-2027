/* Progressive presentation enhancements; budget formulas remain in app.js. */
(() => {
  'use strict';
  const ui=(tag,className,text)=>{
    const node=document.createElement(tag);node.className=className;node.dataset.editorialUi='';
    if(text)node.textContent=text;return node;
  };
  const jump=document.querySelector('.hero-jump');
  jump.addEventListener('click',()=>{document.getElementById('recorrido').scrollIntoView({block:'start'});document.getElementById('tab-13').focus({preventScroll:true});});
  const nav=document.querySelector('.topbar nav');
  const sectionLinks=[...nav.querySelectorAll('a')];
  const sections=sectionLinks.map(a=>document.querySelector(a.getAttribute('href')));
  const observer=new IntersectionObserver(()=>{
    const current=sections.filter(section=>{const r=section.getBoundingClientRect();return r.top<innerHeight*.5&&r.bottom>72;}).at(-1);
    sectionLinks.forEach(a=>{if(current&&a.hash==='#'+current.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  },{rootMargin:'-15% 0px -55% 0px'});
  sections.forEach(s=>observer.observe(s));
  const itinerary=document.getElementById('recorrido');
  const dock=document.createElement('div');dock.className='itinerary-dock';
  const toolbar=document.getElementById('itinerary-views');
  toolbar.before(dock);dock.append(toolbar,itinerary.querySelector('.date-tabs'));
  const location=ui('div','route-position');location.setAttribute('aria-label','Base del día seleccionado');
  ['Quebec','Ottawa','Montreal'].forEach(city=>{const label=ui('span','',city);label.dataset.city=city;location.append(label);});
  toolbar.append(location);
  const tabs=[...document.querySelectorAll('[role=tab]')];
  function updatePosition(){
    const active=tabs.find(t=>t.getAttribute('aria-selected')==='true');
    const day=Number(active.id.replace('tab-',''));const city=day<17?'Quebec':day<19?'Ottawa':'Montreal';
    location.querySelectorAll('span').forEach(n=>n.toggleAttribute('data-active',n.dataset.city===city));
    const strip=active.parentElement;
    if(active.offsetLeft<strip.scrollLeft)strip.scrollLeft=active.offsetLeft;
    else if(active.offsetLeft+active.offsetWidth>strip.scrollLeft+strip.clientWidth)strip.scrollLeft=active.offsetLeft+active.offsetWidth-strip.clientWidth;
  }
  tabs.forEach(tab=>{
    tab.removeAttribute('aria-label');
    new MutationObserver(updatePosition).observe(tab,{attributes:true,attributeFilter:['aria-selected']});
  });
  updatePosition();
  document.querySelectorAll('.activity-card').forEach(card=>{
    const body=card.querySelector('.activity-body');
    const intro=body.querySelector('.place-intro');
    const preview=ui('p','place-preview',intro.textContent.match(/^.*?[.!?](?:\s|$)/)?.[0].trim()||intro.textContent);
    body.querySelector('h4').after(preview);
    const story=document.createElement('details');story.className='place-story';
    story.append(ui('summary','','Descubrir esta parada'));
    body.querySelector('.slot-duration').after(story);
    story.append(intro,body.querySelector('.place-highlights'),body.querySelector('.story-sources'));
    const practical=body.querySelector('.practical');
    const meta=practical.querySelector('.activity-meta');const status=practical.querySelector('.evidence');
    story.before(meta,status);
  });
  let openedForList=[];let previousView='day';
  document.querySelectorAll('[data-itinerary-view]').forEach(button=>button.addEventListener('click',()=>{
    if(previousView===button.dataset.itineraryView)return;
    previousView=button.dataset.itineraryView;
    if(button.dataset.itineraryView==='list'){
      openedForList=[...document.querySelectorAll('.place-story')].filter(n=>!n.open);openedForList.forEach(n=>n.open=true);
    }else{openedForList.forEach(n=>n.open=false);openedForList=[];}
  }));
  // Wrap exact evidence strings. Icons are CSS so textContent stays identical.
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(node){
    return node.parentElement.closest('script,style,[data-editorial-ui],.state-badge')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
  }});
  const texts=[];while(walker.nextNode())texts.push(walker.currentNode);
  texts.forEach(node=>{
    const pattern=/\[(?:Confirmado publicado|Sujeto a cambio|Estimado|Pendiente de confirmar|Propuesto|Plan base)[^\]]*\]/g;
    const matches=[...node.textContent.matchAll(pattern)];if(!matches.length)return;
    const frag=document.createDocumentFragment();let start=0;
    matches.forEach(match=>{
      frag.append(node.textContent.slice(start,match.index));const badge=document.createElement('span');badge.className='state-badge';
      const families=[['Confirmado publicado','confirmed'],['Sujeto a cambio','change'],['Estimado','estimated'],['Pendiente de confirmar','pending'],['Propuesto','proposed'],['Plan base','proposed']];
      badge.dataset.states=families.filter(([label])=>match[0].includes(label)).map(([,state])=>state).join(' ');
      badge.textContent=match[0];frag.append(badge);start=match.index+match[0].length;
    });frag.append(node.textContent.slice(start));node.replaceWith(frag);
  });
  document.querySelectorAll('figcaption.photo-credit').forEach(caption=>{
    const details=document.createElement('details');details.className='credit-disclosure';
    details.append(ui('summary','','Crédito de fotografía'));
    const text=document.createElement('div');text.className='credit-text';
    while(caption.firstChild)text.append(caption.firstChild);details.append(text);caption.append(details);
  });
  document.querySelectorAll('a.source').forEach((link,index)=>{
    const context=link.closest('.activity-card,.hotel-card,.transport,.restaurant,.sources-grid>div');
    const heading=context?.querySelector('h3,h4,.period,strong');
    link.setAttribute('aria-label',link.textContent.trim()+': '+(heading?.textContent.trim()||'fuentes del viaje')+' · enlace '+(index+1));
  });
  const review=document.getElementById('actualizacion');
  review.querySelectorAll('details').forEach(d=>d.open=false);
  const reviewGrid=review.querySelector('.prep-grid');
  const reviewArticles=[...reviewGrid.querySelectorAll('article')];
  reviewArticles.forEach(article=>{
    const detail=document.createElement('details');detail.className='review-decision';
    const summary=document.createElement('summary');summary.append(article.querySelector('h3'));detail.append(summary);
    while(article.firstChild)detail.append(article.firstChild);article.replaceWith(detail);
  });
  const family=reviewGrid.children[1];
  reviewGrid.after(family);
  const calendar=[...review.querySelectorAll('details')].find(d=>d.querySelector('summary')?.textContent==='Calendario de compra y ventanas de entradas');
  calendar.classList.add('review-decision');reviewGrid.append(calendar);
  document.querySelectorAll('.table-scroll').forEach(n=>{n.tabIndex=0;n.setAttribute('role','region');n.setAttribute('aria-label','Tabla de '+(n.closest('details')?.querySelector('summary')?.textContent||'planificación'));});
  document.querySelectorAll('.hotel-card').forEach(card=>{
    const body=card.querySelector('.hotel-body');
    const evidence=body.querySelector('.evidence');
    const quality=document.createElement('details');quality.className='hotel-quality';
    quality.append(ui('summary','','Calidad de los datos'));evidence.before(quality);quality.append(evidence);
    const coverage=evidence.textContent.match(/cobertura\s+(\d+)%/i);
    if(coverage){const meter=ui('meter','');meter.min=0;meter.max=100;meter.value=Number(coverage[1]);meter.setAttribute('aria-label',evidence.textContent);quality.querySelector('summary').append(meter);}
    const paragraphs=[...body.querySelectorAll(':scope>p')];
    const description=paragraphs.find(p=>p.hasAttribute('style'));
    if(description){const more=document.createElement('details');more.className='hotel-description';more.append(ui('summary','','Sobre este alojamiento'));description.before(more);more.append(description);}
  });
  const budget=document.getElementById('presupuesto');
  let previous='';
  budget.querySelectorAll('.budget-options tbody tr').forEach(row=>{
    if(row.dataset.category!==previous){
      const group=ui('tr','budget-group');const cell=ui('td','',row.dataset.category);cell.colSpan=3;group.append(cell);row.before(group);previous=row.dataset.category;
    }
    const note=row.querySelector('.option-note');const source=row.querySelector('a.source');
    const detail=document.createElement('details');detail.className='option-evidence';detail.append(ui('summary','','Evidencia y condiciones'));note.before(detail);detail.append(note,source);
    const select=row.querySelector('.people');
    const stepper=document.createElement('div');stepper.className='people-stepper';select.before(stepper);
    const minus=ui('button','step-minus','−'),plus=ui('button','step-plus','+');minus.type=plus.type='button';
    minus.setAttribute('aria-label','Disminuir personas: '+row.dataset.name);plus.setAttribute('aria-label','Aumentar personas: '+row.dataset.name);
    stepper.append(minus,select,plus);
    function sync(){minus.disabled=select.disabled||select.value==='1';plus.disabled=select.disabled||select.value==='2';}
    [minus,plus].forEach((button,index)=>button.addEventListener('click',()=>{select.value=String(Number(select.value)+(index?1:-1));select.dispatchEvent(new Event('input',{bubbles:true}));sync();}));
    new MutationObserver(sync).observe(select,{attributes:true,attributeFilter:['disabled']});
    budget.addEventListener('input',sync);document.getElementById('reset-budget').addEventListener('click',sync);sync();
  });
  const fixedBudget=budget.querySelector('.mobile-budget');
  new IntersectionObserver(entries=>entries.forEach(entry=>fixedBudget.classList.toggle('is-visible',entry.isIntersecting)),{threshold:0}).observe(budget);
  const prep=document.getElementById('preparativos');
  prep.querySelectorAll('.prep-grid article').forEach(article=>{
    const heading=article.querySelector('h3');const label=document.createElement('label');label.className='prep-check';
    const checkbox=ui('input','');checkbox.type='checkbox';checkbox.setAttribute('aria-label','Marcar como revisado: '+heading.textContent);
    heading.before(label);label.append(checkbox,heading);
  });
  const sourceWrap=document.querySelector('#fuentes>.wrap');const sources=sourceWrap.querySelector(':scope>details');
  const credit=sources.querySelector('details');const licenses=credit.nextElementSibling?.nextElementSibling;
  if(credit)sourceWrap.append(credit);
  if(licenses?.tagName==='DETAILS')sourceWrap.append(licenses);
  document.querySelectorAll('.sources-grid h4').forEach(heading=>{
    const replacement=document.createElement('h3');replacement.textContent=heading.textContent;heading.replaceWith(replacement);
  });
  document.querySelector('.font-licenses').tabIndex=0;
  const reserveHint=ui('span','reserve-hint','Por persona · reserva del 10% incluida en los importes conocidos');fixedBudget.firstElementChild.append(reserveHint);
  const daily=document.getElementById('daily-costs');const chart=ui('div','daily-chart');daily.closest('table').after(chart);
  function drawChart(){
    const rows=[...daily.rows];
    if(rows.some(row=>row.cells[1].textContent.includes('parcial'))){chart.replaceChildren(ui('p','fine','La gráfica aparecerá cuando todos los días tengan importe. Consulta los pendientes en la tabla.'));return;}
    const values=rows.map(row=>Number(row.cells[1].textContent.replace(/[^\d.-]/g,'')));
    const max=Math.max(3000,...values);const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 680 200');svg.setAttribute('role','img');svg.setAttribute('aria-label','Gasto por día en MXN por persona. Cifras y justificaciones completas en la tabla anterior.');
    values.forEach((value,index)=>{
      const bar=document.createElementNS(ns,'rect');const height=value/max*160;
      Object.entries({x:12+index*51,y:170-height,width:34,height,fill:value>3000?'var(--accent)':'var(--ink)'}).forEach(([k,v])=>bar.setAttribute(k,v));
      const title=document.createElementNS(ns,'title');title.textContent=rows[index].cells[0].textContent+' · '+rows[index].cells[1].textContent;bar.append(title);svg.append(bar);
      const label=document.createElementNS(ns,'text');label.setAttribute('x',29+index*51);label.setAttribute('y','193');label.setAttribute('text-anchor','middle');label.textContent=String(index+13);svg.append(label);
    });
    const line=document.createElementNS(ns,'path');line.setAttribute('d',`M 8 ${170-3000/max*160} H 675`);line.setAttribute('stroke','var(--ink-muted)');line.setAttribute('stroke-dasharray','4 4');svg.append(line);
    chart.replaceChildren(ui('p','fine','Gasto por día · línea de referencia flexible: $3,000 MXN por persona'),svg);
  }
  new MutationObserver(drawChart).observe(daily,{childList:true});drawChart();
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-entered');reveal.unobserve(entry.target);}}),{threshold:.1});
  document.querySelectorAll('.activity-card').forEach(card=>reveal.observe(card));
})();
