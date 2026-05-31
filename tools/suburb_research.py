#!/usr/bin/env python3
"""
Suburb Research Playbook
========================
Queries ChatGPT for suburb data and updates js/suburb-table.js + js/scorer.js.

Usage:
  # Auto mode (needs OPENAI_API_KEY env var):
  python3 tools/suburb_research.py "Kirwan QLD"
  python3 tools/suburb_research.py "Kirwan QLD" "Karama NT" "Leanyer NT"

  # Manual mode (no API key — prints query, you paste response):
  python3 tools/suburb_research.py "Kirwan QLD" --manual

Run from the repo root: /Users/sujanpandey/prop/
"""

import sys
import os
import re
import json
import argparse

REPO_ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBURB_TABLE   = os.path.join(REPO_ROOT, 'js', 'suburb-table.js')
SCORER_JS      = os.path.join(REPO_ROOT, 'js', 'scorer.js')

QUERY_TEMPLATE = """\
You are a property research analyst.

Research the Australian suburb: {suburb}

Return ONLY factual, evidence-based information.

Rules:
* Use the most recent available data.
* If exact data is unavailable, provide the closest reliable estimate.
* Do not leave any field blank.
* Do not provide investment advice.
* Do not calculate any score or rating.
* Keep factual and do not get range just an exact estimated number.
* Use the classification options exactly as provided below.

Return in the exact format below:

Suburb:
[Exact suburb name]

State:
[Exact state]

City / Region:
[Exact city or regional area]

Population in that town not only in tha suburb:
[Latest available population estimate]

Median House Price:
[$amount]

Gross Rental Yield:
[%]

Annual House Price Growth (1 Year):
[%]

Vacancy Rate:
[%]

DSR (Demand to Supply Ratio):
[Value]

Market Cycle Stage:
[Early | Early-Mid | Mid | Late | Peak]

Infrastructure & Jobs Strength:
[Major | Strong | Moderate | Weak]

Economic Diversification:
[Major | Strong | Moderate | Weak]

Crime Rate:
[Very Low | Low | Average | High]

Days on Market:
[Number of days]

Notes:
[1 sentence, less than 15 words summarising the suburb for investors.]
"""


def generate_query(suburb_name):
    return QUERY_TEMPLATE.format(suburb=suburb_name)


def call_openai(query):
    try:
        from openai import OpenAI
    except ImportError:
        print("  openai package not found. Run: pip3 install openai")
        sys.exit(1)

    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": query}],
        temperature=0.2,
    )
    return resp.choices[0].message.content.strip()


def get_response_manual(query, suburb_name):
    print("\n" + "="*60)
    print(f"CHATGPT QUERY FOR: {suburb_name}")
    print("="*60)
    print(query)
    print("="*60)
    print("Paste ChatGPT response below, then press Ctrl+D (Mac/Linux):")
    print("="*60 + "\n")
    return sys.stdin.read().strip()


def parse_response(text):
    def get(label):
        # Match "Label:\n value" or "Label: value"
        pattern = rf'(?i){re.escape(label)}\s*[\n:]\s*([^\n]+)'
        m = re.search(pattern, text)
        return m.group(1).strip() if m else ''

    def to_float(s):
        if not s:
            return None
        s = re.sub(r'[^\d.]', '', s.replace(',', ''))
        try:
            return float(s)
        except ValueError:
            return None

    def to_int(s):
        v = to_float(s)
        return int(v) if v is not None else None

    suburb   = get('Suburb:')
    state    = get('State:')
    city     = get('City / Region:')
    pop_raw  = get('Population in that town not only in tha suburb:')
    price_r  = get('Median House Price:')
    yield_r  = get('Gross Rental Yield:')
    growth_r = get('Annual House Price Growth (1 Year):')
    vac_r    = get('Vacancy Rate:')
    dsr_r    = get('DSR (Demand to Supply Ratio):')
    cycle    = get('Market Cycle Stage:').strip()
    ij_raw   = get('Infrastructure & Jobs Strength:').strip().lower()
    ed_raw   = get('Economic Diversification:').strip().lower()
    crime_r  = get('Crime Rate:').strip().lower().replace(' ', '_')
    dom_r    = get('Days on Market:')

    # Notes — can be multi-line; grab everything after "Notes:\n"
    notes_m  = re.search(r'(?i)Notes:\s*\n([\s\S]+?)(?:\n\n|$)', text)
    note     = notes_m.group(1).strip() if notes_m else get('Notes:')
    # Collapse bullet lines into one sentence
    note     = re.sub(r'\n\*\s*', ' ', note).strip()
    note     = re.sub(r'\s+', ' ', note)
    if len(note) > 120:
        note = note[:117] + '...'

    # Normalise classification fields
    ij_map  = {'major': 'major', 'strong': 'strong', 'moderate': 'moderate', 'weak': 'weak'}
    ij      = ij_map.get(ij_raw, 'moderate')
    ed      = ij_map.get(ed_raw, 'moderate')

    # Validate cycle
    valid_cycles = {'Early', 'Early-Mid', 'Mid', 'Late', 'Peak'}
    if cycle not in valid_cycles:
        cycle = 'Mid'

    # Validate crime
    valid_crime = {'very_low', 'low', 'average', 'high'}
    crime = crime_r if crime_r in valid_crime else 'average'

    pop_k  = round(to_int(pop_raw) / 1000) if to_int(pop_raw) else None  # store in thousands

    return {
        'suburb':    suburb,
        'state':     state.upper() if state else state,
        'city':      city,
        'pop_k':     pop_k,        # population in thousands (for scorer.js CITY_POP)
        'price':     to_int(price_r),
        'yield':     to_float(yield_r),
        'growth':    to_float(growth_r),
        'vac':       to_float(vac_r),
        'dsr':       to_int(dsr_r),
        'cycle':     cycle,
        'infraJobs': ij,
        'econD':     ed,
        'crime':     crime,
        'dom':       to_int(dom_r),
        'note':      note,
    }


