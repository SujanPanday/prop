// ============================================================
//  AusPropertyIQ — Suburb Data File
//  Edit this file to add/remove suburbs.
//  Each suburb has these fields:
//    suburb      : string  — suburb name
//    city        : string  — city/region
//    state       : string  — NSW / QLD / VIC / WA / SA / TAS
//    price       : number  — typical/median value in AUD
//    yield_      : number  — gross rental yield %
//    growth      : number  — annual capital growth % (last 12m)
//    vac         : number  — vacancy rate %
//    dsr         : number  — Demand to Supply Ratio (0–100)
//    migPos      : bool    — true = positive net migration
//    ecoDiv      : bool    — true = diversified economy
//    eco         : string  — economy description
//    cycleStage  : string  — "early" | "mid" | "late" | "peak"
//                   early = just starting, most upside ahead
//                   mid   = in growth phase, still good value
//                   late  = well into cycle, slowing
//                   peak  = at or near top, risk of correction
//    note        : string  — investment notes
// ============================================================

const SUBURBS = [

  // ─────────────────────────────────────────────
  // ROCKHAMPTON QLD
  // ─────────────────────────────────────────────
  {
    suburb:"Allenstown", city:"Rockhampton", state:"QLD",
    price:564400, yield_:5.11, growth:22, vac:0.51, dsr:54,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"Top pick. All core criteria met. Very tight vacancy, excellent yield, strong growth. Defence, health, agriculture, and services create diversified demand. Flood check required on specific streets before buying."
  },
  {
    suburb:"Berserker", city:"Rockhampton", state:"QLD",
    price:580500, yield_:4.96, growth:22, vac:0.79, dsr:55,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"Best value entry point in Rocky. Good yield, strong growth. Older Queenslander stock — factor in maintenance costs. Flood check required on some streets."
  },
  {
    suburb:"Park Avenue", city:"Rockhampton", state:"QLD",
    price:590600, yield_:5.17, growth:24, vac:0.61, dsr:58,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"SPI FAST 50 listed. Highest growth in Rocky. DSR 58 confirms tight supply. Approaching $600k — move before hitting budget ceiling. Flood check required."
  },
  {
    suburb:"Koongal", city:"Rockhampton", state:"QLD",
    price:546500, yield_:5.03, growth:13, vac:0.77, dsr:54,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"Solid but slower growth than peers. Good defensive play within Rocky. Flood check required."
  },
  {
    suburb:"Frenchville", city:"Rockhampton", state:"QLD",
    price:635000, yield_:4.79, growth:16, vac:1.0, dsr:56,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"Premium Rocky suburb. Median approaching $640k — harder to find sub-$650k stock. Yield borderline. Better suited to $700k+ budget."
  },
  {
    suburb:"Rockhampton City", city:"Rockhampton", state:"QLD",
    price:456100, yield_:6.02, growth:20, vac:0.95, dsr:50,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Ag / Services",
    cycleStage:"mid",
    note:"Cheapest Rocky entry with highest yield at 6.02%. DSR 50 is borderline — supply slightly looser but overall fundamentals remain strong."
  },

  // ─────────────────────────────────────────────
  // BUNDABERG QLD (from shortlist + DSR data)
  // ─────────────────────────────────────────────
  {
    suburb:"Kepnok", city:"Bundaberg", state:"QLD",
    price:520000, yield_:3.7, growth:15, vac:1.8, dsr:54,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"Original shortlist suburb. Fails on yield at 3.7% — well below 4.5% threshold. Better Bundaberg options exist within the same city (Norville, Millbank, Walkervale)."
  },
  {
    suburb:"Walkervale", city:"Bundaberg", state:"QLD",
    price:642300, yield_:4.97, growth:13, vac:0.85, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"From shortlist and DSR data. DSR 57, 0.85% vacancy, 4.97% yield. Solid fundamentals. City population growing at 1.9% pa. Better yield than Kepnok."
  },
  {
    suburb:"Bundaberg North", city:"Bundaberg", state:"QLD",
    price:660000, yield_:5.40, growth:13, vac:0.43, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"DSR confirmed at 57. 0.43% vacancy is extremely tight. Yield 5.4% is solid. Growth 13% passes threshold. Slightly over $650k budget ceiling."
  },
  {
    suburb:"Bundaberg South", city:"Bundaberg", state:"QLD",
    price:652900, yield_:5.50, growth:13, vac:0.34, dsr:55,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"Strong yield at 5.5% and very tight 0.34% vacancy. At budget ceiling. Good alternative to Bundaberg North."
  },
  {
    suburb:"Norville", city:"Bundaberg", state:"QLD",
    price:616100, yield_:5.08, growth:13, vac:0.57, dsr:59,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"DSR 59 — stronger than Kepnok. 0.57% vacancy, 5.08% yield. Recommended swap for Kepnok. Under $650k budget."
  },
  {
    suburb:"Millbank", city:"Bundaberg", state:"QLD",
    price:647100, yield_:4.99, growth:13, vac:0.12, dsr:60,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Healthcare",
    cycleStage:"mid",
    note:"DSR 60 — highest in Bundaberg. Remarkable 0.12% vacancy — essentially zero. Yield just under 5%. Exceptional supply tightness."
  },
  {
    suburb:"Granville", city:"Maryborough", state:"QLD",
    price:648000, yield_:4.96, growth:14, vac:0.33, dsr:63,
    migPos:true, ecoDiv:true, eco:"Services / Port / Heritage",
    cycleStage:"mid",
    note:"Highest DSR in the QLD DSR data at 63. 0.33% vacancy, 14% growth. Very tight supply confirmed. At budget ceiling."
  },
  {
    suburb:"Maryborough", city:"Maryborough", state:"QLD",
    price:628700, yield_:4.79, growth:13, vac:0.63, dsr:56,
    migPos:true, ecoDiv:true, eco:"Services / Heritage / Manufacturing",
    cycleStage:"mid",
    note:"Historic river city. DSR 56, 0.63% vacancy, 13% growth. Yield borderline at 4.79%. Watch closely."
  },

  // ─────────────────────────────────────────────
  // GERALDTON WA (from shortlist + DSR data)
  // ─────────────────────────────────────────────
  {
    suburb:"Wonthella", city:"Geraldton", state:"WA",
    price:587500, yield_:5.22, growth:18, vac:0.34, dsr:58,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"From shortlist. DSR 58 confirmed. Very tight vacancy 0.34%. Solid yield and growth. Mining economy concentration adds risk."
  },
  {
    suburb:"Wandina", city:"Geraldton", state:"WA",
    price:680000, yield_:4.9, growth:22, vac:0.5, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"From shortlist. Premium Geraldton suburb. Over $650k budget at $680k. 22% growth strong. Mining concentration risk applies."
  },
  {
    suburb:"Mount Tarcoola", city:"Geraldton", state:"WA",
    price:676600, yield_:4.98, growth:18, vac:0.36, dsr:60,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"From shortlist and DSR data. DSR 60 — highest in Geraldton. 0.36% vacancy, solid yield. Over $650k budget."
  },
  {
    suburb:"Spalding", city:"Geraldton", state:"WA",
    price:565600, yield_:5.16, growth:23, vac:0.59, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"Strong across all metrics. DSR 57 confirmed. 23% growth and 5.16% yield. Mining concentration caveat. Under budget at $565k."
  },
  {
    suburb:"Geraldton (City)", city:"Geraldton", state:"WA",
    price:666000, yield_:4.87, growth:18, vac:0.38, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"DSR 57. 0.38% vacancy. Just over $650k. Good overall metrics but unit market at $347k with 6.3% yield is a better entry."
  },
  {
    suburb:"Rangeway", city:"Geraldton", state:"WA",
    price:377000, yield_:7.4, growth:45, vac:0.6, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"late",
    note:"Best raw numbers on entire list — 7.4% yield, 45% growth, $377k. Already had a massive run (45%) — cycle stage is late. High reward achieved, risk of cooling. Mining concentration adds further risk."
  },
  {
    suburb:"Beachlands", city:"Geraldton", state:"WA",
    price:555000, yield_:5.1, growth:24, vac:0.6, dsr:56,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"Coastal suburb. 24% growth, 5.1% yield, 0.6% vacancy. Strong all metrics. Mining economy caveat."
  },
  {
    suburb:"Sunset Beach", city:"Geraldton", state:"WA",
    price:650000, yield_:5.3, growth:27, vac:1.2, dsr:56,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"Premium coastal suburb. 27% growth outstanding. Vacancy slightly higher at 1.2%. At $650k budget ceiling."
  },
  {
    suburb:"Waggrakine", city:"Geraldton", state:"WA",
    price:590000, yield_:5.4, growth:19, vac:0.6, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Port / Services",
    cycleStage:"mid",
    note:"Growing coastal suburb. Strong yield 5.4% and low vacancy 0.6%. Newer housing stock."
  },

  // ─────────────────────────────────────────────
  // WAGGA WAGGA NSW
  // ─────────────────────────────────────────────
  {
    suburb:"Glenfield Park", city:"Wagga Wagga", state:"NSW",
    price:645000, yield_:4.7, growth:18, vac:0.9, dsr:56,
    migPos:true, ecoDiv:true, eco:"Defence / Uni / Health / Ag / Services",
    cycleStage:"mid",
    note:"Best Wagga suburb for criteria. 18% growth, 4.7% yield, under 1% vacancy. Most diversified economy on the list — very safe long-term hold."
  },
  {
    suburb:"Ashmont", city:"Wagga Wagga", state:"NSW",
    price:485000, yield_:5.1, growth:18, vac:2.8, dsr:55,
    migPos:true, ecoDiv:true, eco:"Defence / Uni / Health / Ag / Services",
    cycleStage:"mid",
    note:"Cheapest Wagga entry with best yield. 18% growth. Vacancy at 2.8% is above 2% threshold — only fail. Strong long-term fundamentals due to diversified economy."
  },
  {
    suburb:"Forest Hill", city:"Wagga Wagga", state:"NSW",
    price:575500, yield_:5.0, growth:8, vac:3.1, dsr:56,
    migPos:true, ecoDiv:true, eco:"Defence / RAAF Base / Services",
    cycleStage:"early",
    note:"RAAF base suburb. Defence employment anchor is strong. Vacancy at 3.1% fails criterion. Growth modest at 8%. Early cycle — could accelerate with defence upgrades."
  },
  {
    suburb:"Kooringal", city:"Wagga Wagga", state:"NSW",
    price:610500, yield_:4.9, growth:8, vac:3.2, dsr:55,
    migPos:true, ecoDiv:true, eco:"Defence / Uni / Health / Ag / Services",
    cycleStage:"early",
    note:"Most popular suburb by sales volume (183 sales). Solid fundamentals but vacancy at 3.2% fails criterion. Growth below threshold currently but tightening."
  },
  {
    suburb:"Tolland", city:"Wagga Wagga", state:"NSW",
    price:570000, yield_:5.1, growth:10, vac:4.4, dsr:54,
    migPos:true, ecoDiv:true, eco:"Defence / Uni / Health / Ag / Services",
    cycleStage:"early",
    note:"Strongest 5-year average growth in Wagga at 17% p.a. Vacancy high at 4.4% (in redevelopment). Social housing redevelopment underway — upside when complete but current vacancy is a risk."
  },

  // ─────────────────────────────────────────────
  // TOWNSVILLE QLD
  // ─────────────────────────────────────────────
  {
    suburb:"Kirwan", city:"Townsville", state:"QLD",
    price:490000, yield_:5.2, growth:25, vac:0.9, dsr:59,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Uni / Port / Tourism",
    cycleStage:"mid",
    note:"Top recommendation. All criteria met. Propertyology ranked Townsville #1 capital growth prospect nationally. Selling in 13 days. Defence, JCU, and hospital create reliable diversified demand."
  },
  {
    suburb:"Hyde Park", city:"Townsville", state:"QLD",
    price:470000, yield_:5.5, growth:24, vac:0.9, dsr:58,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Uni / Port / Tourism",
    cycleStage:"mid",
    note:"Strong all-round. Close to hospital and CBD. Good tenant demand from healthcare workers. 5.5% yield excellent for price point."
  },
  {
    suburb:"Heatley", city:"Townsville", state:"QLD",
    price:604100, yield_:4.71, growth:20, vac:0.56, dsr:59,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Uni / Port / Tourism",
    cycleStage:"mid",
    note:"DSR 59 confirmed. 0.56% vacancy excellent. Yield borderline but passes at 4.71%. Strong owner-occupier demand."
  },
  {
    suburb:"Garbutt", city:"Townsville", state:"QLD",
    price:674600, yield_:4.73, growth:20, vac:0.19, dsr:57,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Uni / Port / Tourism",
    cycleStage:"mid",
    note:"Exceptional 0.19% vacancy — near zero. Over $650k but worth noting. Defence base proximity drives demand. Strong cashflow."
  },
  {
    suburb:"Rasmussen", city:"Townsville", state:"QLD",
    price:618600, yield_:4.74, growth:20, vac:0.28, dsr:58,
    migPos:true, ecoDiv:true, eco:"Defence / Health / Uni / Port / Tourism",
    cycleStage:"mid",
    note:"0.28% vacancy is crisis-tight. Near Lavarack Barracks. Consistent defence rental demand. 20% growth confirmed."
  },

  // ─────────────────────────────────────────────
  // TOOWOOMBA QLD
  // ─────────────────────────────────────────────
  {
    suburb:"Harristown", city:"Toowoomba", state:"QLD",
    price:480000, yield_:5.1, growth:17, vac:0.65, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Logistics / Inland Rail / Services",
    cycleStage:"early",
    note:"0.65% vacancy is crisis-level. Inland Rail is a structural long-term economic driver. Affordable and high-yielding. Often overlooked vs coastal QLD — that is the opportunity."
  },
  {
    suburb:"Glenvale", city:"Toowoomba", state:"QLD",
    price:520000, yield_:4.9, growth:15, vac:0.65, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Logistics / Inland Rail / Services",
    cycleStage:"early",
    note:"Growing outer suburb. Inland Rail construction workers driving demand. Strong fundamentals. Early in its growth cycle."
  },
  {
    suburb:"Newtown (units)", city:"Toowoomba", state:"QLD",
    price:435000, yield_:5.1, growth:15, vac:0.65, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Logistics / Inland Rail / Services",
    cycleStage:"early",
    note:"Best Toowoomba entry point for units at $435k. 5.1% yield. Rents up 9.1% in 12 months. Early cycle with major Inland Rail catalyst ahead."
  },

  // ─────────────────────────────────────────────
  // MACKAY QLD
  // ─────────────────────────────────────────────
  {
    suburb:"North Mackay", city:"Mackay", state:"QLD",
    price:480000, yield_:6.2, growth:17, vac:0.6, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Agriculture / Port",
    cycleStage:"mid",
    note:"Outstanding 6.2% yield. 0.6% vacancy and 17% growth. Mining-influenced economy — larger population base (128k) reduces concentration risk vs Geraldton."
  },
  {
    suburb:"West Mackay", city:"Mackay", state:"QLD",
    price:450000, yield_:5.8, growth:17, vac:0.6, dsr:56,
    migPos:true, ecoDiv:false, eco:"Mining / Agriculture / Port",
    cycleStage:"mid",
    note:"Affordable entry into Mackay. High yield, tight vacancy. Similar economy caveat to North Mackay but strong cashflow play."
  },
  {
    suburb:"Slade Point", city:"Mackay", state:"QLD",
    price:642300, yield_:5.44, growth:17, vac:0.83, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining / Agriculture / Port",
    cycleStage:"mid",
    note:"DSR 57 confirmed. Coastal suburb, 5.44% yield, 0.83% vacancy. 17% growth. At upper budget end."
  },

  // ─────────────────────────────────────────────
  // DUBBO NSW
  // ─────────────────────────────────────────────
  {
    suburb:"Mitchell (Dubbo)", city:"Dubbo", state:"NSW",
    price:460000, yield_:5.8, growth:20, vac:1.5, dsr:56,
    migPos:true, ecoDiv:true, eco:"Health / Agriculture / Aviation / Logistics",
    cycleStage:"early",
    note:"NSW #1 growth city (20%). Yields up to 7% in inner suburbs. Vacancy borderline at 1.5%. Diversified economy — health, ag, aviation, logistics, education. Inland Rail will boost further."
  },
  {
    suburb:"Whylandra (Dubbo)", city:"Dubbo", state:"NSW",
    price:480000, yield_:6.2, growth:20, vac:1.5, dsr:55,
    migPos:true, ecoDiv:true, eco:"Health / Agriculture / Aviation / Logistics",
    cycleStage:"early",
    note:"Highest yield in Dubbo at 6.2%. 20% growth and early in cycle. Inland Rail is a strong future catalyst."
  },

  // ─────────────────────────────────────────────
  // MILDURA VIC
  // ─────────────────────────────────────────────
  {
    suburb:"Mildura", city:"Mildura", state:"VIC",
    price:531000, yield_:4.8, growth:18, vac:1.1, dsr:55,
    migPos:false, ecoDiv:false, eco:"Agriculture / Wine / Citrus",
    cycleStage:"mid",
    note:"Strong growth (18%) and tight vacancy (1.1%). Weak net migration (0.13% pa) and ag-heavy economy are the two flags. Worth pursuing but eyes open."
  },

  // ─────────────────────────────────────────────
  // SHEPPARTON VIC
  // ─────────────────────────────────────────────
  {
    suburb:"Shepparton", city:"Shepparton", state:"VIC",
    price:495000, yield_:5.1, growth:6, vac:1.4, dsr:53,
    migPos:true, ecoDiv:false, eco:"Agriculture / Food Processing",
    cycleStage:"early",
    note:"Good yield and very tight supply but 6.4% growth just below 7% threshold. Leading indicators are tightening. Put on 6-month watchlist — early in next cycle."
  },

  // ─────────────────────────────────────────────
  // TASMANIA (noted as AVOID)
  // ─────────────────────────────────────────────
  {
    suburb:"Glenorchy", city:"Hobart", state:"TAS",
    price:676400, yield_:4.93, growth:5, vac:0.19, dsr:58,
    migPos:false, ecoDiv:true, eco:"Services / Government",
    cycleStage:"late",
    note:"AVOID. Tight vacancy (0.19%) and good DSR, but fails on net migration (TAS net –2,217) and growth (5%). Over $650k. People leaving Tasmania structurally."
  },
  {
    suburb:"Risdon Vale", city:"Hobart", state:"TAS",
    price:594200, yield_:5.13, growth:5, vac:0.22, dsr:57,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. TAS negative net migration and 5% growth fails threshold. Remove from shortlist."
  },
  {
    suburb:"Mayfield (TAS)", city:"Launceston", state:"TAS",
    price:502320, yield_:5.56, growth:5, vac:0.74, dsr:50,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. DSR 50 very low. Growth fails threshold. Negative net migration statewide. Remove."
  },
  {
    suburb:"Mowbray", city:"Launceston", state:"TAS",
    price:597000, yield_:5.12, growth:5, vac:0.37, dsr:51,
    migPos:false, ecoDiv:true, eco:"Services / Uni",
    cycleStage:"late",
    note:"AVOID. Low DSR. Growth fails. Negative net migration. Despite tight vacancy, structural population decline disqualifies."
  },
  {
    suburb:"Devonport", city:"Devonport", state:"TAS",
    price:571300, yield_:4.94, growth:5, vac:0.35, dsr:50,
    migPos:false, ecoDiv:true, eco:"Services / Port",
    cycleStage:"late",
    note:"AVOID. Fails growth, migration, and DSR criteria. Remove from shortlist entirely."
  },
  {
    suburb:"Bridgewater", city:"Hobart", state:"TAS",
    price:581200, yield_:5.19, growth:5, vac:0.16, dsr:60,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. Good DSR and vacancy but TAS negative migration and low growth are structural problems."
  },
  {
    suburb:"Gagebrook", city:"Hobart", state:"TAS",
    price:468000, yield_:5.87, growth:5, vac:0.38, dsr:51,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. Highest yield in TAS at 5.87% but negative migration and 5% growth fail criteria."
  },
  {
    suburb:"New Norfolk", city:"Hobart", state:"TAS",
    price:584300, yield_:5.00, growth:5, vac:0.41, dsr:58,
    migPos:false, ecoDiv:true, eco:"Services / Hop farming",
    cycleStage:"late",
    note:"AVOID. TAS negative migration disqualifies. Growth fails threshold."
  },
  {
    suburb:"Ravenswood (TAS)", city:"Launceston", state:"TAS",
    price:485500, yield_:5.13, growth:5, vac:0.31, dsr:54,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. DSR 54 and negative migration. TAS structural decline."
  },
  {
    suburb:"George Town", city:"George Town", state:"TAS",
    price:478400, yield_:5.01, growth:5, vac:0.82, dsr:55,
    migPos:false, ecoDiv:true, eco:"Industry / Services",
    cycleStage:"late",
    note:"AVOID. Negative migration statewide. Growth fails threshold."
  },
  {
    suburb:"Acton (TAS)", city:"Devonport", state:"TAS",
    price:517200, yield_:5.21, growth:5, vac:0.84, dsr:56,
    migPos:false, ecoDiv:true, eco:"Services",
    cycleStage:"late",
    note:"AVOID. TAS negative migration. Growth fails threshold."
  },

  // ─────────────────────────────────────────────
  // WA DSR STANDOUTS
  // ─────────────────────────────────────────────
  {
    suburb:"Narrogin", city:"Narrogin", state:"WA",
    price:485600, yield_:6.20, growth:27, vac:0.66, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services",
    cycleStage:"mid",
    note:"Exceptional from DSR data. 27% growth, 6.2% yield, 0.66% vacancy, selling in 11 days. All criteria met. Small town (~10k pop) — liquidity risk if selling quickly."
  },
  {
    suburb:"Collie", city:"Collie", state:"WA",
    price:578700, yield_:6.16, growth:32, vac:0.82, dsr:60,
    migPos:true, ecoDiv:false, eco:"Coal / Energy Transition",
    cycleStage:"late",
    note:"32% growth and 6.16% yield are extraordinary. Coal town in energy transition — high short-term reward but structural risk as coal winds down. Late in this cycle."
  },
  {
    suburb:"Manjimup", city:"Manjimup", state:"WA",
    price:621600, yield_:5.58, growth:24, vac:0.29, dsr:61,
    migPos:true, ecoDiv:true, eco:"Agriculture / Forestry / Tourism / Truffles",
    cycleStage:"mid",
    note:"Hidden gem. Highest DSR in WA list at 61. 24% growth, 5.58% yield, 0.29% vacancy. Genuinely diversified — ag, forestry, tourism, truffles. All criteria met."
  },
  {
    suburb:"Northam", city:"Northam", state:"WA",
    price:496400, yield_:5.44, growth:22, vac:0.28, dsr:59,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Rail",
    cycleStage:"early",
    note:"Underrated WA inland town. 22% growth, 5.44% yield, only 0.28% vacancy. DSR 59. Diversified ag/services/rail economy. Under $500k. Early cycle with more upside."
  },
  {
    suburb:"Mount Barker (WA)", city:"Mount Barker", state:"WA",
    price:615000, yield_:4.92, growth:20, vac:0.03, dsr:59,
    migPos:true, ecoDiv:true, eco:"Agriculture / Wine / Tourism",
    cycleStage:"mid",
    note:"0.03% vacancy — lowest on entire list, essentially zero. Great Southern wine region. 20% growth. Diversified economy. All criteria met."
  },
  {
    suburb:"Carey Park", city:"Bunbury", state:"WA",
    price:656000, yield_:4.95, growth:18, vac:0.37, dsr:56,
    migPos:true, ecoDiv:true, eco:"Services / Port / Industry",
    cycleStage:"mid",
    note:"Bunbury suburb. DSR 56, 0.37% vacancy. 18% growth. Just over $650k budget. Strong city fundamentals with diversified port/industry/services economy."
  },
  {
    suburb:"Withers", city:"Bunbury", state:"WA",
    price:621400, yield_:4.90, growth:18, vac:0.46, dsr:56,
    migPos:true, ecoDiv:true, eco:"Services / Port / Industry",
    cycleStage:"mid",
    note:"Bunbury suburb. DSR 56, 0.46% vacancy. 18% growth. Under $650k. Similar solid Bunbury fundamentals to Carey Park."
  },

  // ─────────────────────────────────────────────
  // KALGOORLIE WA (high yield, sector risk)
  // ─────────────────────────────────────────────
  {
    suburb:"Kalgoorlie", city:"Kalgoorlie", state:"WA",
    price:489000, yield_:8.48, growth:16, vac:0.62, dsr:54,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"Extraordinary 8.48% yield — highest cashflow play. 16% growth and 0.62% vacancy. Pure mining town = high sector concentration risk. Best for cashflow investors who understand the gold cycle."
  },
  {
    suburb:"South Kalgoorlie", city:"Kalgoorlie", state:"WA",
    price:464900, yield_:8.40, growth:16, vac:0.36, dsr:59,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"Cheapest Kalgoorlie suburb with 8.4% yield. DSR 59. Only 0.36% vacancy. Best entry point for the Kalgoorlie cashflow play."
  },
  {
    suburb:"Piccadilly", city:"Kalgoorlie", state:"WA",
    price:494400, yield_:8.32, growth:16, vac:0.20, dsr:58,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"0.20% vacancy is exceptionally tight. 8.32% yield. Single-industry risk remains. Strong cashflow but volatile long-term."
  },
  {
    suburb:"Somerville", city:"Kalgoorlie", state:"WA",
    price:606000, yield_:8.64, growth:16, vac:0.53, dsr:57,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"Highest yield on entire list at 8.64%. Most expensive Kalgoorlie suburb. Strong cashflow for resource-sector investors."
  },
  {
    suburb:"Hannans", city:"Kalgoorlie", state:"WA",
    price:630000, yield_:8.28, growth:16, vac:0.56, dsr:56,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"Named after gold prospector Paddy Hannan. 8.28% yield. Upper end of budget. Mining-sector concentration risk."
  },
  {
    suburb:"Lamington", city:"Kalgoorlie", state:"WA",
    price:522000, yield_:7.19, growth:16, vac:0.50, dsr:61,
    migPos:true, ecoDiv:false, eco:"Mining — Gold (concentrated)",
    cycleStage:"mid",
    note:"DSR 61 — highest in Kalgoorlie cluster. 7.19% yield. 0.50% vacancy. Under $550k. Best DSR in the gold belt."
  },

  // ─────────────────────────────────────────────
  // NSW DSR STANDOUTS
  // ─────────────────────────────────────────────
  {
    suburb:"Aberdeen", city:"Muswellbrook", state:"NSW",
    price:626900, yield_:4.90, growth:14, vac:0.31, dsr:60,
    migPos:true, ecoDiv:false, eco:"Coal Mining / Agriculture",
    cycleStage:"late",
    note:"DSR 60 — highest in NSW data. 0.31% vacancy excellent. 14% growth solid. Coal mining concentration is the key risk — energy transition headwinds."
  },
  {
    suburb:"Narrabri", city:"Narrabri", state:"NSW",
    price:576000, yield_:6.09, growth:13, vac:0.86, dsr:55,
    migPos:true, ecoDiv:false, eco:"Agriculture / Cotton / Gas",
    cycleStage:"mid",
    note:"Highest NSW yield in DSR data at 6.09%. 13% growth, 0.86% vacancy. Gas and cotton concentration adds risk. Worth researching."
  },
  {
    suburb:"Inverell", city:"Inverell", state:"NSW",
    price:507000, yield_:5.22, growth:12, vac:0.37, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Sapphires / Services",
    cycleStage:"early",
    note:"DSR 58, 0.37% vacancy, 5.22% yield. Affordable New England region. Genuinely diversified — ag, sapphire mining, services. Early cycle with more upside."
  },
  {
    suburb:"Grafton", city:"Grafton", state:"NSW",
    price:550200, yield_:5.29, growth:12, vac:0.36, dsr:60,
    migPos:true, ecoDiv:true, eco:"Agriculture / Timber / Services",
    cycleStage:"mid",
    note:"DSR 60. 0.36% vacancy, 5.29% yield, 12% growth. Flood-affected city (2022) — check flood map. Fundamentals are strong post-rebuild."
  },
  {
    suburb:"South Grafton", city:"Grafton", state:"NSW",
    price:534400, yield_:5.30, growth:12, vac:0.39, dsr:60,
    migPos:true, ecoDiv:true, eco:"Agriculture / Timber / Services",
    cycleStage:"mid",
    note:"DSR 60. Cheaper entry than Grafton proper. Same strong metrics. Flood check essential."
  },
  {
    suburb:"Casino", city:"Casino", state:"NSW",
    price:624000, yield_:5.19, growth:11, vac:0.38, dsr:59,
    migPos:true, ecoDiv:true, eco:"Agriculture / Meatworks / Services",
    cycleStage:"mid",
    note:"DSR 59. 0.38% vacancy, 5.19% yield, 11% growth. Beef capital of Australia. Ag/meatworks economy fairly diversified within primary industries."
  },
  {
    suburb:"Cootamundra", city:"Cootamundra", state:"NSW",
    price:463700, yield_:5.52, growth:10, vac:0.21, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Rail / Services",
    cycleStage:"early",
    note:"Very affordable at $463k. 0.21% vacancy is extremely tight. 5.52% yield. Early cycle with significant upside. Growth 10% meets threshold."
  },
  {
    suburb:"Leeton", city:"Leeton", state:"NSW",
    price:580200, yield_:4.97, growth:10, vac:0.02, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Irrigation / Food",
    cycleStage:"early",
    note:"0.02% vacancy — essentially zero, the tightest vacancy in NSW DSR data. DSR 58. 10% growth. Very early in cycle with major supply shortage. Irrigation district economy."
  },
  {
    suburb:"Narromine", city:"Narromine", state:"NSW",
    price:525300, yield_:6.33, growth:11, vac:1.44, dsr:54,
    migPos:true, ecoDiv:true, eco:"Agriculture / Aviation / Gliding",
    cycleStage:"early",
    note:"Highest NSW yield in DSR data at 6.33%. Unique aviation/gliding town. 11% growth. DSR 54 borderline. Vacancy 1.44% passes."
  },
  {
    suburb:"Quirindi", city:"Quirindi", state:"NSW",
    price:491300, yield_:5.16, growth:10, vac:0.29, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services",
    cycleStage:"early",
    note:"Under $500k. DSR 56, 0.29% vacancy, 5.16% yield. Liverpool Plains ag area. Affordable entry with early cycle characteristics."
  },
  {
    suburb:"Blayney", city:"Blayney", state:"NSW",
    price:608700, yield_:4.90, growth:10, vac:0.61, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Copper Mining / Services",
    cycleStage:"early",
    note:"DSR 58. 0.61% vacancy, 10% growth. Copper and ag economy. Affordable Central West NSW. Early cycle."
  },
  {
    suburb:"Glen Innes", city:"Glen Innes", state:"NSW",
    price:521300, yield_:4.75, growth:10, vac:0.45, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Sapphires / Tourism",
    cycleStage:"early",
    note:"DSR 57, 0.45% vacancy, 10% growth. New England Tablelands. Yield borderline at 4.75%. Sapphire gem mining unique diversifier."
  },
  {
    suburb:"West Kempsey", city:"Kempsey", state:"NSW",
    price:484200, yield_:5.22, growth:11, vac:0.52, dsr:55,
    migPos:true, ecoDiv:true, eco:"Agriculture / Forestry / Services",
    cycleStage:"mid",
    note:"Under $500k. DSR 55, 0.52% vacancy, 5.22% yield, 11% growth. Mid-North Coast hinterland. Good value."
  },
  {
    suburb:"Corowa", city:"Corowa", state:"NSW",
    price:485500, yield_:4.90, growth:9, vac:0.30, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Wine / Food",
    cycleStage:"early",
    note:"Murray River border town. DSR 56, 0.30% vacancy. Growth at 9% just above threshold. Affordable. Whisky distillery is bringing tourism uplift."
  },
  {
    suburb:"Parkes", city:"Parkes", state:"NSW",
    price:524900, yield_:4.77, growth:10, vac:1.26, dsr:55,
    migPos:true, ecoDiv:true, eco:"Agriculture / Rail / Logistics / Telescope",
    cycleStage:"early",
    note:"Inland Rail logistics hub — major growth catalyst ahead. DSR 55. Vacancy 1.26%. Yield borderline. The Dish (radio telescope) tourism adds character. Early cycle."
  },
  {
    suburb:"Forbes", city:"Forbes", state:"NSW",
    price:549000, yield_:4.68, growth:9, vac:0.94, dsr:55,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services",
    cycleStage:"early",
    note:"DSR 55, 0.94% vacancy. Growth 9% marginal. Yield borderline. Central West NSW. Early in cycle."
  },
  {
    suburb:"Young", city:"Young", state:"NSW",
    price:536800, yield_:4.81, growth:9, vac:0.70, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Cherries / Services",
    cycleStage:"early",
    note:"Cherry capital of Australia. DSR 56, 0.70% vacancy. Growth 9% marginal. Early cycle."
  },
  {
    suburb:"Howlong", city:"Howlong", state:"NSW",
    price:636000, yield_:4.72, growth:8, vac:0.22, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Border Town",
    cycleStage:"early",
    note:"0.22% vacancy very tight. DSR 56. Growth 8% just above threshold. Yield borderline. Murray River lifestyle town."
  },
  {
    suburb:"Temora", city:"Temora", state:"NSW",
    price:528000, yield_:5.10, growth:9, vac:0.81, dsr:54,
    migPos:true, ecoDiv:true, eco:"Agriculture / Aviation / Warbirds",
    cycleStage:"early",
    note:"Aviation museum draws tourism. DSR 54 borderline. 5.1% yield. Growth 9% marginal. Early cycle."
  },
  {
    suburb:"Westdale", city:"Tamworth", state:"NSW",
    price:678900, yield_:4.94, growth:9, vac:0.65, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Country Music",
    cycleStage:"early",
    note:"Tamworth suburb. DSR 57, 0.65% vacancy. Over $650k budget at $679k. Growth 9% marginal. Country Music Capital."
  },
  {
    suburb:"South Tamworth", city:"Tamworth", state:"NSW",
    price:542700, yield_:4.92, growth:8, vac:0.83, dsr:52,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Country Music",
    cycleStage:"early",
    note:"Tamworth suburb. DSR 52 is low. Growth 8% just above threshold. Under $550k."
  },
  {
    suburb:"West Tamworth", city:"Tamworth", state:"NSW",
    price:540000, yield_:4.72, growth:8, vac:0.67, dsr:53,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Country Music",
    cycleStage:"early",
    note:"Tamworth suburb. DSR 53 borderline. Yield borderline. Under $550k. Growth marginal."
  },
  {
    suburb:"Moree", city:"Moree", state:"NSW",
    price:461100, yield_:4.84, growth:9, vac:1.02, dsr:52,
    migPos:true, ecoDiv:false, eco:"Agriculture — Cotton (concentrated)",
    cycleStage:"early",
    note:"Very affordable at $461k. DSR 52 low. Vacancy 1.02% passes. Growth 9% marginal. Cotton monoculture economy — high climate/sector risk."
  },
  {
    suburb:"Uralla", city:"Uralla", state:"NSW",
    price:630100, yield_:4.76, growth:8, vac:0.94, dsr:54,
    migPos:true, ecoDiv:true, eco:"Agriculture / Tourism / New England",
    cycleStage:"early",
    note:"New England tablelands lifestyle town. DSR 54 borderline. Growth 8% marginal. Yield borderline."
  },

  // ─────────────────────────────────────────────
  // QLD DSR STANDOUTS
  // ─────────────────────────────────────────────
  {
    suburb:"Goondiwindi", city:"Goondiwindi", state:"QLD",
    price:633000, yield_:5.04, growth:14, vac:0.14, dsr:60,
    migPos:true, ecoDiv:false, eco:"Agriculture / Cotton",
    cycleStage:"mid",
    note:"0.14% vacancy — near zero. DSR 60. 5.04% yield, 14% growth. Agriculture-dominant economy is main risk. Exceptionally tight rental market."
  },
  {
    suburb:"Roma", city:"Roma", state:"QLD",
    price:510000, yield_:5.78, growth:15, vac:0.11, dsr:55,
    migPos:true, ecoDiv:false, eco:"Gas / Agriculture",
    cycleStage:"mid",
    note:"0.11% vacancy — lowest in QLD DSR data. 5.78% yield, 15% growth. Gas town with ag base. Energy sector concentration. Remarkable tightness."
  },
  {
    suburb:"Wondai", city:"Wondai", state:"QLD",
    price:537600, yield_:5.03, growth:13, vac:0.04, dsr:59,
    migPos:true, ecoDiv:false, eco:"Agriculture / Forestry",
    cycleStage:"mid",
    note:"0.04% vacancy is extraordinary. DSR 59. South Burnett region. Growth 13% solid. Ag/forestry concentration."
  },
  {
    suburb:"Dalby", city:"Dalby", state:"QLD",
    price:636200, yield_:5.00, growth:14, vac:0.21, dsr:57,
    migPos:true, ecoDiv:false, eco:"Agriculture / Gas / Services",
    cycleStage:"mid",
    note:"DSR 57, 0.21% vacancy, 14% growth. Darling Downs ag hub. Gas adds to economy. At budget ceiling."
  },
  {
    suburb:"Chinchilla", city:"Chinchilla", state:"QLD",
    price:530300, yield_:5.53, growth:12, vac:0.83, dsr:53,
    migPos:true, ecoDiv:false, eco:"Gas / Agriculture",
    cycleStage:"mid",
    note:"Gas capital of QLD. DSR 53 borderline. 5.53% yield strong. 0.83% vacancy solid. Energy sector concentration risk."
  },
  {
    suburb:"Kingaroy", city:"Kingaroy", state:"QLD",
    price:641300, yield_:4.90, growth:13, vac:0.31, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Food / Services",
    cycleStage:"mid",
    note:"Peanut capital of Australia. DSR 56, 0.31% vacancy, 13% growth. At budget ceiling. Reasonably diversified ag/food economy."
  },
  {
    suburb:"Nanango", city:"Nanango", state:"QLD",
    price:598000, yield_:5.03, growth:13, vac:0.37, dsr:58,
    migPos:true, ecoDiv:false, eco:"Agriculture / Coal",
    cycleStage:"mid",
    note:"DSR 58, 0.37% vacancy, 5.03% yield, 13% growth. South Burnett. Coal and ag concentration."
  },
  {
    suburb:"Murgon", city:"Murgon", state:"QLD",
    price:492000, yield_:4.69, growth:12, vac:0.34, dsr:56,
    migPos:true, ecoDiv:false, eco:"Agriculture / Forestry",
    cycleStage:"early",
    note:"Under $500k. DSR 56, 0.34% vacancy. Yield borderline at 4.69%. Growth 12% passes. Early cycle potential."
  },
  {
    suburb:"East Innisfail", city:"Innisfail", state:"QLD",
    price:545900, yield_:5.51, growth:16, vac:0.07, dsr:54,
    migPos:true, ecoDiv:true, eco:"Agriculture / Tourism / Tropical",
    cycleStage:"mid",
    note:"0.07% vacancy essentially zero. 5.51% yield, 16% growth. Tropical North QLD. Cyclone risk is a factor to assess."
  },
  {
    suburb:"Mareeba", city:"Mareeba", state:"QLD",
    price:618400, yield_:5.28, growth:16, vac:0.32, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Tourism / Mining",
    cycleStage:"mid",
    note:"DSR 57, 0.32% vacancy, 5.28% yield, 16% growth. Atherton Tablelands gateway. Diversified enough with ag, tourism, and mining."
  },
  {
    suburb:"Emerald", city:"Emerald", state:"QLD",
    price:598700, yield_:5.54, growth:15, vac:0.58, dsr:54,
    migPos:true, ecoDiv:false, eco:"Mining / Agriculture",
    cycleStage:"mid",
    note:"Central Highlands mining and ag hub. 5.54% yield, 15% growth, 0.58% vacancy. Mining-concentrated but larger service base."
  },
  {
    suburb:"Calliope", city:"Gladstone", state:"QLD",
    price:638800, yield_:4.72, growth:14, vac:1.20, dsr:58,
    migPos:true, ecoDiv:false, eco:"Mining / Gas / LNG",
    cycleStage:"mid",
    note:"Gladstone suburb. DSR 58. Vacancy 1.20% passes. Yield borderline. LNG/mining concentration. Gladstone overall vacancy 3.5% but Calliope is tighter."
  },
  {
    suburb:"Kin Kora", city:"Gladstone", state:"QLD",
    price:615600, yield_:4.93, growth:14, vac:0.39, dsr:58,
    migPos:true, ecoDiv:false, eco:"Mining / Gas / LNG",
    cycleStage:"mid",
    note:"Gladstone suburb. DSR 58, 0.39% vacancy excellent. 14% growth. Yield borderline. Better than overall Gladstone LGA metrics."
  },
  {
    suburb:"West Gladstone", city:"Gladstone", state:"QLD",
    price:578100, yield_:4.74, growth:14, vac:0.98, dsr:53,
    migPos:true, ecoDiv:false, eco:"Mining / Gas / LNG",
    cycleStage:"mid",
    note:"Gladstone suburb. DSR 53 low. Vacancy 0.98% passes. Yield borderline. Mining/LNG concentration."
  },

  // ─────────────────────────────────────────────
  // SA DSR DATA
  // ─────────────────────────────────────────────
  {
    suburb:"Loxton", city:"Loxton", state:"SA",
    price:451000, yield_:4.69, growth:11, vac:0.10, dsr:63,
    migPos:true, ecoDiv:false, eco:"Agriculture / Irrigation / Wine",
    cycleStage:"early",
    note:"Highest DSR on entire list at 63. 0.10% vacancy remarkable. Very affordable at $451k. Yield just below threshold at 4.69%. Riverland SA — ag-heavy economy. Early in cycle."
  },
  {
    suburb:"Berri", city:"Berri", state:"SA",
    price:458900, yield_:4.81, growth:11, vac:0.28, dsr:56,
    migPos:true, ecoDiv:false, eco:"Agriculture / Wine / Citrus",
    cycleStage:"early",
    note:"DSR 56, 0.28% vacancy, 11% growth. Yield borderline at 4.81%. Riverland SA wine region. Very affordable at $459k."
  },
  {
    suburb:"Naracoorte", city:"Naracoorte", state:"SA",
    price:498600, yield_:4.70, growth:10, vac:0.67, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Wine / Caves Tourism",
    cycleStage:"early",
    note:"Limestone Coast SA. DSR 56, 0.67% vacancy, 10% growth. Yield borderline. Caves tourism adds diversification. Under $500k."
  },
  {
    suburb:"Port Lincoln", city:"Port Lincoln", state:"SA",
    price:644200, yield_:4.72, growth:14, vac:0.22, dsr:59,
    migPos:true, ecoDiv:true, eco:"Fishing / Tourism / Agriculture",
    cycleStage:"mid",
    note:"Tuna capital of Australia. 0.22% vacancy, 14% growth. Diversified fishing/tourism/ag economy. At budget ceiling. Strong lifestyle appeal."
  },

  // ─────────────────────────────────────────────
  // VIC DSR DATA
  // ─────────────────────────────────────────────
  {
    suburb:"Euroa", city:"Euroa", state:"VIC",
    price:516000, yield_:5.94, growth:9, vac:0.10, dsr:59,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services",
    cycleStage:"early",
    note:"Best VIC suburb in DSR data. 0.10% vacancy essentially zero. 5.94% yield. DSR 59. Growth 9% marginal. Early cycle with significant upside remaining."
  },
  {
    suburb:"Hamilton (VIC)", city:"Hamilton", state:"VIC",
    price:468000, yield_:4.96, growth:7, vac:0.33, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Wool",
    cycleStage:"early",
    note:"Affordable at $468k. DSR 57, 0.33% vacancy, 7% growth just at threshold. Wool capital of the world. Early cycle."
  },
  {
    suburb:"Rochester", city:"Rochester", state:"VIC",
    price:519500, yield_:4.87, growth:8, vac:0.27, dsr:60,
    migPos:true, ecoDiv:true, eco:"Agriculture / Food / Irrigation",
    cycleStage:"early",
    note:"DSR 60 — best in VIC list. 0.27% vacancy, 8% growth. Yield borderline. Campaspe region. Flood recovery driving infrastructure investment."
  },
  {
    suburb:"Seymour", city:"Seymour", state:"VIC",
    price:522300, yield_:4.79, growth:7, vac:0.10, dsr:57,
    migPos:true, ecoDiv:true, eco:"Agriculture / Defence / Services",
    cycleStage:"early",
    note:"0.10% vacancy is outstanding. DSR 57. Defence base (Puckapunyal) anchor tenant. Growth 7% at threshold. Early cycle with defence expansion potential."
  },
  {
    suburb:"Numurkah", city:"Numurkah", state:"VIC",
    price:568800, yield_:5.50, growth:8, vac:1.33, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Food / Irrigation",
    cycleStage:"early",
    note:"5.5% yield is strong for VIC. DSR 56, 1.33% vacancy, 8% growth. Moira Shire agricultural hub. Early cycle."
  },
  {
    suburb:"Portland (VIC)", city:"Portland", state:"VIC",
    price:511100, yield_:5.14, growth:7, vac:0.41, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Aluminium / Port",
    cycleStage:"early",
    note:"DSR 56, 0.41% vacancy, 5.14% yield, 7% growth at threshold. Portland Aluminium smelter provides industrial employment base. Port adds diversification."
  },
  {
    suburb:"Ararat", city:"Ararat", state:"VIC",
    price:504600, yield_:4.97, growth:8, vac:0.86, dsr:58,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services / Wine (Grampians)",
    cycleStage:"early",
    note:"DSR 58. 0.86% vacancy, 8% growth, solid yield. Grampians wine region proximity. Under $510k. Early cycle."
  },
  {
    suburb:"Newborough", city:"Moe", state:"VIC",
    price:576400, yield_:4.93, growth:7, vac:0.91, dsr:56,
    migPos:true, ecoDiv:false, eco:"Energy / Services (Latrobe Valley)",
    cycleStage:"early",
    note:"DSR 56, 0.91% vacancy, 7% growth at threshold. Latrobe Valley energy transition may bring investment. Yield borderline."
  },
  {
    suburb:"Horsham", city:"Horsham", state:"VIC",
    price:527000, yield_:4.63, growth:7, vac:0.87, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Health / Services",
    cycleStage:"early",
    note:"Wimmera regional hub. DSR 56. Yield below threshold at 4.63%. Growth 7% at threshold. Under $530k."
  },
  {
    suburb:"Benalla", city:"Benalla", state:"VIC",
    price:527800, yield_:4.82, growth:7, vac:1.20, dsr:55,
    migPos:true, ecoDiv:true, eco:"Agriculture / Services",
    cycleStage:"early",
    note:"DSR 55. Growth 7% at threshold. Yield borderline. Vacancy 1.20% passes. Early cycle."
  },
  {
    suburb:"Bairnsdale", city:"Bairnsdale", state:"VIC",
    price:563800, yield_:4.95, growth:7, vac:0.99, dsr:56,
    migPos:true, ecoDiv:true, eco:"Agriculture / Tourism / Services",
    cycleStage:"early",
    note:"East Gippsland gateway. DSR 56. 7% growth at threshold. Yield borderline. Bushfire recovery investment."
  },
  {
    suburb:"Swan Hill", city:"Swan Hill", state:"VIC",
    price:559500, yield_:4.91, growth:7, vac:0.28, dsr:52,
    migPos:true, ecoDiv:false, eco:"Agriculture / Irrigation",
    cycleStage:"early",
    note:"Very tight vacancy 0.28% but DSR 52 is low. Growth 7% at threshold. Ag-heavy economy. Yield borderline."
  },
  {
    suburb:"Red Cliffs", city:"Mildura", state:"VIC",
    price:554000, yield_:4.73, growth:8, vac:1.14, dsr:58,
    migPos:false, ecoDiv:false, eco:"Agriculture / Wine / Citrus",
    cycleStage:"early",
    note:"Mildura satellite suburb. DSR 58. 1.14% vacancy, 8% growth. Yield borderline. Migration and eco diversification are flags."
  },
  {
    suburb:"Long Gully", city:"Bendigo", state:"VIC",
    price:570200, yield_:4.77, growth:7, vac:0.49, dsr:56,
    migPos:true, ecoDiv:true, eco:"Services / Health / Education",
    cycleStage:"early",
    note:"Bendigo suburb. DSR 56, 0.49% vacancy, 7% growth at threshold. Yield borderline. Bendigo has a good diversified economy."
  },
  {
    suburb:"North Bendigo", city:"Bendigo", state:"VIC",
    price:618700, yield_:4.67, growth:7, vac:0.99, dsr:55,
    migPos:true, ecoDiv:true, eco:"Services / Health / Education",
    cycleStage:"early",
    note:"Bendigo suburb. DSR 55. Yield below threshold at 4.67%. Growth 7% at threshold. Vacancy 0.99% solid."
  },

  // ─────────────────────────────────────────────
  // SOUTH HEDLAND WA
  // ─────────────────────────────────────────────
  {
    suburb:"South Hedland", city:"Port Hedland", state:"WA",
    price:624000, yield_:9.08, growth:4, vac:0.47, dsr:52,
    migPos:true, ecoDiv:false, eco:"Mining — Iron Ore (concentrated)",
    cycleStage:"late",
    note:"Extraordinary 9.08% yield — highest on list. But growth at 4% fails 7% threshold. Pure iron ore mining town. Late in current cycle. Classic high yield, low growth trap. Only for cashflow-focused investors with high risk tolerance."
  },

];

// Export for use in index.html
if (typeof module !== 'undefined') module.exports = SUBURBS;
