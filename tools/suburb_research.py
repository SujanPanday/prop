#!/usr/bin/env python3
"""
Suburb Research Playbook
========================
Opens ChatGPT in your Chrome browser via CDP, submits the research query,
reads the response, shows a preview, then updates suburb-table.js.

Requirements:
  - Chrome running with --remote-debugging-port=9222
  - Logged into ChatGPT in that Chrome

Usage (run from repo root):
  python3 tools/suburb_research.py "Kirwan QLD"
  python3 tools/suburb_research.py "Kirwan QLD" "Karama NT"
"""

import sys
import os
import re
import json
import argparse
import time

from playwright.sync_api import sync_playwright

REPO_ROOT    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBURB_TABLE = os.path.join(REPO_ROOT, 'js', 'suburb-table.js')
SCORER_JS    = os.path.join(REPO_ROOT, 'js', 'scorer.js')
CDP_URL      = 'http://localhost:9222'

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


def query_chatgpt_via_browser(suburb_name):
    query = generate_query(suburb_name)

    with sync_playwright() as p:
        # Connect to user's running Chrome
        try:
            browser   = p.chromium.connect_over_cdp(CDP_URL)
            context   = browser.contexts[0] if browser.contexts else browser.new_context()
        except Exception as e:
            print(f"  CDP error: {e}")
            print("  Make sure Chrome is running with --remote-debugging-port=9222")
            return None

        page = context.new_page()

        try:
            print("  Opening ChatGPT…")
            page.goto('https://chatgpt.com/', wait_until='domcontentloaded', timeout=30000)
            page.wait_for_timeout(3000)

            # Check if redirected to login
            if any(x in page.url for x in ['login', 'auth', 'signin']):
                print("\n  ChatGPT login required.")
                print("  Please log in to ChatGPT in the browser window that just opened.")
                input("  Press Enter here once you are logged in…")
                page.wait_for_timeout(3000)

            # Wait for the message input to appear
            print("  Waiting for ChatGPT to load…")
            page.wait_for_selector(
                '#prompt-textarea, [data-testid="prompt-textarea"], div[contenteditable="true"]',
                timeout=30000
            )
            page.wait_for_timeout(1500)

            # Click input and type query
            print("  Typing query…")
            input_box = (
                page.locator('#prompt-textarea').first
                or page.locator('div[contenteditable="true"]').first
            )
            input_box.click()
            page.wait_for_timeout(500)

            # Type query in chunks to avoid losing text
            for chunk in [query[i:i+200] for i in range(0, len(query), 200)]:
                page.keyboard.type(chunk, delay=10)
                page.wait_for_timeout(100)

            page.wait_for_timeout(800)

            # Send the message
            print("  Sending query to ChatGPT…")
            page.keyboard.press('Enter')

            # Wait for response to start appearing
            page.wait_for_selector(
                '[data-message-author-role="assistant"], [data-testid="conversation-turn-3"]',
                timeout=30000
            )

            # Wait for streaming to finish — button changes from Stop to Send
            print("  Waiting for ChatGPT response (may take 20–40s)…")
            max_wait = 120  # seconds
            for _ in range(max_wait):
                time.sleep(1)
                # Streaming is done when the stop button disappears
                stop_btn = page.query_selector('[data-testid="stop-button"], button[aria-label="Stop streaming"]')
                if not stop_btn:
                    break

            page.wait_for_timeout(1500)

            # Extract the last assistant message
            response = page.evaluate("""() => {
                const msgs = document.querySelectorAll('[data-message-author-role="assistant"]');
                if (!msgs.length) return '';
                return msgs[msgs.length - 1].innerText.trim();
            }""")

            if not response:
                # Fallback selector
                response = page.evaluate("""() => {
                    const turns = document.querySelectorAll('.markdown, [class*="prose"]');
                    if (!turns.length) return '';
                    return turns[turns.length - 1].innerText.trim();
                }""")

            return response

        except Exception as e:
            print(f"  Browser error: {e}")
            return None
        finally:
            page.close()


# ── Parsing ──────────────────────────────────────────────────────────────────

