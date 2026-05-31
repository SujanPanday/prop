/* © 2026 AusPropertyIQ. All rights reserved. */
function scoreVacancy(vac) {
return vac < 1.0 ? 15 : vac < 1.5 ? 12 : vac < 2.0 ? 9 : vac < 2.5 ? 5 : 0;
}
function scoreDSR(dsr) {
return dsr >= 70 ? 15 : dsr >= 63 ? 12 : dsr >= 58 ? 9 : dsr >= 55 ? 5 : dsr >= 52 ? 2 : 0;
}
function scoreInfraJobs(infraJobs) {
switch (infraJobs) {
case 'major':    return 10;
case 'strong':   return  8;
case 'moderate': return  5;
case 'weak':     return  2;
default:         return  0;
}
}
function scoreCycle(cycle) {
switch (cycle) {
case 'Early':     return 10;
case 'Early-Mid': return  8;
case 'Mid':       return  6;
case 'Late':      return  2;
case 'Peak':      return  0;
default:          return  6;
}
}
function scoreGrowthQuality(growth, cycle) {
const early = cycle === 'Early' || cycle === 'Early-Mid';
if (early) {
if (growth >= 10) return 10;
if (growth >=  7) return  8;
if (growth >=  5) return  6;
return 4;
}
if (growth >= 15 && growth <= 25) return  8;
if (growth >= 10 && growth <  15) return  6;
if (growth >  25 && growth <= 35) return  6;
if (growth >=  7 && growth <  10) return  3;
if (growth >  35)                 return  2;
return 0;
}
function scoreYield(y) {
return y >= 6.5 ? 5 : y >= 6.0 ? 4 : y >= 5.5 ? 3 : y >= 5.0 ? 2 : y >= 4.5 ? 1 : 0;
}
function scoreYieldQuality(y, vac) {
if (y >= 6.0 && vac < 1.0) return 5;
if (y >= 5.5 && vac < 1.5) return 4;
if (y >= 5.0 && vac < 2.0) return 3;
if (y >= 4.5)               return 2;
return 0;
}
function scoreOwnerOcc(dsr, vac) {
if (dsr >= 65 && vac < 0.5) return 10;
if (dsr >= 60 && vac < 1.0) return  8;
if (dsr >= 55 && vac < 1.5) return  5;
if (dsr >= 52 && vac < 2.0) return  2;
return 0;
}
function scoreCrime(crime) {
switch (crime) {
case 'very_low': return 3;
case 'low':      return 2;
case 'average':  return 1;
case 'high':     return 0;
default:         return 0;
}
}
function scoreDOM(dom) {
if (dom === null || dom === undefined || dom === '') return 0;
if (dom < 30)  return 2;
if (dom <= 45) return 1;
return 0;
}
const CITY_POP = {
'Perth SE':95,'Perth NE':175,'Perth North':240,'Perth South':85,
'Rockingham':150,'Kwinana':52,'Mandurah':95,'Murray':15,
'Bunbury':75,'Collie':8,'Narrogin':6,'Northam':8,
'Merredin':3,'Manjimup':5,'Mount Barker':4,'Geraldton':40,
'Kalgoorlie':30,'Port Hedland':15,'Albany':35,'Karratha':28,
'Esperance':14,'Broome':17,'Newman':7,'Carnarvon':6,
'Tom Price':4,'Denmark':5,'Busselton':45,
'Indian Ocean Drive':5,'Gingin':3,'Dongara':3,'Exmouth':3,
'Townsville':200,'Rockhampton':85,'Mackay':120,'Toowoomba':175,
'Bundaberg':100,'Cairns':170,'Cairns region':170,'Gladstone':65,
'Emerald':15,'Roma':7,'Dalby':12,'Chinchilla':6,
'Kingaroy':10,'Nanango':4,'Goondiwindi':7,'Wondai':2,
'Murgon':3,'Maryborough':30,'Innisfail':8,'Warwick':14,
'Gympie':25,'Hervey Bay':60,'Caboolture':70,
'Logan':350,'Ipswich':250,'Moreton Bay':490,'Brisbane':2600,
'Charters Towers':8,'Mount Isa':18,'Bowen':10,'Whitsunday':35,
'Burdekin':18,'Hinchinbrook':11,'Atherton Tablelands':25,
'Cassowary Coast':18,'Cloncurry':4,'Blackwater':5,'Biloela':6,
'Lockyer Valley':45,'Scenic Rim':42,'Granite Belt':12,
'Western Downs':35,'Longreach':3,'Charleville':3,
'North Burnett':6,'Winton':1,
'Dubbo':45,'Wagga Wagga':65,'Orange':40,'Bathurst':40,
'Blayney':8,'Lithgow':20,'Leeton':8,'Griffith':25,
'Temora':5,'Cootamundra':7,'Young':8,'Inverell':12,
'Glen Innes':9,'Moree':10,'Narrabri':12,'Tamworth':60,
'Kempsey':13,'Port Macquarie':50,'Taree':17,'Forster':20,
'Grafton':22,'Casino':10,'Lismore':45,'Ballina':45,
'Muswellbrook':15,'Cessnock':55,'Maitland':85,'Newcastle':330,
'Port Stephens':75,'Albury':55,'Goulburn':23,'Queanbeyan':45,
'Yass':8,'Tumut':6,'Cooma':10,'Bega Valley':35,
'Coffs Harbour':75,'Nambucca':20,'Shoalhaven':110,
'Wollongong':290,'Shellharbour':80,'Central Coast':340,
'Lake Macquarie':210,'Broken Hill':17,'Cobar':5,
'Deniliquin':7,'Federation':12,'Quirindi':3,
'Armidale':25,'Gunnedah':8,'Singleton':25,
'Albury-Wodonga':100,
'Bendigo':115,'Heathcote':3,'Castlemaine':10,'Shepparton':65,
'Tatura':4,'Numurkah':4,'Benalla':10,'Euroa':4,
'Seymour':8,'Rochester':3,'Echuca':15,'Kyabram':7,
'Ararat':8,'Horsham':20,'Hamilton':10,'Portland':10,
'Warrnambool':35,'Colac':12,'Camperdown':4,'Stawell':5,
'Swan Hill':10,'Mildura':55,'Moe':15,'Morwell':15,
'Churchill':6,'Sale':15,'Bairnsdale':14,'Traralgon':25,
'Warragul':20,'Drouin':15,'Leongatha':5,
'Ballarat':115,'Geelong':270,'Wangaratta':20,
'Yarrawonga':7,'Cobram':6,'Alpine':5,'Mansfield':4,
'Murrindindi':6,'Hepburn':5,'Upper Murray':2,
'Moe-Newborough':15,'Maryborough':8,
'Loxton':4,'Berri':8,'Renmark':8,'Waikerie':3,
'Port Lincoln':15,'Whyalla':22,'Mount Gambier':30,
'Port Pirie':17,'Murray Bridge':20,'Victor Harbor':18,
'Gawler':30,'Barossa Valley':25,'Clare Valley':8,'Clare':4,
'Copper Coast':15,'Naracoorte':5,'Mount Barker SA':35,
'Port Augusta':13,'Coober Pedy':2,'Adelaide North':350,
'Hobart':240,'Launceston':110,'Devonport':30,'George Town':7,
'Darwin':150,'Alice Springs':25,'Katherine':10,'Tennant Creek':3,
};
function scorePopulation(city) {
const pop = CITY_POP[city] || 15;
if (pop >= 100)  return 8;
if (pop >= 50)   return 7;
if (pop >= 30)   return 6;
if (pop >= 20)   return 4;
if (pop >= 10)   return 2;
return 0;
}
function scoreDiversification(infraJobs) {
switch (infraJobs) {
case 'major':    return 7;
case 'strong':   return 5;
case 'moderate': return 3;
case 'weak':     return 1;
default:         return 0;
}
}
function scoreMasterSuburb(s) {
const sc = {};
sc.vacancy        = scoreVacancy(s.vac);
sc.dsr            = scoreDSR(s.dsr);
sc.infraJobs      = scoreInfraJobs(s.infraJobs);
sc.cycle          = scoreCycle(s.cycle);
sc.growthQual     = scoreGrowthQuality(s.growth, s.cycle);
sc.yield_         = scoreYield(s.yield);
sc.yieldQual      = scoreYieldQuality(s.yield, s.vac);
sc.ownerOcc       = scoreOwnerOcc(s.dsr, s.vac);
sc.crime          = scoreCrime(s.crime);
sc.dom            = scoreDOM(s.dom);
sc.population     = scorePopulation(s.city);
sc.diversification = scoreDiversification(s.infraJobs);
sc.demandSupply   = sc.vacancy + sc.dsr;
sc.growthDrivers  = sc.infraJobs + sc.cycle;
sc.growthQuality  = sc.growthQual;
sc.cashFlow       = sc.yield_ + sc.yieldQual;
sc.ownerOccTotal  = sc.ownerOcc;
sc.riskControl    = sc.crime + sc.dom;
sc.marketQuality  = sc.population + sc.diversification;
sc.total = sc.demandSupply + sc.growthDrivers + sc.growthQuality +
sc.cashFlow + sc.ownerOccTotal + sc.riskControl + sc.marketQuality;
// Strict reject conditions — any one forces grade D
const pop = CITY_POP[s.city] || 15;
sc.rejectReasons = [];
if (s.vac > 2.5)              sc.rejectReasons.push('Vacancy > 2.5%');
if (s.price > 650000)         sc.rejectReasons.push('Median price > $650k');
if (pop < 25)                 sc.rejectReasons.push('Population < 25k');
if (s.yield < 3.5)            sc.rejectReasons.push('Yield < 3.5%');
if (s.dsr < 50)               sc.rejectReasons.push('DSR < 50');
if (s.cycle === 'Peak')       sc.rejectReasons.push('Market cycle: Peak');
if (s.infraJobs === 'weak')   sc.rejectReasons.push('Economic diversification: Weak');
if (sc.rejectReasons.length)  sc.total = 0;
return sc;
}
function getGrade(total) {
if (total >= 90) return { grade: 'A+', label: 'Elite Buy',        cls: 'g-aplus', chipSuffix: 'aplus' };
if (total >= 75) return { grade: 'A',  label: 'Strong Buy',       cls: 'g-a',     chipSuffix: 'a'     };
if (total >= 60) return { grade: 'B',  label: 'Good Opportunity', cls: 'g-b',     chipSuffix: 'b'     };
if (total >= 45) return { grade: 'C',  label: 'Watchlist',        cls: 'g-c',     chipSuffix: 'c'     };
return                   { grade: 'D',  label: 'Reject',           cls: 'g-d',     chipSuffix: 'd'     };
}
function scoreColor(pts, max) {
const pct = pts / max;
if (pct >= 0.8) return '#27b389';
if (pct >= 0.6) return '#3d8ef0';
if (pct >= 0.4) return '#e08c2a';
return '#e04a4a';
}
function totalScoreColor(total) {
if (total >= 90) return 'var(--grade-aplus)';
if (total >= 75) return 'var(--grade-a)';
if (total >= 60) return 'var(--grade-b)';
if (total >= 45) return 'var(--grade-c)';
return 'var(--grade-d)';
}
