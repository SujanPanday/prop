/* © 2026 AusPropertyIQ. All rights reserved. */
let scoutProps = [];
let scoutNextId = 1;
function scoutFindSuburb(suburbName, state) {
if (!suburbName) return null;
const q = suburbName.toLowerCase().trim();
const st = (state || '').toUpperCase();
let hit = MASTER_SUBURBS.find(s =>
s.suburb.toLowerCase() === q && (!st || s.state === st)
);
if (!hit) {
hit = MASTER_SUBURBS.find(s =>
s.suburb.toLowerCase().includes(q) && (!st || s.state === st)
);
}
return hit || null;
}
function scoutCalc(p) {
const r = {
rejected: false, rejectReasons: [],
A: 0, B: 0, C: 0, D: 0, E: 0, F: 0,
bonus: 0, base: 0, total: 0,
suburbTotal: 0, suburbGrade: '', suburbLabel: '', suburbData: null,
estRentPw: 0, suburbGrowth: 0, suburbCycle: ''
};
if (p.price > 650000)        r.rejectReasons.push('Price over $650,000');
if (p.type !== 'house')      r.rejectReasons.push('Not a standalone house');
if (p.beds < 3)              r.rejectReasons.push('Less than 3 bedrooms');
if (p.baths < 2)             r.rejectReasons.push('Less than 2 bathrooms');
if (p.land < 400)            r.rejectReasons.push('Land under 400 m²');
if (p.flood)                 r.rejectReasons.push('Flood overlay present');
if (p.heritage)              r.rejectReasons.push('Heritage overlay present');
if (p.bushfire === 'extreme')r.rejectReasons.push('Extreme bushfire risk');
if (p.structural)            r.rejectReasons.push('Major structural issues');
if (p.crime)                 r.rejectReasons.push('High crime pocket');
if (p.mainroad)              r.rejectReasons.push('Main road frontage');
if (p.industrial)            r.rejectReasons.push('Adjacent industrial use');
if (r.rejectReasons.length) { r.rejected = true; return r; }
const sd = scoutFindSuburb(p.suburb, p.state);
r.suburbData = sd;
let subTotal = 50;
if (sd) {
const sc = scoreMasterSuburb(sd);
subTotal = sc.total;
r.estRentPw = Math.round(sd.price * (sd.yield / 100) / 52);
r.suburbGrowth = sd.growth;
r.suburbCycle = sd.cycle;
}
r.suburbTotal = subTotal;
const sg = getGrade(subTotal);
r.suburbGrade = sg.grade;
r.suburbLabel = sg.label;
if (sg.grade === 'D') {
r.rejected = true;
r.rejectReasons.push('Suburb grade D — automatic rejection');
return r;
}
r.A = sg.grade === 'A+' ? 20 : sg.grade === 'A' ? 18 : sg.grade === 'B' ? 14 : 8;
const landPts  = p.land >= 700 ? 10 : p.land >= 500 ? 8 : 5;
const bedPts   = p.beds >= 4   ?  5 : 3;
const bathPts  = p.baths >= 3  ?  5 : 4;
const garPts   = p.garage === 'double' ? 3 : 0;
const agePts   = p.age < 15    ?  5 : p.age < 25 ? 3 : 1;
r.B = Math.min(25, landPts + bedPts + bathPts + garPts + agePts);
let cPts = 0;
if (p.culdesac)     cPts += 5;
if (p.quietstreet)  cPts += 5;
if (p.nothrough)    cPts += 3;
if (p.oostreet)     cPts += 3;
if (p.maintained)   cPts += 2;
if (p.presentation) cPts += 2;
cPts = Math.min(20, cPts);
if (p.railbacking)  cPts -= 5;
if (p.combacking)   cPts -= 5;
r.C = Math.max(0, cPts);
let dPts = 0;
if (p.pri1km)   dPts += 3;
if (p.sec2km)   dPts += 3;
if (p.multisch) dPts += 2;
if (p.goodsch)  dPts += 2;
r.D = Math.min(10, dPts);
let ePts = 0;
if (p.shops5)      ePts += 3;
if (p.hosp10)      ePts += 2;
if (p.employ15)    ePts += 3;
if (p.transport)   ePts += 2;
r.E = Math.min(10, ePts);
let fPts = 0;
if (!p.flood)                        fPts += 5;
if (p.bushfire === 'none')           fPts += 4;
else if (p.bushfire === 'low')       fPts += 2;
if (!p.heritage)                     fPts += 2;
if (p.lowinsurance)                  fPts += 2;
if (!p.crime)                        fPts += 2;
r.F = Math.min(15, fPts);
r.base = r.A + r.B + r.C + r.D + r.E + r.F;
let bon = 0;
if (p.corner)       bon += 2;
if (p.subdivision)  bon += 5;
if (p.duplex)       bon += 5;
if (p.granny)       bon += 3;
if (p.walkschool)   bon += 2;
if (p.walkshops)    bon += 2;
if (p.nbn)          bon += 1;
r.bonus = Math.min(10, bon);
r.total = Math.min(100, r.base + r.bonus);
return r;
}
function scoutGrade(total) {
if (total >= 90) return { g: 'A+', label: 'Elite Buy',   cls: 'sc-aplus' };
if (total >= 80) return { g: 'A',  label: 'Strong Buy',  cls: 'sc-a' };
if (total >= 70) return { g: 'B',  label: 'Good Buy',    cls: 'sc-b' };
if (total >= 60) return { g: 'C',  label: 'Watchlist',   cls: 'sc-c' };
return              { g: 'D',  label: 'Reject',      cls: 'sc-d' };
}
function scoutOpenForm(editId) {
document.getElementById('scout-modal').style.display = 'flex';
document.getElementById('scout-modal').scrollTop = 0;
if (editId) {
const existing = scoutProps.find(p => p.id === editId);
if (existing) scoutPopulateForm(existing);
document.getElementById('scout-form-edit-id').value = editId;
} else {
scoutResetForm();
document.getElementById('scout-form-edit-id').value = '';
}
document.body.style.overflow = 'hidden';
}
function scoutCloseForm() {
document.getElementById('scout-modal').style.display = 'none';
document.body.style.overflow = '';
}
function scoutResetForm() {
document.getElementById('scout-form').reset();
document.querySelectorAll('.sc-toggle').forEach(btn => {
btn.classList.remove('sc-tog-yes');
});
}
function scoutToggle(btn, field) {
btn.classList.toggle('sc-tog-yes');
}
function scoutRadio(group, val, el) {
document.querySelectorAll('[data-radio="' + group + '"]').forEach(b => b.classList.remove('sc-tog-yes'));
el.classList.add('sc-tog-yes');
document.getElementById('scout-r-' + group).value = val;
}
function scoutReadForm() {
const v = id => document.getElementById(id);
const tog = id => document.getElementById(id).classList.contains('sc-tog-yes');
return {
address:     v('sf-address').value.trim(),
suburb:      v('sf-suburb').value.trim(),
state:       v('sf-state').value,
price:       parseInt(v('sf-price').value) || 0,
type:        document.querySelector('[data-radio="type"].sc-tog-yes')?.dataset.val || 'house',
beds:        parseInt(v('sf-beds').value) || 3,
baths:       parseInt(v('sf-baths').value) || 2,
land:        parseInt(v('sf-land').value) || 0,
garage:      document.querySelector('[data-radio="garage"].sc-tog-yes')?.dataset.val || 'none',
age:         parseInt(v('sf-age').value) || 20,
photo:       v('sf-photo').value.trim(),
flood:       tog('sf-flood'),
heritage:    tog('sf-heritage'),
structural:  tog('sf-structural'),
crime:       tog('sf-crime'),
mainroad:    tog('sf-mainroad'),
industrial:  tog('sf-industrial'),
bushfire:    (function() {
var lvl = v('scout-r-bushfire').value || 'none';
var hardEl = document.getElementById('sf-bushfire-hard');
if (hardEl && hardEl.classList.contains('sc-tog-yes')) return 'extreme';
return lvl;
})(),
culdesac:    tog('sf-culdesac'),
quietstreet: tog('sf-quietstreet'),
nothrough:   tog('sf-nothrough'),
oostreet:    tog('sf-oostreet'),
maintained:  tog('sf-maintained'),
presentation:tog('sf-presentation'),
railbacking: tog('sf-railbacking'),
combacking:  tog('sf-combacking'),
pri1km:      tog('sf-pri1km'),
sec2km:      tog('sf-sec2km'),
multisch:    tog('sf-multisch'),
goodsch:     tog('sf-goodsch'),
shops5:      tog('sf-shops5'),
hosp10:      tog('sf-hosp10'),
employ15:    tog('sf-employ15'),
transport:   tog('sf-transport'),
lowinsurance:tog('sf-lowinsurance'),
corner:      tog('sf-corner'),
subdivision: tog('sf-subdivision'),
duplex:      tog('sf-duplex'),
granny:      tog('sf-granny'),
walkschool:  tog('sf-walkschool'),
walkshops:   tog('sf-walkshops'),
nbn:         tog('sf-nbn'),
};
}
function scoutPopulateForm(p) {
const v = id => document.getElementById(id);
const setTog = (id, val) => {
const el = document.getElementById(id);
if (val) el.classList.add('sc-tog-yes');
else el.classList.remove('sc-tog-yes');
};
v('sf-address').value = p.address;
v('sf-suburb').value = p.suburb;
v('sf-state').value = p.state;
v('sf-price').value = p.price;
v('sf-beds').value = p.beds;
v('sf-baths').value = p.baths;
v('sf-land').value = p.land;
v('sf-age').value = p.age;
v('sf-photo').value = p.photo || '';
['flood','heritage','structural','crime','mainroad','industrial',
'culdesac','quietstreet','nothrough','oostreet','maintained','presentation',
'railbacking','combacking','pri1km','sec2km','multisch','goodsch',
'shops5','hosp10','employ15','transport','lowinsurance',
'corner','subdivision','duplex','granny','walkschool','walkshops','nbn'
].forEach(f => setTog('sf-' + f, p[f]));
scoutSetRadio('type', p.type);
scoutSetRadio('garage', p.garage);
scoutSetRadio('bushfire', p.bushfire || 'none');
}
function scoutSetRadio(group, val) {
document.querySelectorAll('[data-radio="' + group + '"]').forEach(b => {
b.classList.toggle('sc-tog-yes', b.dataset.val === val);
});
document.getElementById('scout-r-' + group).value = val;
}
function scoutSubmitForm() {
const p = scoutReadForm();
if (!p.address) { alert('Please enter a property address.'); return; }
if (!p.price)   { alert('Please enter a price.'); return; }
if (!p.land)    { alert('Please enter land size (m²).'); return; }
const editId = parseInt(document.getElementById('scout-form-edit-id').value) || 0;
if (editId) {
const idx = scoutProps.findIndex(x => x.id === editId);
if (idx >= 0) { scoutProps[idx] = { ...p, id: editId }; }
} else {
scoutProps.push({ ...p, id: scoutNextId++ });
}
scoutCloseForm();
scoutRender();
}
function scoutDelete(id) {
scoutProps = scoutProps.filter(p => p.id !== id);
scoutRender();
}
function scoutRender() {
const results = document.getElementById('scout-results');
const empty   = document.getElementById('scout-empty');
if (!scoutProps.length) {
empty.style.display = 'flex';
results.innerHTML = '';
return;
}
empty.style.display = 'none';
const scored = scoutProps.map(p => ({ p, r: scoutCalc(p) }));
scored.sort((a, b) => {
if (a.r.rejected && !b.r.rejected) return 1;
if (!a.r.rejected && b.r.rejected) return -1;
return b.r.total - a.r.total;
});
results.innerHTML = scored.map((item, rank) => buildScoutCard(item.p, item.r, rank + 1, scored.length)).join('');
}
function buildScoutCard(p, r, rank, total) {
const rejected = r.rejected;
const grade    = rejected ? { g: 'D', label: 'Reject', cls: 'sc-d' } : scoutGrade(r.total);
const priceFmt = '$' + (p.price / 1000).toFixed(0) + 'k';
const sections = rejected ? '' : [
{ label: 'A  Suburb Quality',     pts: r.A, max: 20 },
{ label: 'B  Land & House',       pts: r.B, max: 25 },
{ label: 'C  Street Quality',     pts: r.C, max: 20 },
{ label: 'D  Schools & Family',   pts: r.D, max: 10 },
{ label: 'E  Amenities & Jobs',   pts: r.E, max: 10 },
{ label: 'F  Risk Control',       pts: r.F, max: 15 },
].map(s => {
const pct = (s.pts / s.max) * 100;
const col = pct >= 80 ? '#27b389' : pct >= 60 ? '#3d8ef0' : pct >= 40 ? '#e08c2a' : '#e04a4a';
return `<div class="sc-bar-row">
<div class="sc-bar-label">${s.label}</div>
<div class="sc-bar-track"><div class="sc-bar-fill" style="width:${pct}%;background:${col}"></div></div>
<div class="sc-bar-pts" style="color:${col}">${s.pts}/${s.max}</div>
</div>`;
}).join('');
const statPills = `
<span class="sc-pill">${p.beds} bed</span>
<span class="sc-pill">${p.baths} bath</span>
<span class="sc-pill">${p.land}m²</span>
<span class="sc-pill">${p.garage === 'double' ? '2-car garage' : p.garage === 'single' ? '1-car garage' : 'No garage'}</span>
<span class="sc-pill">${p.age}yr old</span>`;
const suburbInfo = r.suburbData
? `<div class="sc-suburb-name">${r.suburbData.suburb}, ${r.suburbData.state}</div>
<div class="sc-suburb-score">${r.suburbTotal}/100 · ${r.suburbGrade} ${r.suburbLabel}</div>
<div class="sc-suburb-meta">Growth ${r.suburbGrowth}% · ${r.suburbCycle} cycle · Vac ${r.suburbData.vac}%</div>`
: `<div class="sc-suburb-name">${p.suburb || '—'}</div><div class="sc-suburb-score" style="color:var(--muted)">Suburb not in database</div>`;
const rentalLine = r.suburbData
? `Est. $${r.estRentPw}/wk · Suburb yield ${r.suburbData.yield.toFixed(1)}%`
: 'Enter suburb to see estimates';
const growthLine = r.suburbData
? `${r.suburbGrowth}% annual · ${r.suburbCycle} cycle`
: '—';
const photoHtml = p.photo
? `<img src="${p.photo}" onerror="this.parentNode.classList.add('sc-photo-err');this.style.display='none'">`
: `<div class="sc-photo-placeholder"><span>${p.suburb || '?'}</span></div>`;
const rejectContent = rejected
? `<div class="sc-reject-list">${r.rejectReasons.map(x => `<div class="sc-reject-item">✕ ${x}</div>`).join('')}</div>`
: '';
const bonusLine = r.bonus > 0 ? `<span class="sc-bonus-badge">+${r.bonus} bonus pts</span>` : '';
return `
<div class="sc-card ${rejected ? 'sc-card-rejected' : grade.cls}" id="scard-${p.id}">
<div class="sc-card-top">
<div class="sc-rank-badge">#${rank} of ${total}</div>
<button class="sc-edit-btn" onclick="scoutOpenForm(${p.id})">Edit</button>
<button class="sc-del-btn"  onclick="scoutDelete(${p.id})">✕</button>
</div>
<div class="sc-card-body">
<div class="sc-left">
<div class="sc-address-row">
<div class="sc-address">${p.address || '—'}</div>
<div class="sc-price-tag">${priceFmt}</div>
</div>
${rejected ? rejectContent : `
<div class="sc-score-header">
<div class="sc-total-num" style="color:var(--grade-${grade.g === 'A+' ? 'aplus' : grade.g.toLowerCase()})">${r.total}</div>
<div class="sc-score-meta">
<div class="sc-score-label">Property Score / 100</div>
<div class="sc-score-sub">Base ${r.base} ${bonusLine}</div>
</div>
</div>
<div class="sc-bars">${sections}</div>
<div class="sc-stats-row">${statPills}</div>
<div class="sc-analysis-grid">
<div class="sc-analysis-item"><div class="sc-ai-label">Rental Est.</div><div class="sc-ai-val">${rentalLine}</div></div>
<div class="sc-analysis-item"><div class="sc-ai-label">Growth</div><div class="sc-ai-val">${growthLine}</div></div>
${p.corner || p.subdivision || p.duplex || p.granny ? `<div class="sc-analysis-item"><div class="sc-ai-label">Upside</div><div class="sc-ai-val">${[p.corner?'Corner':null,p.subdivision?'Subdiv.':null,p.duplex?'Duplex':null,p.granny?'Granny flat':null].filter(Boolean).join(' · ')}</div></div>` : ''}
</div>`}
</div>
<div class="sc-right">
<div class="sc-photo">${photoHtml}</div>
<div class="sc-suburb-card">
<div class="sc-suburb-lbl">Suburb Score</div>
${suburbInfo}
</div>
</div>
</div>
<div class="sc-verdict ${grade.cls}">
<span class="sc-verdict-grade">${grade.g}</span>
<span class="sc-verdict-label">${grade.label.toUpperCase()}</span>
</div>
</div>`;
}
(function scoutInit() {
document.addEventListener('DOMContentLoaded', function() {
scoutSetRadio('type', 'house');
scoutSetRadio('garage', 'double');
scoutSetRadio('bushfire', 'none');
});
}());
