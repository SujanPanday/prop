// ─────────────────────────────────────────────
//  SCORING ENGINE — 100 points total
//  Edit thresholds here to update the model.
// ─────────────────────────────────────────────

const VACANCY_RULES = [
  { max: 1.0, pts: 15 },
  { max: 1.5, pts: 12 },
  { max: 2.0, pts:  9 },
  { max: 2.5, pts:  5 },
  { max: Infinity, pts: 0 },
];

const YIELD_RULES = [
  { min: 6.0, pts: 10 },
  { min: 5.5, pts:  8 },
  { min: 5.0, pts:  6 },
  { min: 4.5, pts:  3 },
  { min: 0,   pts:  0 },
];

const SUPPLY_PTS      = { very_limited: 15, low: 12, balanced: 8, large_release: 3, oversupply: 0 };
const INFRA_PTS       = { major: 15, strong: 12, moderate: 8, minimal: 3, none: 0 };
const POP_PTS         = { strong: 15, good: 12, moderate: 8, flat: 3, declining: 0 };
const RENT_PTS        = { explosive: 10, strong: 8, moderate: 5, flat: 2, falling: 0 };
const OWNER_OCC_PTS   = { strong: 10, good: 8, moderate: 5, mostly_investor: 2, poor: 0 };
const ECO_DIV_PTS     = { highly_diversified: 5, moderate: 3, single: 0 };
const NATURAL_RISK_PTS = { low: 5, moderate: 3, high: 0 };

function scoreSuburb(s) {
  const sc = {};

  // 1a. Vacancy Rate (15 pts — lower is better)
  for (const rule of VACANCY_RULES) {
    if (s.vacancyRate < rule.max) { sc.vacancy = rule.pts; break; }
  }

  // 1b. Supply Risk (15 pts)
  sc.supply = SUPPLY_PTS[s.supplyRisk] ?? 8;

  // 2a. Infrastructure & Jobs (15 pts)
  sc.infra = INFRA_PTS[s.infraJobs] ?? 8;

  // 2b. Population & Migration (15 pts)
  sc.population = POP_PTS[s.popGrowth] ?? 8;

  // 3a. Gross Yield (10 pts)
  sc.yield_ = 0;
  for (const rule of YIELD_RULES) {
    if (s.grossYield >= rule.min) { sc.yield_ = rule.pts; break; }
  }

  // 3b. Rent Growth Momentum (10 pts)
  sc.rentGrowth = RENT_PTS[s.rentGrowth] ?? 5;

  // 4. Owner Occupier & Desirability (10 pts)
  sc.ownerOcc = OWNER_OCC_PTS[s.ownerOccupier] ?? 5;

  // 5a. Economic Diversity (5 pts)
  sc.ecoDiversity = ECO_DIV_PTS[s.ecoDiversity] ?? 3;

  // 5b. Natural/Crime Risk (5 pts)
  sc.naturalRisk = NATURAL_RISK_PTS[s.naturalRisk] ?? 3;

  // Category subtotals (used for display and sorting)
  sc.demandSupply  = sc.vacancy + sc.supply;
  sc.growthDrivers = sc.infra + sc.population;
  sc.cashFlow      = sc.yield_ + sc.rentGrowth;
  sc.ownerOccTotal = sc.ownerOcc;
  sc.riskControl   = sc.ecoDiversity + sc.naturalRisk;

  sc.total = sc.demandSupply + sc.growthDrivers + sc.cashFlow + sc.ownerOccTotal + sc.riskControl;

  return sc;
}

function getGrade(total) {
  if (total >= 90) return { grade: 'A+', label: 'Elite Buy',        cls: 'g-aplus', chipSuffix: 'aplus' };
  if (total >= 80) return { grade: 'A',  label: 'Strong Buy',       cls: 'g-a',     chipSuffix: 'a'     };
  if (total >= 70) return { grade: 'B',  label: 'Good Opportunity', cls: 'g-b',     chipSuffix: 'b'     };
  if (total >= 60) return { grade: 'C',  label: 'Watchlist',        cls: 'g-c',     chipSuffix: 'c'     };
  return                   { grade: 'D',  label: 'Reject',           cls: 'g-d',     chipSuffix: 'd'     };
}

// Returns a CSS colour based on score as a fraction of max
function scoreColor(pts, max) {
  const pct = pts / max;
  if (pct >= 0.8)  return '#27b389';
  if (pct >= 0.6)  return '#3d8ef0';
  if (pct >= 0.4)  return '#e08c2a';
  return '#e04a4a';
}

function totalScoreColor(total) {
  if (total >= 90) return 'var(--grade-aplus)';
  if (total >= 80) return 'var(--grade-a)';
  if (total >= 70) return 'var(--grade-b)';
  if (total >= 60) return 'var(--grade-c)';
  return 'var(--grade-d)';
}
