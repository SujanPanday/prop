#!/usr/bin/env python3
"""
Suburb Update Tool — Paste & Parse
====================================
1. Run your ChatGPT query for a suburb
2. Copy the full response
3. Run: python3 tools/update_suburb.py
4. Paste the response, press Enter twice, then Ctrl+D
5. Review the parsed data and confirm update

Run from repo root: /Users/sujanpandey/prop/
"""

import re
import os
import sys

SUBURB_TABLE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'js', 'suburb-table.js')

QUERY_TEMPLATE = """
===================== CHATGPT QUERY TO USE =====================
You are a property research analyst.

Research the Australian suburb: [SUBURB NAME]

Return ONLY factual, evidence-based information.

Rules:
* Use the most recent available data.
* If exact data is unavailable, provide the closest reliable estimate.
* Do not leave any field blank.
* Do not provide investment advice.
* Do not calculate any score or rating.
* Keep factual and do not get a range, just an exact estimated number.
* Use the classification options exactly as provided below.

Return in the exact format below:

Suburb:
[Exact suburb name]

State:
[Exact state abbreviation]

City / Region:
[Exact city or regional area]

Population in that town not only in that suburb:
[Latest available population estimate as a plain number]

Median House Price:
[$amount]

Gross Rental Yield:
[% as a number only]

Annual House Price Growth (1 Year):
[% as a number only]

Vacancy Rate:
[% as a number only]

DSR (Demand to Supply Ratio):
[Value as a number only, 0-100]

Market Cycle Stage:
[Early | Early-Mid | Mid | Late | Peak]

Infrastructure & Jobs Strength:
[Major | Strong | Moderate | Weak]

Economic Diversification:
[Major | Strong | Moderate | Weak]

Crime Rate:
[Very Low | Low | Average | High]

Days on Market:
[Number of days as a number only]

Notes:
[1 sentence under 15 words — key investor fact about this suburb]
================================================================
"""


def get(label, text):
    m = re.search(rf'(?i){re.escape(label)}\s*[\n:]\s*([^\n]+)', text)
    return m.group(1).strip() if m else ''


def to_float(s):
    if not s:
        return None
    s = re.sub(r'[^\d.]', '', s.replace(',', ''))
    try:
        return round(float(s), 2)
    except ValueError:
        return None


def to_int(s):
    v = to_float(s)
    return int(v) if v is not None else None


def parse(text):
    ij_map    = {'major': 'major', 'strong': 'strong', 'moderate': 'moderate', 'weak': 'weak'}
    crime_map = {'very low': 'very_low', 'very_low': 'very_low', 'low': 'low',
                 'average': 'average', 'high': 'high'}

    suburb   = get('Suburb:', text)
    state    = get('State:', text).upper()
    city     = get('City / Region:', text)
    pop_raw  = get('Population in that town not only in that suburb:', text)
    cycle    = get('Market Cycle Stage:', text).strip()
    ij_raw   = get('Infrastructure & Jobs Strength:', text).strip().lower()
    ed_raw   = get('Economic Diversification:', text).strip().lower()
    crime_r  = get('Crime Rate:', text).strip().lower()

    # Notes — grab everything after "Notes:\n"
    notes_m = re.search(r'(?i)Notes:\s*\n([\s\S]+?)(?:\n\n|$)', text)
    note    = notes_m.group(1).strip() if notes_m else get('Notes:', text)
    note    = re.sub(r'\n[\*\-]\s*', ' ', note).strip()
    note    = re.sub(r'\s+', ' ', note)[:150]

    valid_cycles = {'Early', 'Early-Mid', 'Mid', 'Late', 'Peak'}
    if cycle not in valid_cycles:
        cycle = 'Mid'

    pop_k = round(to_int(pop_raw) / 1000) if to_int(pop_raw) else None

    return {
        'suburb':    suburb,
        'state':     state,
        'city':      city,
        'pop_k':     pop_k,
        'price':     to_int(get('Median House Price:', text)),
        'yield':     to_float(get('Gross Rental Yield:', text)),
        'growth':    to_float(get('Annual House Price Growth (1 Year):', text)),
        'vac':       to_float(get('Vacancy Rate:', text)),
        'dsr':       to_int(get('DSR (Demand to Supply Ratio):', text)),
        'cycle':     cycle,
        'infraJobs': ij_map.get(ij_raw, 'moderate'),
        'econD':     ij_map.get(ed_raw, 'moderate'),
        'crime':     crime_map.get(crime_r, 'average'),
        'dom':       to_int(get('Days on Market:', text)),
        'note':      note,
    }


