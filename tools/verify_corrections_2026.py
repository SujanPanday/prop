#!/usr/bin/env python3
"""
Verification Round 2 Corrections — May 2026
Fixes errors found during the double-check pass.
Run from repo root: python3 tools/verify_corrections_2026.py
"""

import re, os

SUBURB_TABLE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'js', 'suburb-table.js')

# Corrections from verification round (suburb, state): (corrected_price, corrected_yield, source_note)
CORRECTIONS = {
    # WA
    ("Rangeway",           "WA"):  (400000,  6.2,  "REIWA May'26: $400k, $480/wk rent → 6.2% yield"),
    ("Bulgarra",           "WA"):  (672000,  10.1, "REIWA May'26: $671,500, $1,300/wk → 10.1% yield; over $650k cap"),
    ("Pegs Creek",         "WA"):  (650000,  7.4,  "REIWA May'26: $650k, $925/wk → 7.4% yield"),
    ("Spencer Park",       "WA"):  (718000,  5.4,  "REIWA May'26: $718k, $740/wk → 5.4% yield; over $650k cap → D"),
    ("Centennial Park WA", "WA"):  (620000,  3.8,  "REIWA May'26: $620k, $450/wk → 3.8% yield"),

    # SA
    ("Smithfield SA",      "SA"):  (602000,  4.5,  "PropertyValue May'26: $602k median sale, 4.5% yield"),
    ("Elizabeth",          "SA"):  (628000,  4.1,  "YIP/Domain May'26: $628k median, ~$495/wk → 4.1%"),

    # QLD
    ("Thuringowa Central", "QLD"): (590000,  4.6,  "PropertyValue May'26: $590k median, +16.4%, 4.6% yield"),
    ("Gracemere",          "QLD"): (615000,  4.8,  "YIP May'26: $615k median, +21.8%"),
    ("Park Avenue",        "QLD"): (535000,  5.9,  "FNComplete Jan'26: $535k, 5.9% yield"),
    ("Manoora",            "QLD"): (510000,  5.0,  "PropertyValue May'26: $510k median, +6.7%"),
    ("Emu Park",           "QLD"): (705000,  5.2,  "YIP May'26: $705k; over $650k cap → D grade"),
    ("Tannum Sands",       "QLD"): (648000,  4.7,  "YIP listing median ~$650k; conservative $648k"),

    # VIC
    ("Newcomb",            "VIC"): (624000,  4.4,  "search May'26: ~$624k, yield ~4.4%"),
    ("Sebastopol",         "VIC"): (496000,  4.8,  "InvestorKit May'26: $496,037, +20%"),
    ("Wendouree",          "VIC"): (510000,  4.3,  "InvestorKit May'26: $510,073, +19.9%"),
    ("Mount Clear",        "VIC"): (606000,  4.8,  "InvestorKit May'26: $606,450, +19.4%"),
    ("Shepparton",         "VIC"): (495000,  5.3,  "YIP May'26: $494,700 median, +3.3%"),
    ("Mooroopna",          "VIC"): (457000,  5.8,  "HtAG/YIP May'26: $457,500 median"),
    ("Corio",              "VIC"): (499000,  5.2,  "OpenAgent May'26: ~$499k"),

    # NSW
    ("Ashmont",            "NSW"): (430000,  5.6,  "YIP May'26: $430k, +4.1%"),
    ("Lavington",          "NSW"): (595000,  4.5,  "PropertyValue May'26: $595k median, +19.7%"),
    ("West Tamworth",      "NSW"): (465000,  4.7,  "PropertyValue May'26: $465k median, +24.9%"),
    ("South Tamworth",     "NSW"): (465000,  5.0,  "est. ~same as West Tamworth; below $500k per local agents"),
    ("Armidale",           "NSW"): (575000,  5.2,  "YIP May'26: $575k median, +11.7%"),
    ("Griffith",           "NSW"): (610000,  5.0,  "search May'26: $610k median"),

    # TAS
    ("Gagebrook",          "TAS"): (383000,  6.4,  "TAS market data: $382,750"),
    ("Bridgewater",        "TAS"): (430000,  5.2,  "TAS market data: $430k"),
    ("New Norfolk",        "TAS"): (451000,  4.8,  "TAS market data: $451k"),
}


def load_and_update():
    with open(SUBURB_TABLE, 'r') as f:
        content = f.read()

    updated = 0
    not_found = []

    for (suburb, state), (new_price, new_yield, note) in CORRECTIONS.items():
        suburb_esc = re.escape(suburb)
        state_esc  = re.escape(state)
        pattern = (
            r'(\{rank:\d+,suburb:"' + suburb_esc + r'",city:"[^"]+",state:"' + state_esc + r'",'
            r'price:)(\d+)'
            r'(,yield:)([\d.]+)'
        )
        def replacer(m, p=new_price, y=new_yield):
            return f'{m.group(1)}{p}{m.group(3)}{y}'

        new_content, n = re.subn(pattern, replacer, content)
        if n > 0:
            content = new_content
            updated += 1
            flag = " ← OVER CAP" if new_price > 650000 else ""
            print(f'  ✓ {suburb} ({state}): ${new_price:,}  {new_yield}%{flag}  [{note[:50]}]')
        else:
            not_found.append(f'{suburb} ({state})')

    with open(SUBURB_TABLE, 'w') as f:
        f.write(content)

    print(f'\n{"="*60}')
    print(f'Corrected: {updated} suburbs')
    if not_found:
        print(f'Not found ({len(not_found)}): {", ".join(not_found)}')
    print(f'{"="*60}')


if __name__ == '__main__':
    print('\nApplying verification corrections (May 2026)...\n')
    load_and_update()
