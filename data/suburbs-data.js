// ─────────────────────────────────────────────
//  AusPropertyIQ — Suburb Data (2026)
//
//  Fields:
//    suburb        string   suburb name
//    city          string   nearest city / region
//    state         string   NSW | QLD | VIC | WA | SA | TAS
//    price         number   indicative median house price AUD (display only)
//    vacancyRate   number   rental vacancy % (e.g. 0.8)
//    supplyRisk    string   very_limited | low | balanced | large_release | oversupply
//    infraJobs     string   major | strong | moderate | minimal | none
//    popGrowth     string   strong | good | moderate | flat | declining
//    grossYield    number   gross rental yield % (e.g. 6.2)
//    rentGrowth    string   explosive | strong | moderate | flat | falling
//    ownerOccupier string   strong | good | moderate | mostly_investor | poor
//    ecoDiversity  string   highly_diversified | moderate | single
//    naturalRisk   string   low | moderate | high
//    note          string   investment commentary
// ─────────────────────────────────────────────

const SUBURBS = [

  // ── QLD ─────────────────────────────────────

  {
    suburb: 'Toowoomba',
    city: 'Toowoomba',
    state: 'QLD',
    price: 520000,
    vacancyRate: 0.5,
    supplyRisk: 'very_limited',
    infraJobs: 'major',
    popGrowth: 'strong',
    grossYield: 6.3,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Inland Rail intermodal hub transforming Toowoomba into a national logistics centre. Wellcamp Airport expansion creating aviation and freight jobs. New hospital precinct under construction. Landlocked geography severely constrains land supply — vacancy hit 0.5% in 2026, rents up 14% YoY.'
  },

  {
    suburb: 'Townsville',
    city: 'Townsville',
    state: 'QLD',
    price: 480000,
    vacancyRate: 0.7,
    supplyRisk: 'low',
    infraJobs: 'major',
    popGrowth: 'strong',
    grossYield: 6.8,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'North Queensland hub with major defence expansion at Lavarack Barracks, Port of Townsville channel upgrade, and Queensland\'s largest regional hospital rebuild. Copper refinery revamp creating hundreds of permanent jobs. Cyclone risk is real but manageable with insurance. Yields among the best in Queensland.'
  },

  {
    suburb: 'Rockhampton',
    city: 'Rockhampton',
    state: 'QLD',
    price: 380000,
    vacancyRate: 0.6,
    supplyRisk: 'very_limited',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 6.5,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Central Queensland hub benefiting from Rookwood Weir completion, hospital expansion, and growing beef export trade. Very low supply relative to demand — vacancy under 0.6% as of 2026. Flood risk in low-lying areas; stick to elevated suburbs. Median price still very affordable at ~$380k.'
  },

  {
    suburb: 'Cairns',
    city: 'Cairns',
    state: 'QLD',
    price: 560000,
    vacancyRate: 0.9,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 5.8,
    rentGrowth: 'strong',
    ownerOccupier: 'moderate',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'International tourism recovery has driven strong population and rental demand recovery. Cairns Convention Centre expansion and airport upgrade underway. Tourism + health + education provides moderate diversification. Cyclone season insurance costs are a real hold cost to budget for.'
  },

  {
    suburb: 'Ipswich',
    city: 'Ipswich',
    state: 'QLD',
    price: 590000,
    vacancyRate: 1.2,
    supplyRisk: 'balanced',
    infraJobs: 'major',
    popGrowth: 'strong',
    grossYield: 5.5,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'One of Australia\'s fastest-growing cities driven by RAAF Base Amberley expansion, Defence South-East Qld strategy, and spillover from unaffordable Brisbane. Significant new estate supply is keeping vacancy from tightening further. Flood-affected streets to avoid — Ipswich has serious flood history; always check RA portal.'
  },

  {
    suburb: 'Logan Central',
    city: 'Logan',
    state: 'QLD',
    price: 490000,
    vacancyRate: 1.0,
    supplyRisk: 'large_release',
    infraJobs: 'moderate',
    popGrowth: 'strong',
    grossYield: 6.2,
    rentGrowth: 'moderate',
    ownerOccupier: 'mostly_investor',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Strong population inflow from Sydney and interstate keeps demand high, but large greenfield land releases in Logan\'s outer growth corridors are creating supply competition. Predominantly investor-held which limits quality-driven capital growth. Strong cash flow play; weaker long-term capital growth outlook than other QLD picks.'
  },

  {
    suburb: 'Hervey Bay',
    city: 'Hervey Bay',
    state: 'QLD',
    price: 560000,
    vacancyRate: 1.4,
    supplyRisk: 'low',
    infraJobs: 'moderate',
    popGrowth: 'strong',
    grossYield: 5.2,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Sea-change and retirement migration is running hot, with strong interstate inflows from Victoria and NSW. Hospital and marina precinct expansions underway. High owner-occupier demand drives quality capital growth long term. Yield is lower than pure investor markets but owner-occ premium protects values in downturns.'
  },

  {
    suburb: 'Mackay',
    city: 'Mackay',
    state: 'QLD',
    price: 420000,
    vacancyRate: 0.8,
    supplyRisk: 'very_limited',
    infraJobs: 'strong',
    popGrowth: 'moderate',
    grossYield: 7.2,
    rentGrowth: 'explosive',
    ownerOccupier: 'moderate',
    ecoDiversity: 'single',
    naturalRisk: 'moderate',
    note: 'Mining services boom has driven rents up 22% in 12 months — one of the highest rent growth rates nationally. Bowen Basin coal and now critical minerals expansion underpins strong employment. Single-industry risk is the key concern — a commodity price downturn could soften demand quickly. Best for investors who understand mining cycle timing.'
  },

  // ── NSW ─────────────────────────────────────

  {
    suburb: 'Wagga Wagga',
    city: 'Wagga Wagga',
    state: 'NSW',
    price: 480000,
    vacancyRate: 0.6,
    supplyRisk: 'very_limited',
    infraJobs: 'major',
    popGrowth: 'good',
    grossYield: 5.8,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'Australia\'s largest inland city and one of its most fundamentally sound regional investment markets. RAAF Base Wagga undergoing major expansion, Charles Sturt University growing, Wagga Base Hospital $700M rebuild underway. Defence + health + education + agriculture = highly diversified. Near-zero vacancy with very limited new land release.'
  },

  {
    suburb: 'Newcastle',
    city: 'Newcastle',
    state: 'NSW',
    price: 780000,
    vacancyRate: 1.0,
    supplyRisk: 'balanced',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 4.8,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'Hunter Region\'s urban renewal continues post-coal transition, with university, health, tourism, and light industrial forming a strong diversified base. Light rail has revitalised the CBD. Price point is higher which compresses yield, but strong owner-occupier market protects capital values. Good B-grade market for diversified portfolios.'
  },

  {
    suburb: 'Tamworth',
    city: 'Tamworth',
    state: 'NSW',
    price: 410000,
    vacancyRate: 0.5,
    supplyRisk: 'very_limited',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 6.0,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'North-west NSW hub with genuinely tight rental market — vacancy consistently below 0.5% through 2025–26. Hospital upgrade and airport expansion supporting local employment. Strong owner-occupier community drives long-term quality. Affordable entry with solid 6% yield makes this an A-grade regional pick.'
  },

  {
    suburb: 'Albury',
    city: 'Albury-Wodonga',
    state: 'NSW',
    price: 520000,
    vacancyRate: 0.7,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 5.5,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Border economy benefits from both NSW and Victorian services spending. Cross-border health, retail, and logistics hub seeing consistent population and rental growth. Part of the Albury-Wodonga bi-state regional city — one of Australia\'s most stable inland markets. Low natural risk, low crime relative to comparables.'
  },

  {
    suburb: 'Orange',
    city: 'Orange',
    state: 'NSW',
    price: 560000,
    vacancyRate: 0.8,
    supplyRisk: 'very_limited',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 5.7,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Central West NSW market with very limited new housing supply due to geographic and planning constraints. Healthcare, mining administration, and agriculture provide stable employment. Strong community and lifestyle appeal drives high owner-occupier demand. Rents have tightened significantly since 2024 with little pipeline to relieve pressure.'
  },

  {
    suburb: 'Dubbo',
    city: 'Dubbo',
    state: 'NSW',
    price: 380000,
    vacancyRate: 1.1,
    supplyRisk: 'low',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 6.1,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Orana Region service hub for a huge inland area — hospital, airport, retail, and agribusiness. Good yield at affordable entry price. Some infrastructure plans have been deferred, limiting the infra score. Modest but steady population growth. Occasional flooding in low-lying areas; insist on flood-free properties.'
  },

  // ── VIC ─────────────────────────────────────

  {
    suburb: 'Ballarat',
    city: 'Ballarat',
    state: 'VIC',
    price: 580000,
    vacancyRate: 0.9,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'strong',
    grossYield: 5.0,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'One of Victoria\'s most consistently performing regional markets. Train to Melbourne in ~70 min driving strong relocation demand. BUSA university expansion, new hospital, and growing tech/defence presence. Low supply pipeline — heritage overlay restricts infill. Strong owner-occupier demand underpins capital growth quality.'
  },

  {
    suburb: 'Bendigo',
    city: 'Bendigo',
    state: 'VIC',
    price: 540000,
    vacancyRate: 1.0,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 4.9,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'Health, education, mining history tourism, and growing technology sector make Bendigo one of Victoria\'s most diversified regional economies. La Trobe University, Bendigo Health, and the cultural precinct all expanding. Yield is modest but stable; long-term capital growth quality is high due to strong owner-occupier base.'
  },

  {
    suburb: 'Geelong',
    city: 'Geelong',
    state: 'VIC',
    price: 650000,
    vacancyRate: 1.5,
    supplyRisk: 'large_release',
    infraJobs: 'major',
    popGrowth: 'strong',
    grossYield: 4.5,
    rentGrowth: 'moderate',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'Major infrastructure story — National Broadband, CSIRO expansion, new hospital precinct, and manufacturing transition are all real. However, large housing estates in Armstrong Creek and outer growth corridors are increasing supply significantly, keeping vacancy elevated and yield compressed. Strong long-term story but short-term supply headwinds.'
  },

  {
    suburb: 'Shepparton',
    city: 'Shepparton',
    state: 'VIC',
    price: 350000,
    vacancyRate: 1.8,
    supplyRisk: 'balanced',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 5.9,
    rentGrowth: 'moderate',
    ownerOccupier: 'moderate',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Affordable Goulburn Valley market driven by food manufacturing and agriculture. Yield looks appealing but vacancy is climbing as new stock comes online. Significant flood risk — the 2022 flooding event caused widespread damage; flood-free property selection is critical. Mixed owner-occupier/investor split limits capital growth quality.'
  },

  {
    suburb: 'Wodonga',
    city: 'Albury-Wodonga',
    state: 'VIC',
    price: 480000,
    vacancyRate: 0.7,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 5.6,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'The Victorian side of Australia\'s largest inland bi-city. RAAF Base Wagga proximity, Army Barracks, and strong border economy make this a defensive income play. Very tight vacancy, low crime, and strong community profile. Often overlooked versus Albury but offers comparable fundamentals at a slight discount.'
  },

  // ── WA ──────────────────────────────────────

  {
    suburb: 'Bunbury',
    city: 'Bunbury',
    state: 'WA',
    price: 480000,
    vacancyRate: 1.1,
    supplyRisk: 'low',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 5.8,
    rentGrowth: 'strong',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'South-West WA hub seeing strong growth momentum. Port of Bunbury expansion, TAFE investment, solar energy hub development, and hospital upgrades creating diversified employment. Population flowing from Perth for affordability. Solid fundamentals across all five categories with no single major weakness.'
  },

  {
    suburb: 'Geraldton',
    city: 'Geraldton',
    state: 'WA',
    price: 360000,
    vacancyRate: 1.0,
    supplyRisk: 'very_limited',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 7.5,
    rentGrowth: 'explosive',
    ownerOccupier: 'moderate',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Mid-West WA market with exceptional yield driven by port activity, mining services, and green hydrogen project development. Rents surging as WA\'s broader market tightness flows north. Very limited new housing supply. Note: green hydrogen projects still in development phase — execution risk remains. Strong cash flow play.'
  },

  {
    suburb: 'Kalgoorlie',
    city: 'Kalgoorlie',
    state: 'WA',
    price: 320000,
    vacancyRate: 0.5,
    supplyRisk: 'very_limited',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 8.2,
    rentGrowth: 'explosive',
    ownerOccupier: 'moderate',
    ecoDiversity: 'single',
    naturalRisk: 'low',
    note: 'Australia\'s gold mining capital — one of the highest yields in the country at 8%+. Vacancy near zero. The critical risk is single-industry exposure to gold prices. When gold runs (as it has through 2025–26), Kalgoorlie is exceptional. When it turns, property can deflate rapidly. Not suitable for conservative investors.'
  },

  {
    suburb: 'Port Hedland',
    city: 'Port Hedland',
    state: 'WA',
    price: 420000,
    vacancyRate: 0.3,
    supplyRisk: 'very_limited',
    infraJobs: 'strong',
    popGrowth: 'flat',
    grossYield: 9.5,
    rentGrowth: 'strong',
    ownerOccupier: 'poor',
    ecoDiversity: 'single',
    naturalRisk: 'moderate',
    note: 'The world\'s largest bulk export port. Yields are extraordinary but the market is entirely driven by BHP, Fortescue, and iron ore prices. Population growth is flat — workers cycle through on FIFO arrangements, not as owner-occupiers. Low desirability limits quality capital growth. Pure cash flow investment; significant downside risk if iron ore softens.'
  },

  // ── SA ──────────────────────────────────────

  {
    suburb: 'Whyalla',
    city: 'Whyalla',
    state: 'SA',
    price: 220000,
    vacancyRate: 1.2,
    supplyRisk: 'very_limited',
    infraJobs: 'major',
    popGrowth: 'moderate',
    grossYield: 7.8,
    rentGrowth: 'explosive',
    ownerOccupier: 'moderate',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Green Steel transformation is the headline story — GFG Alliance\'s $1B green steel plant, Hydrogen Jobs Plan, and new renewable energy projects are reshaping the city\'s economic base from single-industry steel to a diversified clean energy hub. Very affordable entry, exceptional yield. Still carries execution risk on major projects; monitor progress closely.'
  },

  {
    suburb: 'Mount Gambier',
    city: 'Mount Gambier',
    state: 'SA',
    price: 340000,
    vacancyRate: 1.0,
    supplyRisk: 'low',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 6.2,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'South-East SA\'s capital city with a stable forestry, farming, healthcare, and tourism base. Strong community profile and high owner-occupier demand. Consistent rental market with low risk. Often overlooked by interstate investors, which has kept prices reasonable relative to fundamentals. Good all-round B+ performer.'
  },

  {
    suburb: 'Murray Bridge',
    city: 'Murray Bridge',
    state: 'SA',
    price: 290000,
    vacancyRate: 2.1,
    supplyRisk: 'balanced',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 6.5,
    rentGrowth: 'moderate',
    ownerOccupier: 'moderate',
    ecoDiversity: 'moderate',
    naturalRisk: 'moderate',
    note: 'Affordable Adelaide commuter belt market with some upside from data centre and food processing investment. However, vacancy has risen above 2% as new stock hits a market that lacks depth. Flood risk along the Murray River is real. The yield looks attractive but rising vacancy erodes net return. Wait for vacancy to tighten before entering.'
  },

  // ── TAS ─────────────────────────────────────

  {
    suburb: 'Launceston',
    city: 'Launceston',
    state: 'TAS',
    price: 480000,
    vacancyRate: 0.9,
    supplyRisk: 'very_limited',
    infraJobs: 'strong',
    popGrowth: 'good',
    grossYield: 5.7,
    rentGrowth: 'strong',
    ownerOccupier: 'strong',
    ecoDiversity: 'highly_diversified',
    naturalRisk: 'low',
    note: 'Northern Tasmania\'s hub city — one of Australia\'s most fundamentally sound regional markets. UTAS relocation to the CBD is transforming the city centre. Strong tourism, health, agribusiness, and clean energy sectors. Very limited housing supply due to geography. High owner-occupier demand and lifestyle appeal drive quality long-term capital growth. Recommended by most major property analysts in 2026.'
  },

  {
    suburb: 'Devonport',
    city: 'Devonport',
    state: 'TAS',
    price: 380000,
    vacancyRate: 1.2,
    supplyRisk: 'low',
    infraJobs: 'moderate',
    popGrowth: 'moderate',
    grossYield: 5.9,
    rentGrowth: 'moderate',
    ownerOccupier: 'good',
    ecoDiversity: 'moderate',
    naturalRisk: 'low',
    note: 'Northwest Tasmania port city with the Spirit of Tasmania ferry connection to Melbourne. Food Valley manufacturing, healthcare, and tourism provide reasonable diversification. More affordable entry than Launceston with decent yield. A solid C-to-B market — lacks the transformational growth story of Launceston but offers steady fundamentals.'
  },

];