def js_val(v):
    if v is None:           return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, str):  return '"' + v.replace('\\', '\\\\').replace('"', '\\"') + '"'
    if isinstance(v, float): return f'{v:.2f}'.rstrip('0').rstrip('.')
    return str(v)


def build_entry(rank, d):
    parts = [
        f'rank:{rank}',
        f'suburb:{js_val(d["suburb"])}',
        f'city:{js_val(d["city"])}',
        f'state:{js_val(d["state"])}',
        f'price:{js_val(d["price"])}',
        f'yield:{js_val(d["yield"])}',
        f'growth:{js_val(d["growth"])}',
        f'vac:{js_val(d["vac"])}',
        f'dsr:{js_val(d["dsr"])}',
        f'infraJobs:{js_val(d["infraJobs"])}',
        f'cycle:{js_val(d["cycle"])}',
        f'econD:{js_val(d["econD"])}',
        f'crime:{js_val(d["crime"])}',
        f'dom:{js_val(d["dom"])}',
        f'note:{js_val(d["note"])}',
    ]
    return '{' + ','.join(parts) + '}'


def update_table(data):
    with open(SUBURB_TABLE, 'r', encoding='utf-8') as f:
        content = f.read()

    suburb  = re.escape(data['suburb'])
    state   = re.escape(data['state'])
    pattern = rf'\{{rank:(\d+),suburb:"{suburb}",[^{{}}]*?state:"{state}"[^{{}}]*?\}}'
    existing = re.search(pattern, content, re.IGNORECASE)

    if existing:
        rank     = int(existing.group(1))
        new_line = build_entry(rank, data)
        content  = content[:existing.start()] + new_line + content[existing.end():]
        action   = f'Updated existing entry (rank {rank})'
    else:
        ranks    = [int(m) for m in re.findall(r'rank:(\d+)', content)]
        rank     = (max(ranks) + 1) if ranks else 1
        new_line = build_entry(rank, data)
        pos      = content.rfind('];')
        content  = content[:pos] + new_line + ',\n' + content[pos:]
        action   = f'Added as new entry (rank {rank})'

    with open(SUBURB_TABLE, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'\n  ✓ suburb-table.js: {action}')
    return True


def main():
    print(QUERY_TEMPLATE)
    print('\nPaste the ChatGPT response below.')
    print('When done, press Enter twice then Ctrl+D (Mac) or Ctrl+Z+Enter (Windows):\n')

    lines = []
    try:
        for line in sys.stdin:
            lines.append(line)
    except EOFError:
        pass

    response = ''.join(lines).strip()

    if not response:
        print('No response pasted. Exiting.')
        sys.exit(1)

    data = parse(response)

    if not data['suburb']:
        print('\n  ERROR: Could not parse suburb name. Check the response format.')
        sys.exit(1)

    # Show preview
    print('\n' + '─' * 55)
    print('  PARSED DATA PREVIEW')
    print('─' * 55)
    rows = [
        ('Suburb',    data['suburb']),
        ('State',     data['state']),
        ('City',      data['city']),
        ('Price',     f"${data['price']:,}" if data['price'] else '—'),
        ('Yield',     f"{data['yield']}%" if data['yield'] else '—'),
        ('Growth',    f"{data['growth']}%" if data['growth'] else '—'),
        ('Vacancy',   f"{data['vac']}%" if data['vac'] else '—'),
        ('DSR',       str(data['dsr']) if data['dsr'] else '—'),
        ('Cycle',     data['cycle']),
        ('InfraJobs', data['infraJobs']),
        ('Econ D',    data['econD']),
        ('Crime',     data['crime']),
        ('DOM',       f"{data['dom']} days" if data['dom'] else '—'),
        ('Pop (town)',f"{data['pop_k']}k" if data['pop_k'] else '—'),
        ('Note',      data['note'][:60] + '…' if len(data.get('note',''))>60 else data.get('note','')),
    ]
    for label, value in rows:
        print(f'  {label:<12}  {value}')
    print('─' * 55)

    confirm = input('\n  Update suburb-table.js with this data? (y/n): ').strip().lower()
    if confirm != 'y':
        print('  Skipped — no changes made.')
        sys.exit(0)

    update_table(data)
    print('  Run: git diff js/suburb-table.js  to review')
    print('  Run: git add js/suburb-table.js && git commit -m "Update [suburb] data" && git push origin main\n')


if __name__ == '__main__':
    main()
