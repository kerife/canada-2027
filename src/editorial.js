/* Progressive presentation enhancements; budget formulas remain in app.js. */
(() => {
  'use strict';
  const ui=(tag,className,text)=>{
    const node=document.createElement(tag);node.className=className;node.dataset.editorialUi='';
    if(text)node.textContent=text;return node;
  };
  const hero=document.querySelector('.hero-copy');
  const paragraphs=hero.querySelectorAll(':scope>p');
  const brand=ui('p','hero-brand','Kevin & Ariadna');
  hero.prepend(brand);
  const jump=ui('button','button hero-jump','Saltar al itinerario →');jump.type='button';
  jump.addEventListener('click',()=>{document.getElementById('recorrido').scrollIntoView({block:'start'});document.getElementById('tab-13').focus({preventScroll:true});});
  paragraphs[1].after(jump);
  const note=document.createElement('details');note.className='hero-context';
  note.append(ui('summary','','Nuestro viaje, en pocas palabras'));
  [paragraphs[2],hero.querySelector('.hero-actions'),paragraphs[3]].forEach(n=>note.append(n));
  hero.append(note);
  const nav=document.querySelector('.topbar nav');
  const sectionLinks=[...nav.querySelectorAll('a')];
  const sections=sectionLinks.map(a=>document.querySelector(a.getAttribute('href')));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)sectionLinks.forEach(a=>{
      if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });});
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
    tab.setAttribute('aria-label',tab.textContent.replace(/\s+/g,' ').trim()+' · febrero');
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
  let openedForList=[];
  document.querySelectorAll('[data-itinerary-view]').forEach(button=>button.addEventListener('click',()=>{
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
})();
