(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const mx = (n, digits=0) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:digits,maximumFractionDigits:digits}).format(n);
  const cad = n => new Intl.NumberFormat('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  const approx = n => '≈ '+mx(Math.round(n/100)*100);
  const photos=JSON.parse($('photo-data').textContent);
  const daily=JSON.parse($('daily-data').textContent).diario;
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error',()=>img.closest('figure')?.classList.add('failed'));
    if(img.dataset.photo && photos[img.dataset.photo]) img.src=photos[img.dataset.photo];
    if(img.complete && img.currentSrc && !img.naturalWidth) img.closest('figure')?.classList.add('failed');
  });
  const tabs=Array.from(document.querySelectorAll('[role=tab]'));
  const panels=Array.from(document.querySelectorAll('[role=tabpanel]'));
  const itinerary=$('recorrido');
  const viewButtons=Array.from(document.querySelectorAll('[data-itinerary-view]'));
  const dateTabs=itinerary.querySelector('.date-tabs');
  let view='day';
  let listDetails=[];
  let active=0;
  function selectDay(index, focus=false) {
    active=Math.max(0,Math.min(tabs.length-1,index));
    tabs.forEach((tab,i)=>{
      tab.setAttribute('aria-selected',String(i===active));
      tab.tabIndex=i===active?0:-1;
      panels[i].hidden=view==='day'&&i!==active;
      panels[i].setAttribute('role',view==='list'?'region':'tabpanel');
      panels[i].setAttribute('aria-labelledby',view==='list'?`day-title-${i+13}`:tab.id);
    });
    if(focus) (view==='list'?panels[active]:tabs[active]).focus();
  }
  function setView(next) {
    if(next===view) return;
    view=next;
    itinerary.classList.toggle('list-view',view==='list');
    dateTabs.hidden=view==='list';
    viewButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.itineraryView===view)));
    if(view==='list') {
      listDetails=Array.from(itinerary.querySelectorAll('.practical')).filter(detail=>!detail.open);
      listDetails.forEach(detail=>detail.open=true);
    } else {
      listDetails.forEach(detail=>detail.open=false);
      listDetails=[];
    }
    $('view-help').textContent=view==='list'?'Los 13 días seguidos, con actividades y transportes.':'Una fecha a la vez, con fotografías grandes.';
    selectDay(active);
    $('itinerary-views').scrollIntoView({block:'start'});
  }
  viewButtons.forEach(button=>button.addEventListener('click',()=>setView(button.dataset.itineraryView)));
  $('itinerary-views').hidden=false;
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>selectDay(i));
    tab.addEventListener('keydown',event=>{
      const keys={ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
      if(event.key in keys){event.preventDefault();selectDay(keys[event.key],true);}
    });
  });
  document.querySelectorAll('[data-day-target]').forEach(button=>button.addEventListener('click',()=>{
    selectDay(Number(button.dataset.dayTarget)-13,true);
    if(view==='list') panels[active].scrollIntoView({block:'start'});
    else if(button.closest('.overview')) $('recorrido').scrollIntoView({block:'start'});
  }));
  selectDay(0);
  const rows=Array.from(document.querySelectorAll('.budget-options tbody tr'));
  function collectItems(){return rows.map(row=>({name:row.dataset.name,category:row.dataset.category,amount:row.querySelector('.cost-input')?.value ?? Number(row.dataset.amount),people:Number(row.querySelector('.people').value),selected:row.querySelector('.option-check').checked,day:Number(row.dataset.day),id:row.dataset.id}));}
  function renderBudget(){
    const baseFx=Number($('fx').value),fxBuffer=Number($('fx-buffer').value);
    const fx=Math.round(baseFx*(1+fxBuffer)*100)/100;
    if(!$('fx').value || !$('fx').checkValidity()){$('input-error').textContent='Introduce un tipo de cambio válido entre 1 y 100 MXN por CAD. Se conserva el último cálculo válido.';$('input-error').hidden=false;return;}
    rows.forEach(row=>{const selected=row.querySelector('.option-check').checked;const cost=row.querySelector('.cost-input');if(cost)cost.disabled=!selected;row.querySelector('.people').disabled=!selected || TravelBudget.requiredRoute.some(r=>r.id===row.dataset.id);});
    const invalid=rows.find(row=>row.querySelector('.option-check').checked && row.querySelector('.cost-input') && !row.querySelector('.cost-input').checkValidity());
    if(invalid){$('input-error').textContent='Revisa el importe de '+invalid.dataset.name+': debe ser un número no negativo, con hasta dos decimales.';$('input-error').hidden=false;return;}
    if(!$('hotel-scenario').checkValidity()){$('input-error').textContent='Introduce un total de alojamiento válido en CAD para seis noches.';$('input-error').hidden=false;return;}
    $('input-error').hidden=true;
    const items=TravelBudget.routeItems(collectItems()), hotelValue=$('hotel-scenario').value;
    const montrealHotelTotal=hotelValue===''?null:Number(hotelValue);
    const result=TravelBudget.calculate({fx:baseFx,fxBuffer,montrealHotelTotal,items});
    const partial=result.isPartial;
    const reserveLabel=partial?'Reserva · 10% sobre importe conocido':'Reserva · 10%';
    $('total-person').textContent=partial?'Total parcial':approx(result.perPerson);
    $('total-cad').textContent=partial?'Faltan importes de la ruta · consulta los pendientes': 'MXN · ≈ '+Math.round(result.totalCAD).toLocaleString('es-MX')+' CAD por persona';
    $('mobile-total').textContent=partial?'Total parcial':approx(result.perPerson)+' / persona (promedio)';
    $('mobile-pending').textContent=partial?result.pending.length+' importe(s) pendiente(s)':'Escenario · sin vuelos';
    $('total-couple').textContent=partial?'Total parcial':approx(result.couple)+' MXN';
    const diff=result.daily-3000;
    $('comparison').textContent=partial?'El promedio final queda pendiente hasta cotizar los conceptos seleccionados de la nueva ruta.':'Promedio de '+mx(result.daily)+'/persona/día; '+mx(Math.abs(diff))+(diff>=0?' por encima':' por debajo')+' de la referencia flexible.';
    const base=[['Quebec · 4 noches',null],['Montreal · 6 noches',montrealHotelTotal===null?null:montrealHotelTotal/2],['Comidas · 13 días',650],['Tren Montreal–Quebec · 13 feb',120],['Transporte local · provisión por revisar',147.73],['Ropa, seguro y datos/lavandería',405]];
    $('base-costs').innerHTML=base.map(([name,value])=>`<div class="base-row"><span>${name}<small class="original-price">${value===null?'Por cotizar':cad(value)+' CAD / persona'}</small></span><strong>${value===null?'Pendiente':mx(value*fx)}</strong></div>`).join('');
    const names={Alojamiento:'Alojamiento',Comidas:'Comidas',Transporte:'Transporte','Ropa, seguro y datos':'Ropa, seguro y datos',Experiencias:'Experiencias',Aniversario:'Aniversario'};
    $('category-totals').innerHTML='<p class="fine">Subtotales por persona · MXN</p>'+Object.entries(result.categories).map(([name,value])=>{const unpriced=items.some(i=>i.selected&&i.category===name&&(i.amount===''||i.amount===null));const hotelPending=name==='Alojamiento'&&montrealHotelTotal===null;return `<div class="base-row"><span>${names[name]||name}</span><strong>${unpriced&&value===0?'Por cotizar':mx(value/2*fx)+(unpriced||hotelPending?' + pendiente':'')}</strong></div>`;}).join('')+`<div class="base-row"><span>${reserveLabel}</span><strong>${mx(result.reserve*fx)}</strong></div>`;
    $('pending-costs').replaceChildren();
    const warning=document.createElement('strong');
    warning.textContent=partial?'Total parcial: faltan '+result.pending.length+' importes.':'Todos los conceptos seleccionados tienen importe de planificación.';
    $('pending-costs').append(warning);
    if(result.pending.length){const list=document.createElement('ul');result.pending.forEach(name=>{const li=document.createElement('li');li.textContent=name;list.append(li);});$('pending-costs').append(list);}
    const caption=document.createElement('p');caption.textContent='Los importes nuevos se capturan con sus impuestos; no son reservas. Quebec y Ottawa se ingresan por persona y estancia; el tour Tremblant por persona e integral; Montreal por habitación y seis noches.';$('pending-costs').append(caption);
    $('exact-total').innerHTML=`<p class="fine">${partial?'Importe conocido, no total final: ':''}subtotal ${cad(result.subtotal)} CAD/persona + reserva ${cad(result.reserve)} CAD = ${cad(result.totalCAD)} CAD/persona. Cambio base ${baseFx} + ${fxBuffer*100}% de holgura = ${fx} MXN/CAD: ${mx(result.perPerson,2)}/persona y ${mx(result.couple,2)}/pareja.</p>`;
    $('fx-breakdown').textContent='Cambio base '+baseFx+' MXN/CAD; protegido '+fx+' MXN/CAD. Incremento cambiario sobre importe conocido: '+mx(result.fxIncrement,2)+'/persona. Reserva operativa del 10% aplicada una sola vez en CAD.';
    rows.forEach((row,i)=>{
      const item=items.find(item=>item.id===row.dataset.id);
      const value=item.amount;
      row.querySelector('.option-mxn').textContent=value===null||value===''?'Pendiente de importe':mx(Number(value)*fx)+' MXN / persona';
      const amount=row.querySelector('.cost-input');if(amount) amount.disabled=!item.selected;
      row.querySelector('.people').disabled=!item.selected || TravelBudget.requiredRoute.some(r=>r.id===item.id);
    });
    const priced=i=>i.amount!==''&&i.amount!==null&&Number.isFinite(Number(i.amount));
    const selected=items.filter(i=>i.selected);
    $('daily-costs').innerHTML=daily.map(d=>{
      const day=Number(d.fecha.slice(-2));
      let amount=(Number.isFinite(d.hotel_CAD_pp)?d.hotel_CAD_pp:0)+d.comidas_CAD_pp+d.tren_CAD_pp+d.local_CAD_pp;
      let dayPending=day>=19&&day<=24&&montrealHotelTotal===null;
      if(day>=19&&day<=24&&montrealHotelTotal!==null)amount+=montrealHotelTotal/2/6;
      selected.forEach(i=>{
        const applies=i.id==='foodextra'||(i.id==='quebec-hotel'?(day>=13&&day<=16):i.id==='ottawa-hotel'?(day===17||day===18):i.day===day);
        if(!applies)return;
        if(!priced(i)){dayPending=true;return;}
        const divisor=i.id==='foodextra'?13:i.id==='quebec-hotel'?4:i.id==='ottawa-hotel'?2:1;
        amount+=Number(i.amount)*i.people/2/divisor;
      });
      const total=amount*fx,excess=Math.max(0,total-3000);
      const reasons={13:'Tren, llegada y noche de Carnaval',14:'Carnaval y Super Bowl',15:'Casco histórico de Quebec',16:'Museo y hockey',17:'Quebec–Ottawa y alojamiento',18:'Ottawa · segunda noche',19:'Tren Ottawa–Montreal y hotel',20:'Mont Royal y barrios · fin de semana',21:'Viejo Montreal',22:'Nuestro aniversario',23:'Tremblant · esquí por resolver',24:'Biodôme y Hochelaga',25:'Traslado directo a YUL'};
      const reason=reasons[day]||'Hotel, comidas y movilidad local';
      return `<tr class="${excess>0&&!dayPending?'over':''}"><th scope="row">${day} feb<span class="mobile-reason">${reason}</span></th><td>${dayPending?'Total parcial':mx(total)}</td><td>${dayPending?'—':excess>0?'+'+mx(excess):'—'}</td><td>${reason}${dayPending?' · importes pendientes':''}</td></tr>`;
    }).join('');
    $('budget-live').textContent=partial?'Total parcial: '+result.pending.length+' importes pendientes.':'Escenario '+mx(result.perPerson)+' pesos por persona, '+mx(result.couple)+' por pareja.';

  }
  document.querySelectorAll('#presupuesto input,#presupuesto select').forEach(control=>control.addEventListener('input',renderBudget));
  $('reset-budget').addEventListener('click',()=>{
    $('fx').value='13';$('fx-buffer').value='.05';$('hotel-scenario').value='';
    rows.forEach(row=>{row.querySelector('.option-check').checked=row.dataset.default==='true';row.querySelector('.people').value='2';const input=row.querySelector('.cost-input');if(input)input.value='';});renderBudget();
  });
  renderBudget();
  $('print-plan').addEventListener('click',()=>window.print());
  let printDetails=[];
  window.addEventListener('beforeprint',()=>{
    panels.forEach(panel=>panel.hidden=false);
    printDetails=[...document.querySelectorAll('details')].filter(detail=>!detail.open);
    printDetails.forEach(detail=>detail.open=true);
  });
  window.addEventListener('afterprint',()=>{
    printDetails.forEach(detail=>detail.open=false);
    printDetails=[];selectDay(active);
  });
})();
