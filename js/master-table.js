// ─────────────────────────────────────────────
//  MASTER TABLE — render / filter / sort
//  Uses MASTER_SUBURBS from data/master-data.js
// ─────────────────────────────────────────────

let mtSortCol = 'rank';
let mtSortDir = 1;

function mtRender() {
  const search = document.getElementById('mt-search').value.toLowerCase();
  const state  = document.getElementById('mt-state').value;
  const verdict = document.getElementById('mt-verdict').value;
  const cycle  = document.getElementById('mt-cycle').value;

  let data = MASTER_SUBURBS.filter(r => {
    if (search && !r.suburb.toLowerCase().includes(search) && !r.city.toLowerCase().includes(search)) return false;
    if (state   && r.state   !== state)   return false;
    if (verdict && r.verdict !== verdict) return false;
    if (cycle   && r.cycle   !== cycle)   return false;
    return true;
  });

  data.sort((a, b) => {
    const av = a[mtSortCol], bv = b[mtSortCol];
    if (typeof av === 'string') return mtSortDir * av.localeCompare(bv);
    return mtSortDir * (av - bv);
  });

  // Update sort arrows
  document.querySelectorAll('.mt-th span').forEach(e => e.textContent = '');
  const arr = document.getElementById('mta-' + mtSortCol);
  if (arr) arr.textContent = mtSortDir === 1 ? ' ↑' : ' ↓';

  // Summary counts
  const counts = { sb: 0, co: 0, wa: 0, av: 0 };
  data.forEach(r => {
    if      (r.verdict === 'Strong Buy')  counts.sb++;
    else if (r.verdict === 'Conditional') counts.co++;
    else if (r.verdict === 'Watch')       counts.wa++;
    else                                  counts.av++;
  });

  document.getElementById('mt-sum').innerHTML =
    `<div class="sm"><div class="sm-n" style="color:var(--grade-a)">${counts.sb}</div><div class="sm-l">Strong Buy</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:var(--grade-b)">${counts.co}</div><div class="sm-l">Conditional</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:var(--grade-c)">${counts.wa}</div><div class="sm-l">Watch</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:var(--grade-d)">${counts.av}</div><div class="sm-l">Avoid</div></div>` +
    `<div class="sm"><div class="sm-n" style="color:var(--muted2)">${data.length}</div><div class="sm-l">Shown</div></div>`;

  document.getElementById('mt-count').textContent = `${data.length} / ${MASTER_SUBURBS.length}`;

  const tbody = document.getElementById('mt-tbody');
  const noRes = document.getElementById('mt-nores');

  if (!data.length) { tbody.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  tbody.innerHTML = data.map(r => {
    const yc  = r.yield  >= 5.5 ? 'mtg' : r.yield  >= 4.5 ? 'mta' : 'mtr';
    const gc  = r.growth >= 15  ? 'mtg' : r.growth >= 7   ? 'mta' : 'mtr';
    const vc  = r.vac    <  0.6 ? 'mtg' : r.vac    <  2   ? 'mta' : 'mtr';
    const dc  = r.dsr    >= 58  ? 'mtg' : r.dsr    >= 55  ? 'mta' : 'mtr';
    const cc  = r.cycle === 'Early' ? 'mtg' : r.cycle === 'Mid' ? 'mta' : 'mtr';
    const pc  = r.price <= 650000 ? 'mtg' : 'mtr';
    const vcls = r.verdict === 'Strong Buy'  ? 'vdt-sb'
               : r.verdict === 'Conditional' ? 'vdt-co'
               : r.verdict === 'Watch'       ? 'vdt-wa' : 'vdt-av';
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
      <td class="${cc}">${r.cycle}</td>
      <td><span class="vdt ${vcls}">${r.verdict}</span></td>
      <td class="mt-note">${r.note}</td>
    </tr>`;
  }).join('');
}

function mtSort(col) {
  mtSortDir = (mtSortCol === col) ? mtSortDir * -1
    : (['suburb','city','state','cycle','verdict'].includes(col) ? 1 : -1);
  mtSortCol = col;
  mtRender();
}

function mtReset() {
  document.getElementById('mt-search').value  = '';
  document.getElementById('mt-state').value   = '';
  document.getElementById('mt-verdict').value = '';
  document.getElementById('mt-cycle').value   = '';
  mtRender();
}
