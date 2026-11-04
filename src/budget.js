/* Cálculo local. Los importes son CAD; el hotel de Montreal se recibe por estancia. */
(function (root) {
  const round = n => Math.round((n + Number.EPSILON) * 100) / 100;
  const localTransportPerPerson = 147.73;
  const requiredRoute = [
    {id:'quebec-hotel',name:'Alojamiento Quebec · 4 noches',category:'Alojamiento',day:13},
    {id:'ottawa-hotel',name:'Alojamiento Ottawa · 2 noches',category:'Alojamiento',day:17},
    {id:'quebec-ottawa',name:'Tren Quebec–Ottawa',category:'Transporte',day:17},
    {id:'ottawa-montreal',name:'Tren Ottawa–Montreal',category:'Transporte',day:19},
    {id:'tremblant-tour',name:'Tremblant · excursión y esquí por resolver',category:'Experiencias',day:23}
  ];
  function routeItems(items) {
    const required = requiredRoute.map(spec => ({...spec, ...items.find(i => i.id === spec.id), ...spec, selected:true, people:2}));
    return [...items.filter(i => !requiredRoute.some(r => r.id === i.id)), ...required];
  }
  function calculate({fx = 13, fxBuffer = .05, montrealHotelTotal = null, mealExtra = 0, items = []} = {}) {
    if (!Number.isFinite(fxBuffer) || fxBuffer < 0 || fxBuffer > .08) throw new Error('Holgura inválida');
    if (!Number.isFinite(fx) || fx <= 0 || !Number.isFinite(mealExtra) || mealExtra < 0) throw new Error('Importes inválidos');
    if (montrealHotelTotal !== null && (!Number.isFinite(montrealHotelTotal) || montrealHotelTotal < 0)) throw new Error('Hotel inválido');
    const categories = {Alojamiento: 0, Comidas: (650 + mealExtra * 13) * 2, Transporte: (120 + localTransportPerPerson) * 2, 'Ropa, seguro y datos': 405 * 2, Experiencias: 0, Aniversario: 0};
    const pending = [];
    if (montrealHotelTotal === null) pending.push('Alojamiento Montreal · 6 noches');
    else categories.Alojamiento += montrealHotelTotal;
    routeItems(items).filter(i => i.selected).forEach(i => {
      if (![1, 2].includes(i.people)) throw new Error('Cantidad de personas inválida');
      if (i.amount === null || i.amount === '' || !Number.isFinite(Number(i.amount))) { pending.push(i.name); return; }
      if (Number(i.amount) < 0) throw new Error('Importe negativo');
      categories[i.category] = (categories[i.category] || 0) + Number(i.amount) * i.people;
    });
    const subtotal = round(Object.values(categories).reduce((a,b) => a+b,0) / 2);
    const reserve = round(subtotal * .1);
    const totalCAD = round(subtotal + reserve);
    const effectiveFx = round(fx * (1 + fxBuffer));
    const baseMXN = round(totalCAD * fx);
    const perPerson = round(totalCAD * effectiveFx);
    const fxIncrement = round(perPerson - baseMXN);
    return {categories, pending, isPartial: pending.length > 0, subtotal, reserve, totalCAD, perPerson, couple: round(perPerson * 2), daily: round(perPerson / 13), excess: round(perPerson - 39000), fx, fxBuffer, effectiveFx, baseMXN, fxIncrement};
  }
  root.TravelBudget = {calculate, routeItems, requiredRoute};
  if (typeof module !== 'undefined') module.exports = {calculate, routeItems, requiredRoute};
})(typeof window === 'undefined' ? globalThis : window);