def js_value(v):
    """Format a Python value as a JavaScript literal."""
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, str):
        escaped = v.replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
        return f'"{escaped}"'
    if isinstance(v, float):
        return f'{v:.1f}' if v == round(v, 1) else str(v)
    return str(v)


def build_entry(rank, data):
    """Build a single-line JS object entry for MASTER_SUBURBS."""
    d = data
    parts = [
        f'rank:{rank}',
        f'suburb:{js_value(d["suburb"])}',
        f'city:{js_value(d["city"])}',
        f'state:{js_value(d["state"])}',
        f'price:{js_value(d["price"])}',
        f'yield:{js_value(d["yield"])}',
        f'growth:{js_value(d["growth"])}',
        f'vac:{js_value(d["vac"])}',
        f'dsr:{js_value(d["dsr"])}',
        f'infraJobs:{js_value(d["infraJobs"])}',
        f'cycle:{js_value(d["cycle"])}',
        f'econD:{js_value(d["econD"])}',
        f'crime:{js_value(d["crime"])}',
        f'dom:{js_value(d["dom"])}',
        f'note:{js_value(d["note"])}',
    ]
    return '{' + ','.join(parts) + '}'


def update_suburb_table(data):
    with open(SUBURB_TABLE, 'r', encoding='utf-8') as f:
        content = f.read()

    suburb = data['suburb']
    state  = data['state']

    # Find existing entry (case-insensitive suburb + state match)
    pattern = rf'\{{rank:\d+,suburb:"{re.escape(suburb)}",(?:[^{{}}])*?state:"{re.escape(state)}"(?:[^{{}}])*?\}}'
    existing = re.search(pattern, content, re.IGNORECASE)

    if existing:
        # Extract current rank from existing entry
        rank_m = re.search(r'rank:(\d+)', existing.group())
        rank   = int(rank_m.group(1)) if rank_m else 1
        new_entry = build_entry(rank, data)
        content   = content[:existing.start()] + new_entry + content[existing.end():]
        action    = f'Updated existing entry (rank {rank})'
    else:
        # Find highest rank and add 1
        ranks   = [int(m) for m in re.findall(r'rank:(\d+)', content)]
        rank    = (max(ranks) + 1) if ranks else 1
        new_entry = build_entry(rank, data)
        # Insert before closing bracket of MASTER_SUBURBS
        insert_pos = content.rfind('];')
        if insert_pos == -1:
            print("  ERROR: Could not find end of MASTER_SUBURBS array")
            return False
        content = content[:insert_pos] + new_entry + ',\n' + content[insert_pos:]
        action  = f'Added new entry (rank {rank})'

    with open(SUBURB_TABLE, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  suburb-table.js: {action}")
    return True


def update_city_pop(city, pop_k):
    """Update CITY_POP in scorer.js with the population (in thousands)."""
    if not city or pop_k is None:
        return

    with open(SCORER_JS, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if city already exists in CITY_POP
    existing = re.search(rf"'{re.escape(city)}':\d+", content)
    if existing:
        new_val  = f"'{city}':{pop_k}"
        content  = content[:existing.start()] + new_val + content[existing.end():]
        action   = f'Updated {city} → {pop_k}k'
    else:
        # Add before closing brace of CITY_POP object
        insert   = re.search(r"(const CITY_POP = \{[\s\S]+?)'([^']+)':\d+(\s*\};)", content)
        if insert:
            pos      = content.rfind("};", 0, content.find('function scorePopulation'))
            new_val  = f"'{city}':{pop_k},"
            content  = content[:pos] + new_val + '\n' + content[pos:]
            action   = f'Added {city} → {pop_k}k'
        else:
            action   = f'Could not insert {city} (CITY_POP not found)'

    with open(SCORER_JS, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  scorer.js CITY_POP: {action}")


def research_suburb(suburb_name, manual=False):
    print(f"\n→ Researching: {suburb_name}")

    query = generate_query(suburb_name)

    if manual or not os.environ.get('OPENAI_API_KEY'):
        response = get_response_manual(query, suburb_name)
    else:
        print("  Querying ChatGPT (gpt-4o)…")
        response = call_openai(query)

    if not response.strip():
        print("  No response received — skipping.")
        return

    data = parse_response(response)

    print(f"  Parsed: {data['suburb']} {data['state']} | "
          f"${data['price']:,} | {data['yield']}% yield | "
          f"{data['vac']}% vac | DSR {data['dsr']} | {data['cycle']}")

    if not data['suburb']:
        print("  ERROR: Could not parse suburb name from response.")
        return

    update_suburb_table(data)

    if data.get('pop_k') and data.get('city'):
        update_city_pop(data['city'], data['pop_k'])

    print(f"  Done.")


def main():
    parser = argparse.ArgumentParser(description='Research Australian suburbs via ChatGPT')
    parser.add_argument('suburbs', nargs='+', help='Suburb names, e.g. "Kirwan QLD"')
    parser.add_argument('--manual', action='store_true',
                        help='Print query and read response from stdin (no API key needed)')
    args = parser.parse_args()

    if not args.manual and not os.environ.get('OPENAI_API_KEY'):
        print("No OPENAI_API_KEY found — switching to manual mode.")
        print("Set it with: export OPENAI_API_KEY=sk-...")
        args.manual = True

    for suburb in args.suburbs:
        research_suburb(suburb, manual=args.manual)

    print("\nAll done. Run 'git diff js/' to review changes before committing.")


if __name__ == '__main__':
    main()