def parse_response(text):
    def get(label):
        m = re.search(rf'(?i){re.escape(label)}\s*[\n:]\s*([^\n]+)', text)
        return m.group(1).strip() if m else ''

    def to_float(s):
        if not s: return None
        s = re.sub(r'[^\d.]', '', s.replace(',', ''))
        try: return round(float(s), 1)
        except: return None

    def to_int(s):
        v = to_float(s)
        return int(v) if v is not None else None

    ij_map    = {'major': 'major', 'strong': 'strong', 'moderate': 'moderate', 'weak': 'weak'}
    crime_map = {'very_low': 'very_low', 'low': 'low', 'average': 'average', 'high': 'high'}

    suburb   = get('Suburb:')
    state    = get('State:')
    city     = get('City / Region:')
    pop_raw  = get('Population in that town not only in tha suburb:')
    cycle    = get('Market Cycle Stage:').strip()
    ij_raw   = get('Infrastructure & Jobs Strength:').strip().lower()
    ed_raw   = get('Economic Diversification:').strip().lower()
    crime_r  = get('Crime Rate:').strip().lower().replace(' ', '_')

    notes_m  = re.search(r'(?i)Notes:\s*\n([\s\S]+?)(?:\n\n|$)', text)
    note     = notes_m.group(1).strip() if notes_m else get('Notes:')
    note     = re.sub(r'\n[\*\-]\s*', ' ', note).strip()
    note     = re.sub(r'\s+', ' ', note)[:120]

    valid_cycles = {'Early', 'Early-Mid', 'Mid', 'Late', 'Peak'}
    if cycle not in valid_cycles:
        cycle = 'Mid'

    pop_k = round(to_int(pop_raw) / 1000) if to_int(pop_raw) else None

    return {
        'suburb':    suburb,
        'state':     state.upper() if state else '',
        'city':      city,
        'pop_k':     pop_k,
        'price':     to_int(get('Median House Price:')),
        'yield':     to_float(get('Gross Rental Yield:')),
        'growth':    to_float(get('Annual House Price Growth (1 Year):')),
        'vac':       to_float(get('Vacancy Rate:')),
        'dsr':       to_int(get('DSR (Demand to Supply Ratio):')),
        'cycle':     cycle,
        'infraJobs': ij_map.get(ij_raw, 'moderate'),
        'econD':     ij_map.get(ed_raw, 'moderate'),
        'crime':     crime_map.get(crime_r, 'average'),
        'dom':       to_int(get('Days on Market:')),
        'note':      note,
    }


# ── File updates ──────────────────────────────────────────────────────────────

def js_val(v):
    if v is None:           return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, str):
        return '"' + v.replace('\\','\\\\').replace('"','\\"') + '"'
    if isinstance(v, float):
        return f'{v:.1f}'
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


def update_suburb_table(data):
    with open(SUBURB_TABLE, 'r', encoding='utf-8') as f:
        content = f.read()

    suburb  = re.escape(data['suburb'])
    state   = re.escape(data['state'])
    pattern = rf'\{{rank:\d+,suburb:"{suburb}",[^{{}}]*?state:"{state}"[^{{}}]*?\}}'
    existing = re.search(pattern, content, re.IGNORECASE)

    if existing:
        rank_m   = re.search(r'rank:(\d+)', existing.group())
        rank     = int(rank_m.group(1)) if rank_m else 1
        new_line = build_entry(rank, data)
        content  = content[:existing.start()] + new_line + content[existing.end():]
        action   = f'Updated existing entry (rank {rank})'
    else:
        ranks    = [int(m) for m in re.findall(r'rank:(\d+)', content)]
        rank     = (max(ranks) + 1) if ranks else 1
        new_line = build_entry(rank, data)
        pos      = content.rfind('];')
        content  = content[:pos] + new_line + ',\n' + content[pos:]
        action   = f'Added new entry (rank {rank})'

    with open(SUBURB_TABLE, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  suburb-table.js: {action}")


def update_city_pop(city, pop_k):
    if not city or pop_k is None:
        return
    with open(SCORER_JS, 'r', encoding='utf-8') as f:
        content = f.read()

    existing = re.search(rf"'{re.escape(city)}':\d+", content)
    if existing:
        content = content[:existing.start()] + f"'{city}':{pop_k}" + content[existing.end():]
        action  = f'Updated {city} → {pop_k}k'
    else:
        pos     = content.rfind('};', 0, content.find('function scorePopulation'))
        content = content[:pos] + f"'{city}':{pop_k},\n" + content[pos:]
        action  = f'Added {city} → {pop_k}k'

    with open(SCORER_JS, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  scorer.js CITY_POP: {action}")


# ── Main ──────────────────────────────────────────────────────────────────────

def research_suburb(suburb_name):
    print(f"\n→ Researching: {suburb_name}")

    response = query_chatgpt_via_browser(suburb_name)

    if not response:
        print("  No response received.")
        return

    data = parse_response(response)

    # Show preview before updating anything
    print("\n" + "─"*50)
    print("  CHATGPT RESPONSE PREVIEW")
    print("─"*50)
    print(response)
    print("─"*50)
    print(f"\n  Parsed fields:")
    for k, v in data.items():
        if k != 'pop_k':
            print(f"    {k:12}: {v}")
    print(f"    {'pop (town)':12}: {(data['pop_k'] or 0) * 1000:,}" if data['pop_k'] else "    pop_k      : —")

    confirm = input("\n  Update suburb-table.js with this data? (y/n): ").strip().lower()
    if confirm != 'y':
        print("  Skipped — no changes made.")
        return

    update_suburb_table(data)
    if data.get('pop_k') and data.get('city'):
        update_city_pop(data['city'], data['pop_k'])

    print("  Done. Run: git diff js/ to review before committing.")


def main():
    parser = argparse.ArgumentParser(description='Research suburbs via ChatGPT in Chrome')
    parser.add_argument('suburbs', nargs='+', help='Suburb names e.g. "Armadale WA"')
    args = parser.parse_args()

    for suburb in args.suburbs:
        research_suburb(suburb)


if __name__ == '__main__':
    main()
