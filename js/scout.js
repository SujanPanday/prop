/* © 2026 AusPropertyIQ. All rights reserved. */
const PT_KEY = 'aqiq_props_v1';
let scoutProps  = [];
let scoutNextId = 1;
const DEFAULT_PROPERTIES = [
{id:1,address:"8 Drummond Court, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:595000,land:477,beds:3,baths:2,age:25,type:"house",garage:"double",photo:"",housem2:155,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:true,quietstreet:true,nothrough:true,oostreet:true,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:false,walkschool:false,walkshops:false,nbn:true},
{id:2,address:"5 Carpenteria Close, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:599000,land:473,beds:3,baths:2,age:25,type:"house",garage:"single",photo:"",housem2:148,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:true,quietstreet:true,nothrough:true,oostreet:true,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:false,walkschool:false,walkshops:false,nbn:true},
{id:3,address:"25 Hicks Street, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:374000,land:809,beds:3,baths:2,age:40,type:"house",garage:"double",photo:"https://www.homely.com.au/img-variant/l-MyDesktop-9694237-1.jpg?named-transform=webDefaultTransform&version=jkUifrsEvcwRPfYXeNLhX5pCaBv1uDJU",housem2:84,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:false,presentation:false,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:true,duplex:false,granny:true,walkschool:true,walkshops:false,nbn:true},
{id:4,address:"33a Seldon Place, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:625000,land:470,beds:3,baths:2,age:18,type:"house",garage:"single",photo:"",housem2:162,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:true,quietstreet:true,nothrough:true,oostreet:true,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:false,walkschool:false,walkshops:false,nbn:true},
{id:5,address:"57 Hudson Street, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:599000,land:609,beds:3,baths:1,age:35,type:"house",garage:"single",photo:"https://www.homely.com.au/img-variant/l-RayWhite-8535504-1.jpg?named-transform=webDefaultTransform&version=mGiHBqyoIV9VGYH.oxOhdkJ9.AsVckBt",housem2:138,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:true,walkshops:false,nbn:true},
{id:6,address:"17 Woodlake Avenue, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:639000,land:393,beds:3,baths:1,age:20,type:"house",garage:"double",photo:"",housem2:155,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:true,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:false,walkschool:false,walkshops:false,nbn:true},
{id:7,address:"25 McBride Street, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:579000,land:602,beds:3,baths:1,age:35,type:"house",garage:"double",photo:"",housem2:135,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:true,walkshops:false,nbn:true},
{id:8,address:"38 Kittyhawk Crescent, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:549000,land:762,beds:3,baths:1,age:35,type:"house",garage:"double",photo:"",housem2:140,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:true,duplex:false,granny:true,walkschool:false,walkshops:false,nbn:true},
{id:9,address:"41 Campion Circle, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:549000,land:700,beds:3,baths:1,age:35,type:"house",garage:"single",photo:"",housem2:132,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:false,walkshops:false,nbn:true},
{id:10,address:"135 Thuringowa Drive, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:550000,land:783,beds:3,baths:1,age:40,type:"house",garage:"single",photo:"",housem2:125,flood:false,heritage:false,structural:false,crime:false,mainroad:true,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:false,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:true,walkshops:false,nbn:true},
{id:11,address:"37 Bokirana Crescent, Kirwan QLD 4817",suburb:"Kirwan",state:"QLD",price:629000,land:665,beds:3,baths:1,age:35,type:"house",garage:"double",photo:"",housem2:143,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:true,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:false,walkshops:false,nbn:true},
{id:12,address:"4 Kabbarli Court, Karama NT 0812",suburb:"Karama",state:"NT",price:610000,land:989,beds:3,baths:1,age:45,type:"house",garage:"double",photo:"",housem2:118,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:true,quietstreet:true,nothrough:true,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:true,duplex:true,granny:true,walkschool:true,walkshops:false,nbn:false},
{id:13,address:"97C Great Northern Highway, Midland WA 6056",suburb:"Midland",state:"WA",price:635000,land:350,beds:3,baths:1,age:25,type:"house",garage:"single",photo:"",housem2:108,flood:false,heritage:false,structural:false,crime:false,mainroad:true,industrial:false,bushfire:"none",poorStreet:false,culdesac:false,quietstreet:false,nothrough:false,oostreet:false,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:false,walkschool:false,walkshops:false,nbn:true},
{id:14,address:"6 Edith Court, Leanyer NT 0812",suburb:"Leanyer",state:"NT",price:770000,land:819,beds:3,baths:2,age:35,type:"house",garage:"double",photo:"",housem2:150,flood:false,heritage:false,structural:false,crime:false,mainroad:false,industrial:false,bushfire:"none",poorStreet:false,culdesac:true,quietstreet:true,nothrough:true,oostreet:true,maintained:true,presentation:true,railbacking:false,combacking:false,pri1km:true,sec2km:true,multisch:true,goodsch:true,shops5:true,hosp10:true,employ15:true,transport:true,lowinsurance:true,corner:false,subdivision:false,duplex:false,granny:true,walkschool:true,walkshops:false,nbn:false}
];
function ptSave() {
try { localStorage.setItem(PT_KEY, JSON.stringify(scoutProps)); } catch(e) {}
}
function ptLoad() {
try {
const s = localStorage.getItem(PT_KEY);
if (s) {
scoutProps  = JSON.parse(s);
scoutNextId = scoutProps.reduce((m,p) => Math.max(m, p.id+1), 1);
} else {
scoutProps  = DEFAULT_PROPERTIES.map(p => ({...p}));
scoutNextId = DEFAULT_PROPERTIES.length + 1;
ptSave();
}
} catch(e) {}
}
function scoutFindSuburb(suburbName, state) {
if (!suburbName) return null;
const q  = suburbName.toLowerCase().trim();
const st = (state || '').toUpperCase();
return MASTER_SUBURBS.find(s =>
s.suburb.toLowerCase() === q && (!st || s.state === st)
) || MASTER_SUBURBS.find(s =>
s.suburb.toLowerCase().includes(q) && (!st || s.state === st)
) || null;
}
function scoutCalc(p) {
const r = {
rejected:false, rejectReasons:[],
A:0,B:0,C:0,D:0,E:0,F:0,
bonus:0,base:0,total:0,
suburbTotal:0,suburbGrade:'',suburbLabel:'',suburbData:null,
estRentPw:0,suburbGrowth:0,suburbCycle:''
};
if (p.price > 650000)         r.rejectReasons.push('Price over $650,000');
if (p.type !== 'house')       r.rejectReasons.push('Not a standalone house');
if (p.beds < 3)               r.rejectReasons.push('Less than 3 bedrooms');
if (p.baths < 2)              r.rejectReasons.push('Less than 2 bathrooms');
if (p.land < 400)             r.rejectReasons.push('Land under 400 m²');
if (p.flood)                  r.rejectReasons.push('Flood overlay');
if (p.heritage)               r.rejectReasons.push('Heritage overlay');
if (p.bushfire === 'extreme') r.rejectReasons.push('Extreme bushfire risk');
if (p.structural)             r.rejectReasons.push('Major structural issues');
if (p.crime)                  r.rejectReasons.push('High crime pocket');
if (p.mainroad)               r.rejectReasons.push('Main road frontage');
if (p.industrial)             r.rejectReasons.push('Adjacent industrial use');
if (p.poorStreet)             r.rejectReasons.push('Poor street reputation');
if (r.rejectReasons.length)   { r.rejected = true; return r; }
const sd = scoutFindSuburb(p.suburb, p.state);
r.suburbData = sd;
let subTotal = 50;
if (sd) {
const sc = scoreMasterSuburb(sd);
subTotal = sc.total;
r.estRentPw  = Math.round(sd.price * (sd.yield / 100) / 52);
r.suburbGrowth = sd.growth;
r.suburbCycle  = sd.cycle;
}
r.suburbTotal = subTotal;
const sg = getGrade(subTotal);
r.suburbGrade = sg.grade;
r.suburbLabel = sg.label;
if (sg.grade === 'D') { r.rejected = true; r.rejectReasons.push('Suburb grade D'); return r; }
r.A = sg.grade==='A+'?20 : sg.grade==='A'?18 : sg.grade==='B'?14 : 8;
const landPts = p.land>=700?10 : p.land>=500?8 : 5;
const bedPts  = p.beds>=4?5:3;
const bathPts = p.baths>=3?5:4;
const garPts  = p.garage==='double'?3:0;
const agePts  = p.age<15?5 : p.age<25?3:1;
r.B = Math.min(25, landPts+bedPts+bathPts+garPts+agePts);
let cPts=0;
if(p.culdesac)    cPts+=5;
if(p.quietstreet) cPts+=5;
if(p.nothrough)   cPts+=3;
if(p.oostreet)    cPts+=3;
if(p.maintained)  cPts+=2;
if(p.presentation)cPts+=2;
cPts=Math.min(20,cPts);
if(p.mainroad)    cPts-=10;
if(p.industrial)  cPts-=10;
if(p.railbacking) cPts-=5;
if(p.combacking)  cPts-=5;
r.C=Math.max(0,cPts);
let dPts=0;
if(p.pri1km)   dPts+=3;
if(p.sec2km)   dPts+=3;
if(p.multisch) dPts+=2;
if(p.goodsch)  dPts+=2;
r.D=Math.min(10,dPts);
let ePts=0;
if(p.shops5)    ePts+=3;
if(p.hosp10)    ePts+=2;
if(p.employ15)  ePts+=3;
if(p.transport) ePts+=2;
r.E=Math.min(10,ePts);
let fPts=0;
if(!p.flood)                      fPts+=5;
if(p.bushfire==='none')           fPts+=4;
else if(p.bushfire==='low')       fPts+=2;
if(!p.heritage)                   fPts+=2;
if(p.lowinsurance)                fPts+=2;
if(!p.crime)                      fPts+=2;
r.F=Math.min(15,fPts);
r.base=r.A+r.B+r.C+r.D+r.E+r.F;
let bon=0;
if(p.corner)      bon+=2;
if(p.subdivision) bon+=5;
if(p.duplex)      bon+=5;
if(p.granny)      bon+=3;
if(p.walkschool)  bon+=2;
if(p.walkshops)   bon+=2;
if(p.nbn)         bon+=1;
r.bonus=Math.min(10,bon);
r.total=Math.min(100,r.base+r.bonus);
return r;
}
function scoutGrade(total) {
if(total>=90) return{g:'A+',label:'Elite Buy',  cls:'sc-aplus'};
if(total>=80) return{g:'A', label:'Strong Buy', cls:'sc-a'};
if(total>=70) return{g:'B', label:'Good Buy',   cls:'sc-b'};
if(total>=60) return{g:'C', label:'Watchlist',  cls:'sc-c'};
return              {g:'D', label:'Reject',     cls:'sc-d'};
}
let psGradeFilter = 'all';
let psSearch      = '';
let psState       = '';
let psSortCol     = 'total';
let psSortDir     = 1;
function psRender() {
const grid  = document.getElementById('ps-grid');
const empty = document.getElementById('ps-empty');
const cnt   = document.getElementById('ps-count');
if (!grid) return;
if (!scoutProps.length) {
empty.style.display = 'flex';
grid.innerHTML = '';
if (cnt) cnt.textContent = '';
psUpdateStats();
return;
}
empty.style.display = 'none';
const q = psSearch.toLowerCase();
let data = scoutProps.map(p => ({ p, r: scoutCalc(p) })).filter(({p, r}) => {
if (q && !p.address.toLowerCase().includes(q) && !p.suburb.toLowerCase().includes(q)) return false;
if (psState && p.state !== psState) return false;
if (psGradeFilter !== 'all') {
const g = r.rejected ? 'g-d' : 'g-' + scoutGrade(r.total).g.toLowerCase().replace('+','plus');
if (g !== psGradeFilter) return false;
}
return true;
});
data.sort((a, b) => {
if (a.r.rejected && !b.r.rejected) return 1;
if (!a.r.rejected && b.r.rejected) return -1;
if (psSortCol === 'suburb') return psSortDir * (b.r.suburbTotal - a.r.suburbTotal);
if (psSortCol === 'price')  return psSortDir * (a.p.price - b.p.price);
return psSortDir * (b.r.total - a.r.total);
});
if (cnt) cnt.textContent = data.length + ' / ' + scoutProps.length;
psUpdateStats();
grid.innerHTML = data.map(({p,r},i) => buildScoutBlock(p, r, i+1, data.length)).join('');
}
function psUpdateStats() {
const counts = {aplus:0, a:0, b:0, c:0, d:0};
scoutProps.forEach(p => {
const r = scoutCalc(p);
if (r.rejected) { counts.d++; return; }
const g = scoutGrade(r.total).g;
if      (g==='A+') counts.aplus++;
else if (g==='A')  counts.a++;
else if (g==='B')  counts.b++;
else if (g==='C')  counts.c++;
else               counts.d++;
});
['aplus','a','b','c','d'].forEach(k => {
const el = document.getElementById('ps-s-' + k);
if (el) el.textContent = counts[k];
});
const tot = document.getElementById('ps-s-total');
if (tot) tot.textContent = scoutProps.length;
}
function psSetGrade(g, el) {
psGradeFilter = g;
document.querySelectorAll('.ps-chip').forEach(c => c.className = 'ps-chip');
const suf = g==='all'?'all':g.replace('g-','').replace('+','plus');
el.classList.add('ps-on-' + suf);
psRender();
}
function psSetSort(col, el) {
if (psSortCol === col) psSortDir *= -1;
else { psSortCol = col; psSortDir = 1; }
document.querySelectorAll('.ps-sbtn').forEach(b => b.classList.remove('on'));
el.classList.add('on');
psRender();
}
let ptSortCol = 'score';
let ptSortDir = 1;
let ptSearch  = '';
let ptState   = '';
let ptPrice   = '';
let ptGrade   = '';
function ptRender() {
const tbody = document.getElementById('pt-tbody');
const empty = document.getElementById('pt-empty');
const cnt   = document.getElementById('pt-count');
if (!tbody) return;
if (!scoutProps.length) {
empty.style.display = 'flex';
tbody.innerHTML = '';
if (cnt) cnt.textContent = '0 properties';
return;
}
empty.style.display = 'none';
const q = ptSearch.toLowerCase();
let data = scoutProps.map(p => ({ p, r: scoutCalc(p) })).filter(({p, r}) => {
if (q && !p.address.toLowerCase().includes(q) && !p.suburb.toLowerCase().includes(q)) return false;
if (ptState && p.state !== ptState) return false;
if (ptPrice === 'sub500'   && p.price >= 500000) return false;
if (ptPrice === '500to600' && (p.price < 500000 || p.price >= 600000)) return false;
if (ptPrice === '600to650' && (p.price < 600000 || p.price >= 650000)) return false;
if (ptPrice === '650plus'  && p.price < 650000)  return false;
if (ptGrade !== '' && ptGrade !== 'all') {
const gc = r.rejected ? 'g-d' : 'g-' + scoutGrade(r.total).g.toLowerCase().replace('+','plus');
if (gc !== ptGrade) return false;
}
return true;
});
data.sort((a, b) => {
if (a.r.rejected && !b.r.rejected) return 1;
if (!a.r.rejected && b.r.rejected) return -1;
if (ptSortCol === 'score')   return ptSortDir * (b.r.total - a.r.total);
if (ptSortCol === 'price')   return ptSortDir * (a.p.price - b.p.price);
if (ptSortCol === 'suburb')  return ptSortDir * a.p.suburb.localeCompare(b.p.suburb);
if (ptSortCol === 'address') return ptSortDir * a.p.address.localeCompare(b.p.address);
if (ptSortCol === 'beds')    return ptSortDir * (a.p.beds - b.p.beds);
if (ptSortCol === 'land')    return ptSortDir * (a.p.land - b.p.land);
if (ptSortCol === 'housem2') return ptSortDir * ((b.p.housem2||0) - (a.p.housem2||0));
if (ptSortCol === 'year')    return ptSortDir * (a.p.age - b.p.age);
return 0;
});
if (cnt) cnt.textContent = data.length + ' / ' + scoutProps.length + ' properties';
tbody.innerHTML = data.map(({p, r}) => {
const rejected  = r.rejected;
const grade     = rejected ? {g:'REJ',label:'Reject',cls:'sc-d'} : scoutGrade(r.total);
const gradeCol  = rejected ? 'var(--grade-d)' :
grade.g==='A+'?'var(--grade-aplus)' : grade.g==='A'?'var(--grade-a)' :
grade.g==='B'?'var(--grade-b)'   : grade.g==='C'?'var(--grade-c)' : 'var(--grade-d)';
const scoreCol  = rejected ? 'var(--grade-d)' :
r.total>=80?'#27b389' : r.total>=70?'#3d8ef0' : r.total>=60?'#e08c2a':'#e04a4a';
const priceFmt  = '$' + (p.price/1000).toFixed(0) + 'k';
const priceCls  = p.price <= 650000 ? 'mtg' : 'mtr';
const garageTxt = p.garage==='double'?'2-car':p.garage==='single'?'1-car':'—';
const yearBuilt = p.age ? (2026 - p.age) : '—';
const priceFmt2 = '$' + (p.price/1000).toFixed(0) + 'k';
const priceCls2 = p.price <= 650000 ? 'mtg' : 'mtr';

if (rejected) {
  const reasons = r.rejectReasons.join(' · ');
  return `<tr style="opacity:0.7">
<td style="font-weight:700;color:var(--grade-d)">REJ</td>
<td><span style="font-family:var(--font-h);font-weight:800;font-size:12px;color:var(--grade-d)">REJ</span></td>
<td class="mt-suburb" style="color:var(--grade-d)">${p.address}<br><span style="font-size:10px">${reasons}</span></td>
<td colspan="16" style="color:var(--muted);font-size:11px;font-style:italic">Property rejected — no further analysis required</td>
</tr>`;
}

const floodRisk  = p.flood ? '⚠ Yes — flood overlay present' : 'No';
const bushRisk   = p.bushfire==='extreme'?'⚠ Yes — extreme risk':p.bushfire==='medium'?'Yes — medium risk':p.bushfire==='low'?'Yes — low risk':'No';
const heritageOv = p.heritage ? '⚠ Yes — heritage overlay present' : 'No';
const streetNotes = [
  p.culdesac    && 'Cul-de-sac / dead-end street',
  p.quietstreet && 'Quiet internal street',
  p.nothrough   && 'No through traffic',
  p.oostreet    && 'Owner-occupier dominated street',
  p.maintained  && 'Well-maintained neighbouring homes',
  p.presentation&& 'Good street presentation',
  p.railbacking && '⚠ Rail line backing property',
  p.combacking  && '⚠ Commercial property backing',
].filter(Boolean).join('<br>') || 'No street quality data recorded';
const schoolNotes = [
  p.pri1km   && 'Primary school within 1km',
  p.sec2km   && 'Secondary school within 2km',
  p.multisch && 'Multiple schools nearby',
  p.goodsch  && 'Strong school reputation',
].filter(Boolean).join('<br>') || 'No school proximity data recorded';
const amenityNotes = [
  p.shops5    && 'Shopping centre within 5 min drive',
  p.hosp10    && 'Hospital within 10 min drive',
  p.employ15  && 'Employment hub within 15 min drive',
  p.transport && 'Public transport accessible',
].filter(Boolean).join('<br>') || 'No amenity data recorded';
const riskNotes = [
  (!p.flood)            && 'No flood overlay',
  p.bushfire==='none'   && 'No bushfire risk',
  p.bushfire==='low'    && 'Low bushfire risk',
  p.bushfire==='medium' && '⚠ Medium bushfire risk',
  (!p.heritage)         && 'No heritage overlay',
  p.lowinsurance        && 'Low insurance risk area',
  (!p.crime)            && 'Low crime area',
].filter(Boolean).join('<br>') || 'No risk data recorded';
const bonusNotes = [
  p.corner      && 'Corner block',
  p.subdivision && 'Subdivision potential',
  p.duplex      && 'Duplex development potential',
  p.granny      && 'Granny flat potential',
  p.walkschool  && 'Walkable to school',
  p.walkshops   && 'Walkable to shops',
  p.nbn         && 'NBN FTTP connected',
].filter(Boolean).join('<br>') || '—';
return `<tr>
<td style="font-weight:700;color:${scoreCol}">${r.total}</td>
<td><span style="font-family:var(--font-h);font-weight:800;font-size:12px;color:${gradeCol}">${grade.g}</span></td>
<td class="mt-suburb">${p.address}</td>
<td>${p.suburb}</td>
<td><span class="st-badge st-${p.state||'QLD'}">${p.state||'—'}</span></td>
<td class="${priceCls2}">${priceFmt2}</td>
<td>${p.land}m²</td>
<td>${p.beds}</td>
<td>${p.baths}</td>
<td>${garageTxt}</td>
<td>${yearBuilt}</td>
<td style="color:${p.flood?'var(--grade-d)':'var(--grade-a)'}">${floodRisk}</td>
<td style="color:${p.bushfire&&p.bushfire!=='none'?'var(--grade-d)':'var(--grade-a)'}">${bushRisk}</td>
<td style="color:${p.heritage?'var(--grade-d)':'var(--grade-a)'}">${heritageOv}</td>
<td class="mt-note">${streetNotes}</td>
<td class="mt-note">${schoolNotes}</td>
<td class="mt-note">${amenityNotes}</td>
<td class="mt-note">${riskNotes}</td>
<td class="mt-note">${bonusNotes}</td>
</tr>`;
}).join('');
}
function ptSort(col) {
ptSortDir = (ptSortCol === col) ? ptSortDir * -1 : 1;
ptSortCol = col;
ptRender();
}
function ptReset() {
document.getElementById('pt-search').value  = '';
document.getElementById('pt-state').value   = '';
document.getElementById('pt-price').value   = '';
document.getElementById('pt-grade').value   = '';
ptSearch = ptState = ptPrice = ptGrade = '';
ptRender();
}
function buildScoutCard(p, r, rank, total) {
const rejected = r.rejected;
const grade    = rejected ? {g:'D',label:'Reject',cls:'sc-d'} : scoutGrade(r.total);
const priceFmt = '$' + (p.price/1000).toFixed(0) + 'k';
const sections = rejected ? '' : [
{label:'A  Suburb Quality',   pts:r.A, max:20},
{label:'B  Land & House',     pts:r.B, max:25},
{label:'C  Street Quality',   pts:r.C, max:20},
{label:'D  Schools & Family', pts:r.D, max:10},
{label:'E  Amenities & Jobs', pts:r.E, max:10},
{label:'F  Risk Control',     pts:r.F, max:15},
].map(s => {
const pct = (s.pts/s.max)*100;
const col = pct>=80?'#27b389':pct>=60?'#3d8ef0':pct>=40?'#e08c2a':'#e04a4a';
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
<span class="sc-pill">${p.garage==='double'?'2-car':p.garage==='single'?'1-car':'No'} garage</span>
<span class="sc-pill">${p.age}yr old</span>`;
const suburbInfo = r.suburbData
? `<div class="sc-suburb-name">${r.suburbData.suburb}, ${r.suburbData.state}</div>
<div class="sc-suburb-score">${r.suburbTotal}/100 · ${r.suburbGrade} ${r.suburbLabel}</div>
<div class="sc-suburb-meta">Growth ${r.suburbGrowth}% · ${r.suburbCycle} cycle · Vac ${r.suburbData.vac}%</div>`
: `<div class="sc-suburb-name">${p.suburb||'—'}</div><div class="sc-suburb-score" style="color:var(--muted)">Suburb not in database</div>`;
const rentalLine = r.suburbData ? `Est. $${r.estRentPw}/wk · ${r.suburbData.yield.toFixed(1)}% suburb yield` : '—';
const growthLine = r.suburbData ? `${r.suburbGrowth}% annual · ${r.suburbCycle} cycle` : '—';
const photoHtml  = p.photo
? `<img src="${p.photo}" onerror="this.parentNode.classList.add('sc-photo-err');this.style.display='none'">`
: `<div class="sc-photo-placeholder"><span>${p.suburb||'?'}</span></div>`;
const bonusLine  = r.bonus>0 ? `<span class="sc-bonus-badge">+${r.bonus} bonus</span>` : '';
const gradeColor = grade.g==='A+'?'var(--grade-aplus)':grade.g==='A'?'var(--grade-a)':
grade.g==='B'?'var(--grade-b)':grade.g==='C'?'var(--grade-c)':'var(--grade-d)';
return `
<div class="sc-card ${rejected?'sc-card-rejected':grade.cls}">
<div class="sc-card-top">
<div class="sc-rank-badge">#${rank} of ${total}</div>
<button class="sc-edit-btn" onclick="scoutOpenForm(${p.id})">Edit</button>
<button class="sc-del-btn"  onclick="scoutDelete(${p.id})">✕</button>
</div>
<div class="sc-card-body">
<div class="sc-left">
<div class="sc-address-row">
<div class="sc-address">${p.address||'—'}</div>
<div class="sc-price-tag">${priceFmt}</div>
</div>
${rejected
? `<div class="sc-reject-list">${r.rejectReasons.map(x=>`<div class="sc-reject-item">✕ ${x}</div>`).join('')}</div>`
: `<div class="sc-score-header">
<div class="sc-total-num" style="color:${gradeColor}">${r.total}</div>
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
${(p.corner||p.subdivision||p.duplex||p.granny)?`<div class="sc-analysis-item"><div class="sc-ai-label">Upside</div><div class="sc-ai-val">${[p.corner?'Corner':null,p.subdivision?'Subdiv.':null,p.duplex?'Duplex':null,p.granny?'Granny flat':null].filter(Boolean).join(' · ')}</div></div>`:''}
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
function buildScoutBlock(p, r, rank, total) {
const rejected = r.rejected;
const priceFmt = '$' + (p.price/1000).toFixed(0) + 'k';
if (rejected) {
  return `<div class="ps-block sc-card-rejected" style="animation-delay:${Math.min((rank-1)*0.04,0.5)}s">
  <div class="psb-l">
    <div class="psb-rank">#${rank}</div>
    <div class="psb-gbig" style="color:var(--grade-d)">REJ</div>
  </div>
  <div class="psb-info" style="flex:1;border-right:none">
    <div class="psb-addr">${p.address||'—'}</div>
    <div class="psb-meta">${p.suburb||'—'}${p.state?', '+p.state:''} · ${priceFmt}</div>
    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:6px">
      ${r.rejectReasons.map(x=>`<span class="psb-ritem">✕ ${x}</span>`).join('')}
    </div>
  </div>
</div>`;
}
const grade      = scoutGrade(r.total);
const gradeColor = grade.g==='A+'?'var(--grade-aplus)':grade.g==='A'?'var(--grade-a)':
                   grade.g==='B'?'var(--grade-b)':grade.g==='C'?'var(--grade-c)':'var(--grade-d)';
const catHtml = `<div class="psb-cats">${[
      {l:'A  Suburb', p:r.A, m:20},
      {l:'B  Land',   p:r.B, m:25},
      {l:'C  Street', p:r.C, m:20},
      {l:'D  Schools',p:r.D, m:10},
      {l:'E  Amenity',p:r.E, m:10},
      {l:'F  Risk',   p:r.F, m:15},
    ].map(s=>{
      const pct=(s.p/s.m)*100;
      const col=pct>=80?'#27b389':pct>=60?'#3d8ef0':pct>=40?'#e08c2a':'#e04a4a';
      return `<div class="psb-cat">
        <div class="psb-cl">${s.l}</div>
        <div class="psb-cbw"><div class="psb-cb" style="width:${pct}%;background:${col}"></div></div>
        <div class="psb-cp" style="color:${col}">${s.p}/${s.m}</div>
      </div>`;
    }).join('')}</div>`;
const subColor = r.suburbTotal>=75?'var(--grade-a)':r.suburbTotal>=60?'var(--grade-b)':'var(--muted2)';
const subHtml  = `
  <div class="psb-suburb">
    <div class="psb-sn">${r.suburbData?r.suburbData.suburb:p.suburb||'—'}</div>
    <div class="psb-ss" style="color:${subColor}">${r.suburbTotal||'—'}/100 · ${r.suburbGrade||'—'}</div>
    ${r.suburbData?`<div class="psb-si">${r.suburbData.yield.toFixed(1)}% yield · $${r.estRentPw}/wk</div>
    <div class="psb-si">${r.suburbGrowth}% growth · ${r.suburbCycle}</div>`:'<div class="psb-si" style="color:#e04a4a">Not in database</div>'}
  </div>`;
const bonusHtml = r.bonus>0 ? `<div class="psb-bonus">+${r.bonus} bonus</div>` : '';
const photoHtml = p.photo
  ? `<img src="${p.photo}" alt="" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
  : '';
return `<div class="ps-block ${grade.cls}" style="animation-delay:${Math.min((rank-1)*0.04,0.5)}s">
  <div class="psb-l">
    <div class="psb-rank">#${rank}</div>
    <div class="psb-gbig" style="color:${gradeColor}">${grade.g}</div>
  </div>
  <div class="psb-photo">${photoHtml}<div class="psb-photo-ph" style="display:${p.photo?'none':'flex'}"><span>🏠</span><div>${p.suburb||''}</div></div></div>
  <div class="psb-info">
    <div class="psb-addr">${p.address||'—'}</div>
    <div class="psb-meta">${p.suburb||'—'}${p.state?', '+p.state:''}</div>
    <div class="psb-pills">
      <span class="sc-pill">${p.beds}bd</span>
      <span class="sc-pill">${p.baths}ba</span>
      <span class="sc-pill">${p.land}m²</span>
      <span class="sc-pill">${priceFmt}</span>
      ${p.garage==='double'?'<span class="sc-pill">2-car</span>':''}
    </div>
  </div>
  ${catHtml}
  ${subHtml}
  <div class="psb-score-col">
    <div class="psb-tot" style="color:${gradeColor}">${r.total}</div>
    <div class="psb-slbl">/100</div>
    ${bonusHtml}
  </div>
</div>`;
}
function scoutOpenForm(editId) {
document.getElementById('scout-modal').style.display = 'flex';
document.body.style.overflow = 'hidden';
if (editId) {
const existing = scoutProps.find(p => p.id === editId);
if (existing) scoutPopulateForm(existing);
document.getElementById('scout-form-edit-id').value = editId;
} else {
scoutResetForm();
document.getElementById('scout-form-edit-id').value = '';
}
}
function scoutCloseForm() {
document.getElementById('scout-modal').style.display = 'none';
document.body.style.overflow = '';
}
function scoutResetForm() {
document.getElementById('scout-form').reset();
document.querySelectorAll('.sc-toggle').forEach(btn => btn.classList.remove('sc-tog-yes'));
scoutSetRadio('type',    'house');
scoutSetRadio('garage',  'double');
scoutSetRadio('bushfire','none');
}
function scoutToggle(btn) { btn.classList.toggle('sc-tog-yes'); }
function scoutRadio(group, val, el) {
document.querySelectorAll('[data-radio="'+group+'"]').forEach(b => b.classList.remove('sc-tog-yes'));
if (el) el.classList.add('sc-tog-yes');
document.getElementById('scout-r-'+group).value = val;
}
function scoutSetRadio(group, val) {
document.querySelectorAll('[data-radio="'+group+'"]').forEach(b => {
b.classList.toggle('sc-tog-yes', b.dataset.val === val);
});
const el = document.getElementById('scout-r-'+group);
if (el) el.value = val;
}
function scoutReadForm() {
const v   = id => document.getElementById(id);
const tog = id => { const el = document.getElementById(id); return el ? el.classList.contains('sc-tog-yes') : false; };
return {
address:     v('sf-address').value.trim(),
suburb:      v('sf-suburb').value.trim(),
state:       v('sf-state').value,
price:       parseInt(v('sf-price').value)||0,
type:        document.querySelector('[data-radio="type"].sc-tog-yes')?.dataset.val||'house',
beds:        parseInt(v('sf-beds').value)||3,
baths:       parseInt(v('sf-baths').value)||2,
land:        parseInt(v('sf-land').value)||0,
garage:      document.querySelector('[data-radio="garage"].sc-tog-yes')?.dataset.val||'double',
age:         parseInt(v('sf-age').value)||20,
photo:       v('sf-photo').value.trim(),
flood:       tog('sf-flood'),
heritage:    tog('sf-heritage'),
structural:  tog('sf-structural'),
crime:       tog('sf-crime'),
mainroad:    tog('sf-mainroad'),
industrial:  tog('sf-industrial'),
poorStreet:  tog('sf-poorstreet'),
bushfire:    (function(){
const lvl = v('scout-r-bushfire').value||'none';
const hardEl = document.getElementById('sf-bushfire-hard');
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
const v    = id => document.getElementById(id);
const setT = (id, val) => { const el=document.getElementById(id); if(el){el.classList.toggle('sc-tog-yes',!!val);} };
v('sf-address').value = p.address;
v('sf-suburb').value  = p.suburb;
v('sf-state').value   = p.state;
v('sf-price').value   = p.price;
v('sf-beds').value    = p.beds;
v('sf-baths').value   = p.baths;
v('sf-land').value    = p.land;
v('sf-age').value     = p.age;
v('sf-photo').value   = p.photo||'';
['flood','heritage','structural','crime','mainroad','industrial','poorstreet',
'culdesac','quietstreet','nothrough','oostreet','maintained','presentation',
'railbacking','combacking','pri1km','sec2km','multisch','goodsch',
'shops5','hosp10','employ15','transport','lowinsurance',
'corner','subdivision','duplex','granny','walkschool','walkshops','nbn'
].forEach(f => setT('sf-'+f, p[f]));
scoutSetRadio('type',    p.type||'house');
scoutSetRadio('garage',  p.garage||'double');
scoutSetRadio('bushfire',p.bushfire||'none');
}
function scoutSubmitForm() {
const p = scoutReadForm();
if (!p.address) { alert('Enter a property address.'); return; }
if (!p.price)   { alert('Enter the purchase price.'); return; }
if (!p.land)    { alert('Enter the land size (m²).'); return; }
const editId = parseInt(document.getElementById('scout-form-edit-id').value)||0;
if (editId) {
const idx = scoutProps.findIndex(x => x.id===editId);
if (idx>=0) scoutProps[idx] = {...p, id:editId};
} else {
scoutProps.push({...p, id:scoutNextId++});
}
ptSave();
scoutCloseForm();
ptRender();
psRender();
}
function scoutDelete(id) {
if (!confirm('Remove this property?')) return;
scoutProps = scoutProps.filter(p => p.id !== id);
ptSave();
ptRender();
psRender();
}
ptLoad();
document.body.appendChild(document.getElementById('scout-modal'));
