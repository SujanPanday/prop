// ─────────────────────────────────────────────
//  APP — rendering, filtering, sorting
// ─────────────────────────────────────────────

const CATEGORIES = [
  { key: 'demandSupply',  label: 'Demand / Supply', max: 30 },
  { key: 'growthDrivers', label: 'Growth Drivers',  max: 30 },
  { key: 'cashFlow',      label: 'Cash Flow',        max: 20 },
  { key: 'ownerOccTotal', label: 'Owner Occupier',   max: 10 },
  { key: 'riskControl',   label: 'Risk Control',     max: 10 },
];

// Score all suburbs once at load
const DATA = SUBURBS.map(s => ({ ...s, scores: scoreSuburb(s) }));

let sortCol    = 'total';
let sortDir    = -1;
let gradeFilter = 'all';

// ── PAGE SWITCHING ──────────────────────────

function showPage(page, el) {
  document.getElementById('page-suburbs').style.display = page === 'suburbs' ? '' : 'none';
  document.getElementById('page-scout').style.display   = page === 'scout'   ? '' : 'none';
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ── FILTER / SORT HANDLERS ──────────────────

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
    // Ascending by default for vacancy (lower = better) and name
    sortDir = (col === 'vacancyRate' || col === 'suburb') ? 1 : -1;
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

// ── RENDER ──────────────────────────────────

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
    const av = getValue(a, sortCol);
    const bv = getValue(b, sortCol);
    return sortDir * (av - bv);
  });

  updateStats();
  document.getElementById('resCount').textContent =
    `${data.length} suburb${data.length !== 1 ? 's' : ''} shown`;

  const grid  = document.getElementById('grid');
  const noRes = document.getElementById('noRes');

  if (!data.length) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';
  grid.innerHTML = data.map(buildCard).join('');
}

function getValue(s, col) {
  switch (col) {
    case 'total':         return s.scores.total;
    case 'demandSupply':  return s.scores.demandSupply;
    case 'growthDrivers': return s.scores.growthDrivers;
    case 'grossYield':    return s.grossYield;
    case 'vacancyRate':   return s.vacancyRate;
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
  const sc        = s.scores;
  const g         = getGrade(sc.total);
  const barColor  = totalScoreColor(sc.total);

  const vacCls   = s.vacancyRate < 1.0 ? 'g' : s.vacancyRate < 2.0 ? 'a' : 'r';
  const yldCls   = s.grossYield  >= 5.5 ? 'g' : s.grossYield >= 4.5 ? 'a' : 'r';
  const riskLabel = { low: 'Low Risk', moderate: 'Mod. Risk', high: 'High Risk' }[s.naturalRisk] || 'Mod. Risk';
  const riskCls   = s.naturalRisk === 'low' ? 'g' : s.naturalRisk === 'moderate' ? 'a' : 'r';

  const catBars = CATEGORIES.map(c => {
    const pts = sc[c.key] || 0;
    const w   = (pts / c.max) * 100;
    const col = scoreColor(pts, c.max);
    return `<div class="cat-row">
      <div class="cat-name">${c.label}</div>
      <div class="cat-bar-wrap"><div class="cat-bar" style="width:${w}%;background:${col}"></div></div>
      <div class="cat-pts" style="color:${col}">${pts}/${c.max}</div>
    </div>`;
  }).join('');

  const delay = Math.min(i * 0.03, 0.45);

  return `<div class="card ${g.cls}" style="animation-delay:${delay}s" onclick="this.classList.toggle('open')">
    <div class="ch">
      <div class="ch-left">
        <div class="cname">${s.suburb}</div>
        <div class="cloc">${s.city} · ${s.state}</div>
      </div>
      <div class="ch-right">
        <span class="grade-badge">${g.grade}</span>
        <span class="st-badge st-${s.state}">${s.state}</span>
        <span class="price-tag">~$${(s.price / 1000).toFixed(0)}k</span>
      </div>
    </div>

    <div class="mrow">
      <div class="metric">
        <div class="mv ${vacCls}">${s.vacancyRate}%</div>
        <div class="ml">Vacancy</div>
      </div>
      <div class="metric">
        <div class="mv ${yldCls}">${s.grossYield.toFixed(1)}%</div>
        <div class="ml">Yield</div>
      </div>
      <div class="metric">
        <div class="mv ${riskCls}">${riskLabel}</div>
        <div class="ml">Risk</div>
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

    <div class="card-note">${s.note}</div>
    <div class="tap-hint">tap for notes</div>
  </div>`;
}

// ── INIT ─────────────────────────────────────

document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('stateFilter').addEventListener('change', render);
render();
