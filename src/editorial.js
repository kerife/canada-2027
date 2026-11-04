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
})();
