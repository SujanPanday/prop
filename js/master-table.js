// ─────────────────────────────────────────────
//  MASTER TABLE — render / filter / sort
//  Uses MASTER_SUBURBS from data/master-data.js
// ─────────────────────────────────────────────

let mtSortCol = 'rank';
let mtSortDir = 1;

const IJ_LABEL = { major: 'Major', strong: 'Strong', moderate: 'Moderate', weak: 'Weak', none: 'None' };
const IJ_CLS   = { major: 'mtg',   strong: 'mtg',    moderate: 'mta',      weak: 'mtr',  none: 'mtr'  };
const CY_CLS   = { 'Early': 'mtg', 'Early-Mid': 'mtg', 'Mid': 'mta', 'Late': 'mtr', 'Peak': 'mtr' };

function mtRender() {
  const search = document.getElementById('mt-search').value.toLowerCase();
  const state  = document.getElementById('mt-state').value;
  const cycle  = document.getElementById('mt-cycle').value;
  const ij     = document.getElementById('mt-ij').value;

  let data = MASTER_SUBURBS.filter(r => {
    if (search && !r.suburb.toLowerCase().includes(search) && !r.city.toLowerCase().includes(search)) return false;
    if (state && r.state     !== state) return false;
    if (cycle && r.cycle     !== cycle) return false;
    if (ij    && r.infraJobs !== ij)    return false;
    return true;
  });

  data.sort((a, b) => {
    const av = a[mtSortCol], bv = b[mtSortCol];
    if (typeof av === 'string') return mtSortDir * av.localeCompare(bv);
    return mtSortDir * (av - bv);
  });

  // Update sort arrows
  document.querySelectorAll('.mt-th').forEach(e => e.textContent = '');
  const arr = document.getElementById('mta-' + mtSortCol);
  if (arr) arr.textContent = mtSortDir === 1 ? ' ↑' : ' ↓';

  // Summary bar — counts by infra/jobs level
  const ij_counts = { major: 0, strong: 0, moderate: 0, weak: 0 };
  data.forEach(r => {
    if (r.infraJobs === 'major')    ij_counts.major++;
    else if (r.infraJobs === 'strong')   ij_counts.strong++;
    else if (r.infraJobs === 'moderate') ij_counts.moderate++;
    else                                 ij_counts.weak++;
  });

  document.getElementById('mt-sum').innerHTML =
    `<div class="sm"><div class="sm-n" style="color:#4ade80">${ij_counts.major}</div><div class="sm-l">Major Infra</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:#38bdf8">${ij_counts.strong}</div><div class="sm-l">Strong Growth</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:#fbbf24">${ij_counts.moderate}</div><div class="sm-l">Moderate</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:#f87171">${ij_counts.weak}</div><div class="sm-l">Weak / None</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:#94a3b8">${data.length}</div><div class="sm-l">Shown</div></div>`;

  document.getElementById('mt-count').textContent = `${data.length} / ${MASTER_SUBURBS.length}`;

  const tbody = document.getElementById('mt-tbody');
  const noRes = document.getElementById('mt-nores');

  if (!data.length) { tbody.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  tbody.innerHTML = data.map(r => {
    const yc  = r.yield  >= 5.5 ? 'mtg' : r.yield  >= 4.5 ? 'mta' : 'mtr';
    const gc  = r.growth >= 15  ? 'mtg' : r.growth >= 7   ? 'mta' : 'mtr';
    const vc  = r.vac    <  1.0 ? 'mtg' : r.vac    <  2.0 ? 'mta' : 'mtr';
    const dc  = r.dsr    >= 58  ? 'mtg' : r.dsr    >= 55  ? 'mta' : 'mtr';
    const ijc = IJ_CLS[r.infraJobs] || 'mta';
    const cc  = CY_CLS[r.cycle] || 'mta';
    const pc  = r.price <= 650000 ? 'mtg' : 'mtr';
    const priceFmt = r.price >= 1000000
      ? '$' + (r.price / 1000000).toFixed(2) + 'M'
      : '$' + (r.price / 1000).toFixed(0) + 'k';

    return `<tr>
      <td class="mt-rank">${r.rank}</td>
      <td class="mt-suburb">${r.suburb}</td>
      <td class="mt-city">${r.city}</td>
      <td><span class="st-badge st-${r.state}">${r.state}</span></td>
      <td class="${pc}">${priceFmt}</td>
      <td class="${yc}">${r.yield.toFixed(1)}%</td>
      <td class="${gc}">${r.growth}%</td>
      <td class="${vc}">${r.vac}%</td>
      <td class="${dc}">${r.dsr}</td>
      <td class="${ijc}">${IJ_LABEL[r.infraJobs] || r.infraJobs}</td>
      <td class="${cc}">${r.cycle}</td>
      <td class="mt-note">${r.note}</td>
    </tr>`;
  }).join('');
}

function mtSort(col) {
  mtSortDir = (mtSortCol === col) ? mtSortDir * -1
    : (['suburb','city','state','cycle','infraJobs'].includes(col) ? 1 : -1);
  mtSortCol = col;
  mtRender();
}

function mtReset() {
  document.getElementById('mt-search').value = '';
  document.getElementById('mt-state').value  = '';
  document.getElementById('mt-cycle').value  = '';
  document.getElementById('mt-ij').value     = '';
  mtRender();
}
