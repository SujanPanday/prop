// ─────────────────────────────────────────────
//  SCORING ENGINE — 100 points total
//  Works with MASTER_SUBURBS schema:
//    vac (vacancy %), yield (gross yield %),
//    growth (annual growth %), dsr (0-100),
//    cycle ("Early"|"Mid"|"Late")
// ─────────────────────────────────────────────

// 1a. Vacancy Rate → 15 pts (lower = better)
function scoreVacancy(vac) {
  return vac < 1.0 ? 15 : vac < 1.5 ? 12 : vac < 2.0 ? 9 : vac < 2.5 ? 5 : 0;
}

// 1b. DSR / Supply-Demand Ratio → 15 pts
function scoreDSR(dsr) {
  return dsr >= 70 ? 15 : dsr >= 63 ? 12 : dsr >= 58 ? 9 : dsr >= 55 ? 5 : dsr >= 52 ? 2 : 0;
}

// 2a. Annual Capital Growth % → 15 pts
function scoreGrowth(growth) {
  return growth >= 25 ? 15 : growth >= 20 ? 12 : growth >= 15 ? 9 : growth >= 10 ? 6 : growth >= 7 ? 3 : 0;
}

// 2b. Market Cycle → 15 pts  (Early = most upside)
function scoreCycle(cycle) {
  return cycle === 'Early' ? 15 : cycle === 'Mid' ? 9 : 3;
}

// 3a. Gross Yield % → 10 pts
function scoreYield(y) {
  return y >= 6.5 ? 10 : y >= 6.0 ? 9 : y >= 5.5 ? 7 : y >= 5.0 ? 5 : y >= 4.5 ? 2 : 0;
}

// 3b. Yield Quality (sustainable cash flow) → 10 pts
//     High yield is only sustainable if the market is also tight
function scoreYieldQuality(y, vac) {
  if (y >= 6.0 && vac < 1.0) return 10;
  if (y >= 5.5 && vac < 1.5) return 8;
  if (y >= 5.0 && vac < 2.0) return 5;
  if (y >= 4.5)               return 3;
  return 0;
}

// 4. Owner Occupier Proxy → 10 pts
//    Tight vacancy + strong DSR = high owner-occ competition
function scoreOwnerOcc(dsr, vac) {
  if (dsr >= 65 && vac < 0.5) return 10;
  if (dsr >= 60 && vac < 1.0) return 8;
  if (dsr >= 55 && vac < 1.5) return 5;
  if (dsr >= 52 && vac < 2.0) return 2;
  return 0;
}

// 5a. Cycle Risk → 5 pts (Early cycle = lower downside risk)
function scoreCycleRisk(cycle) {
  return cycle === 'Early' ? 5 : cycle === 'Mid' ? 3 : 1;
}

// 5b. Market Tightness Risk → 5 pts (tight = low vacancy risk)
function scoreVacRisk(vac) {
  return vac < 0.5 ? 5 : vac < 1.0 ? 4 : vac < 2.0 ? 3 : vac < 3.0 ? 1 : 0;
}

// ─── MAIN SCORER ─────────────────────────────

function scoreMasterSuburb(s) {
  const sc = {};

  sc.vacancy     = scoreVacancy(s.vac);
  sc.dsr         = scoreDSR(s.dsr);
  sc.growth      = scoreGrowth(s.growth);
  sc.cycle       = scoreCycle(s.cycle);
  sc.yield_      = scoreYield(s.yield);
  sc.yieldQual   = scoreYieldQuality(s.yield, s.vac);
  sc.ownerOcc    = scoreOwnerOcc(s.dsr, s.vac);
  sc.cycleRisk   = scoreCycleRisk(s.cycle);
  sc.vacRisk     = scoreVacRisk(s.vac);

  // Category subtotals for display + sorting
  sc.demandSupply  = sc.vacancy + sc.dsr;          // max 30
  sc.growthDrivers = sc.growth  + sc.cycle;         // max 30
  sc.cashFlow      = sc.yield_  + sc.yieldQual;    // max 20
  sc.ownerOccTotal = sc.ownerOcc;                   // max 10
  sc.riskControl   = sc.cycleRisk + sc.vacRisk;    // max 10

  sc.total = sc.demandSupply + sc.growthDrivers + sc.cashFlow + sc.ownerOccTotal + sc.riskControl;
  return sc;
}

// ─── GRADE + COLOUR HELPERS ──────────────────

function getGrade(total) {
  if (total >= 90) return { grade: 'A+', label: 'Elite Buy',        cls: 'g-aplus', chipSuffix: 'aplus' };
  if (total >= 80) return { grade: 'A',  label: 'Strong Buy',       cls: 'g-a',     chipSuffix: 'a'     };
  if (total >= 70) return { grade: 'B',  label: 'Good Opportunity', cls: 'g-b',     chipSuffix: 'b'     };
  if (total >= 60) return { grade: 'C',  label: 'Watchlist',        cls: 'g-c',     chipSuffix: 'c'     };
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
  if (total >= 80) return 'var(--grade-a)';
  if (total >= 70) return 'var(--grade-b)';
  if (total >= 60) return 'var(--grade-c)';
  return 'var(--grade-d)';
}
