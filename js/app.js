/* © 2026 AusPropertyIQ. All rights reserved. */
const CATEGORIES = [
{
key: 'demandSupply',
label: 'Demand / Supply',
max: 30,
vals: s => `Vacancy: ${s.vac}%  ·  DSR: ${s.dsr}`,
breakdown: s => {
const sc = s.scores;
return `Vac ${s.vac}% → ${sc.vacancy}/15 pts &nbsp;|&nbsp; DSR ${s.dsr} → ${sc.dsr}/15 pts`;
},
},
{
key: 'growthDrivers',
label: 'Growth Drivers',
max: 20,
vals: s => `Infra/Jobs: ${s.infraJobs}  ·  Cycle: ${s.cycle}`,
breakdown: s => {
const sc = s.scores;
return `Infra/Jobs (${s.infraJobs}) → ${sc.infraJobs}/10 pts &nbsp;|&nbsp; ${s.cycle} cycle → ${sc.cycle}/10 pts`;
},
},
{
key: 'growthQuality',
label: 'Growth Quality',
max: 10,
vals: s => `Annual Growth: ${s.growth}%`,
breakdown: s => {
const sc = s.scores;
const cycleNote = (s.cycle==='Early'||s.cycle==='Early-Mid') ? 'Early cycle bonus' : 'sweet spot 15–25%';
return `Growth ${s.growth}% (${cycleNote}) → ${sc.growthQual}/10 pts`;
},
},
{
key: 'cashFlow',
label: 'Cash Flow',
max: 10,
vals: s => `Gross Yield: ${s.yield.toFixed(1)}%`,
breakdown: s => {
const sc = s.scores;
return `Yield ${s.yield.toFixed(1)}% → ${sc.yield_}/5 pts &nbsp;|&nbsp; Yield quality → ${sc.yieldQual}/5 pts`;
},
},
{
key: 'ownerOccTotal',
label: 'Owner Occupier',
max: 10,
vals: s => `DSR: ${s.dsr}  ·  Vacancy: ${s.vac}%`,
breakdown: s => {
const sc = s.scores;
return `DSR ${s.dsr} + Vac ${s.vac}% → ${sc.ownerOcc}/10 pts`;
},
},
{
key: 'riskControl',
label: 'Risk Control',
max: 5,
vals: s => `Cycle: ${s.cycle}  ·  Vacancy: ${s.vac}%`,
breakdown: s => {
const sc = s.scores;
return `Cycle risk → ${sc.cycleRisk}/3 pts &nbsp;|&nbsp; Market tightness → ${sc.vacRisk}/2 pts`;
},
},
{
key: 'marketQuality',
label: 'Market Quality',
max: 15,
vals: s => `City: ${s.city}  ·  Economy: ${s.infraJobs}`,
breakdown: s => {
const sc = s.scores;
return `Population (${s.city}) → ${sc.population}/8 pts &nbsp;|&nbsp; Diversification → ${sc.diversification}/7 pts`;
},
},
];
const DATA = MASTER_SUBURBS.map(s => ({ ...s, scores: scoreMasterSuburb(s) }));
let sortCol    = 'total';
let sortDir    = -1;
let gradeFilter = 'all';
const PAGE_HASH = { suburbs: '#suburb-score', table: '#suburb-table', pscore: '#property-score', ptable: '#property-table' };
const HASH_PAGE = { '#suburb-score': 'suburbs', '#suburb-table': 'table', '#property-score': 'pscore', '#property-table': 'ptable' };
const TAB_INDEX = { suburbs: 0, table: 1, pscore: 2, ptable: 3 };
function activatePage(page) {
document.getElementById('page-suburbs').style.display = page === 'suburbs' ? 'block' : 'none';
document.getElementById('page-table').style.display   = page === 'table'   ? 'block' : 'none';
document.getElementById('page-pscore').style.display  = page === 'pscore'  ? 'block' : 'none';
document.getElementById('page-ptable').style.display  = page === 'ptable'  ? 'block' : 'none';
document.querySelectorAll('.nav-tab').forEach((t, i) => {
t.classList.toggle('active', i === TAB_INDEX[page]);
});
window.scrollTo(0, 0);
if (page === 'table')  mtRender();
if (page === 'pscore') psRender();
if (page === 'ptable') ptRender();
}
function showPage(page) {
history.pushState({ page }, '', PAGE_HASH[page] || '#scores');
activatePage(page);
}
window.addEventListener('popstate', () => {
activatePage(HASH_PAGE[window.location.hash] || 'suburbs');
});
function setGrade(g, el) {
gradeFilter = g;
document.querySelectorAll('.vchip').forEach(c => { c.className = 'vchip'; });
const suffix = g === 'all' ? 'all' : g.replace('g-', '');
el.classList.add('on-' + suffix);
render();
}
function setSort(col, el) {
if (sortCol === col) {
sortDir *= -1;
} else {
sortCol = col;
sortDir = (col === 'vac' || col === 'suburb') ? 1 : -1;
}
document.querySelectorAll('.sbtn').forEach(b => b.classList.remove('on'));
el.classList.add('on');
render();
}
function resetAll() {
document.getElementById('searchInput').value = '';
document.getElementById('stateFilter').value = '';
gradeFilter = 'all';
sortCol = 'total';
sortDir = -1;
document.querySelectorAll('.vchip').forEach(c => { c.className = 'vchip'; });
document.querySelector('[data-g="all"]').classList.add('on-all');
document.querySelectorAll('.sbtn').forEach(b => b.classList.remove('on'));
document.querySelector('.sbtn').classList.add('on');
render();
}
function render() {
const search = document.getElementById('searchInput').value.toLowerCase();
const state  = document.getElementById('stateFilter').value;
let data = DATA.filter(s => {
if (search && !s.suburb.toLowerCase().includes(search) && !s.city.toLowerCase().includes(search)) return false;
if (state && s.state !== state) return false;
if (gradeFilter !== 'all' && getGrade(s.scores.total).cls !== gradeFilter) return false;
return true;
});
data.sort((a, b) => {
if (sortCol === 'suburb') return sortDir * a.suburb.localeCompare(b.suburb);
return sortDir * (getValue(a, sortCol) - getValue(b, sortCol));
});
updateStats();
document.getElementById('resCount').textContent =
`${data.length} suburb${data.length !== 1 ? 's' : ''} shown`;
const grid  = document.getElementById('grid');
const noRes = document.getElementById('noRes');
if (!data.length) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
noRes.style.display = 'none';
grid.innerHTML = data.map(buildCard).join('');
}
function getValue(s, col) {
switch (col) {
case 'total':         return s.scores.total;
case 'demandSupply':  return s.scores.demandSupply;
case 'growthDrivers': return s.scores.growthDrivers;
case 'yield':         return s.yield;
case 'vac':           return s.vac;
default:              return s.scores.total;
}
}
function updateStats() {
const counts = { aplus: 0, a: 0, b: 0, c: 0, d: 0 };
DATA.forEach(s => {
const g = getGrade(s.scores.total).grade;
if      (g === 'A+') counts.aplus++;
else if (g === 'A')  counts.a++;
else if (g === 'B')  counts.b++;
else if (g === 'C')  counts.c++;
else                 counts.d++;
});
document.getElementById('s-aplus').textContent = counts.aplus;
document.getElementById('s-a').textContent     = counts.a;
document.getElementById('s-b').textContent     = counts.b;
document.getElementById('s-c').textContent     = counts.c;
document.getElementById('s-d').textContent     = counts.d;
document.getElementById('s-total').textContent = DATA.length;
}
function buildCard(s, i) {
const sc       = s.scores;
const g        = getGrade(sc.total);
const barColor = totalScoreColor(sc.total);
const vacCls  = s.vac    < 1.0 ? 'g' : s.vac    < 2.0 ? 'a' : 'r';
const yldCls  = s.yield >= 5.5 ? 'g' : s.yield >= 4.5 ? 'a' : 'r';
const gthCls  = s.growth >= 15 ? 'g' : s.growth >= 7  ? 'a' : 'r';
const catBars = CATEGORIES.map(c => {
const pts   = sc[c.key] || 0;
const w     = (pts / c.max) * 100;
const col   = scoreColor(pts, c.max);
const vals  = c.vals(s);
const brkdn = c.breakdown(s);
return `<div class="cat-row">
<div class="cat-info">
<div class="cat-name">${c.label}</div>
<div class="cat-vals">${vals}</div>
</div>
<div class="cat-bar-wrap" title="${brkdn}">
<div class="cat-bar" style="width:${w}%;background:${col}"></div>
</div>
<div class="cat-pts" style="color:${col}">${pts}/${c.max}</div>
</div>`;
}).join('');
const priceFmt = s.price >= 1000000
? '$' + (s.price / 1000000).toFixed(2) + 'M'
: '$' + (s.price / 1000).toFixed(0) + 'k';
const delay = Math.min(i * 0.02, 0.6);
return `<div class="card ${g.cls}" style="animation-delay:${delay}s" onclick="this.classList.toggle('open')">
<div class="ch">
<div class="ch-left">
<div class="cname">${s.suburb}</div>
<div class="cloc">${s.city} · ${s.state}</div>
</div>
<div class="ch-right">
<span class="grade-badge">${g.grade}</span>
<span class="st-badge st-${s.state}">${s.state}</span>
<span class="price-tag">~${priceFmt}</span>
</div>
</div>
<div class="mrow">
<div class="metric">
<div class="mv ${vacCls}">${s.vac}%</div>
<div class="ml">Vacancy</div>
</div>
<div class="metric">
<div class="mv ${yldCls}">${s.yield.toFixed(1)}%</div>
<div class="ml">Yield</div>
</div>
<div class="metric">
<div class="mv ${gthCls}">${s.growth}%</div>
<div class="ml">Growth</div>
</div>
</div>
<div class="score-section">
<div class="score-top">
<span class="score-label">Total score</span>
<span class="score-num" style="color:${barColor}">${sc.total} / 100</span>
</div>
<div class="score-bar-track">
<div class="score-bar-fill" style="width:${sc.total}%;background:${barColor}"></div>
</div>
</div>
<div class="cat-grid">${catBars}</div>
<div class="cf">
<span class="verdict-label">${g.label}</span>
<span class="total-pts"><span>${sc.total}</span>/100 pts</span>
</div>
${sc.rejectReasons && sc.rejectReasons.length ? `<div class="reject-reasons">${sc.rejectReasons.map(r=>`<span class="rej-chip">✕ ${r}</span>`).join('')}</div>` : ''}
<div class="card-note">${s.note}</div>
<div class="tap-hint">tap for notes</div>
</div>`;
}
document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('stateFilter').addEventListener('change', render);
render();
(function initRoute() {
const page = HASH_PAGE[window.location.hash] || 'suburbs';
if (!window.location.hash) {
history.replaceState({ page }, '', PAGE_HASH[page]);
}
activatePage(page);
}());
