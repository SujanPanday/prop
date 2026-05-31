import asyncio
import json
import re
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types
from playwright.sync_api import sync_playwright

app = Server("property-scraper")
CDP_URL = "http://localhost:9222"


def search_and_scrape(address: str) -> dict:
    """Search property.com.au for an address and extract property data."""
    with sync_playwright() as p:
        using_cdp = False
        browser   = None
        page      = None

        try:
            browser   = p.chromium.connect_over_cdp(CDP_URL)
            context   = browser.contexts[0] if browser.contexts else browser.new_context()
            page      = context.new_page()
            using_cdp = True
        except Exception:
            browser = p.chromium.launch(headless=True)
            page    = browser.new_page(user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ))

        try:
            # Step 1: Go to property.com.au
            page.goto("https://www.property.com.au/", wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2000)

            # Step 2: Click search area to reveal input
            page.get_by_text("Search an address, suburb or state").first.click(timeout=5000)
            page.wait_for_timeout(800)

            # Step 3: Type address
            page.locator("input[role=combobox]").fill(address)
            page.wait_for_timeout(3000)

            # Step 4: Click first suggestion (which navigates to property page)
            with context.expect_page(timeout=8000) as new_page_info:
                suggestions = page.locator("[role=listbox] li, [class*=suggest] li, [role=option]").all()
                if suggestions:
                    suggestions[0].click()
                else:
                    page.keyboard.press("Enter")

            prop_page = new_page_info.value
            prop_page.wait_for_load_state("networkidle", timeout=20000)

        except Exception:
            # Suggestion opened in same tab
            prop_page = page
            try:
                prop_page.wait_for_load_state("networkidle", timeout=10000)
            except Exception:
                pass

        try:
            prop_page.wait_for_timeout(2000)
            final_url = prop_page.url
            text      = prop_page.evaluate("() => document.body.innerText")
            photo     = prop_page.evaluate("""() => {
                const img = document.querySelector('[class*=photo] img, [class*=image] img, [class*=gallery] img');
                return img ? img.src : '';
            }""")
            return parse_property_page(text, final_url, photo, address)

        except Exception as e:
            return {"address": address, "error": str(e)}
        finally:
            try:
                prop_page.close()
            except Exception:
                pass
            if page and page != prop_page:
                try:
                    page.close()
                except Exception:
                    pass
            if not using_cdp and browser:
                browser.close()


def parse_property_page(text: str, url: str, photo: str, original_address: str) -> dict:

    def find(pattern, default="", flags=re.IGNORECASE):
        m = re.search(pattern, text, flags)
        return m.group(1).strip() if m else default

    def found(pattern):
        return bool(re.search(pattern, text, re.IGNORECASE))

    # --- Address ---
    addr_m = re.search(
        r"(\d+[A-Za-z]?\s+[A-Z][^\n]{3,40})\n([A-Z][^\n]+,\s*(?:QLD|NSW|VIC|WA|SA|TAS|NT|ACT)\s*\d{4})",
        text
    )
    if addr_m:
        address = f"{addr_m.group(1).strip()}, {addr_m.group(2).strip()}"
    else:
        address = original_address

    sub_m  = re.search(r",\s*([A-Z][a-zA-Z\s]+?),?\s*(QLD|NSW|VIC|WA|SA|TAS|NT|ACT)\s*(\d{4})", address)
    suburb = sub_m.group(1).strip() if sub_m else ""
    state  = sub_m.group(2).strip() if sub_m else ""

    # --- Core details (from "About the property" paragraph) ---
    beds  = int(find(r"(\d+)\s+bedroom", "0"))
    baths = int(find(r"(\d+)\s+bathroom", "0"))
    cars  = int(find(r"(\d+)\s+car\s+space", "0"))

    land_m = re.search(r"(\d+)m²\s+lot", text, re.IGNORECASE)
    land   = int(land_m.group(1)) if land_m else 0

    built_m = re.search(r"Building size:\s*(\d+)m²", text, re.IGNORECASE)
    housem2 = int(built_m.group(1)) if built_m else 0

    # --- Price ---
    price = 0
    for pattern in [
        r"listed for sale at \$([0-9,]+)",
        r"For sale\s*\n\s*\$([0-9,]+)",
        r"\$([0-9,]+)\s*\nFor sale",
    ]:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            price = int(m.group(1).replace(",", ""))
            break

    # --- Property type ---
    type_raw = find(r"Type:\s*(House|Townhouse|Unit|Apartment|Villa|Duplex)", "house")
    if "house" in type_raw.lower():
        prop_type = "house"
    elif "townhouse" in type_raw.lower():
        prop_type = "townhouse"
    else:
        prop_type = "unit"

    # --- Garage ---
    garage_spaces = int(find(r"Garage spaces:\s*(\d+)", "0"))
    effective     = garage_spaces if garage_spaces > 0 else cars
    garage        = "double" if effective >= 2 else ("single" if effective == 1 else "none")

    # --- Age ---
    year_m = re.search(r"Year built:\s*(\d{4})", text, re.IGNORECASE)
    age    = (2026 - int(year_m.group(1))) if year_m else 0

    # --- Overlays ---
    flood_m    = re.search(r"Flood overlay\s*\n\s*(Found|Not found)", text, re.IGNORECASE)
    heritage_m = re.search(r"Heritage overlay\s*\n\s*(Found|Not found)", text, re.IGNORECASE)
    bushfire_m = re.search(r"Bushfire overlay\s*\n\s*(Found|Not found)", text, re.IGNORECASE)

    flood    = flood_m.group(1).lower() == "found" if flood_m else found(r"detected a flood overlay")
    heritage = heritage_m.group(1).lower() == "found" if heritage_m else False

    bushfire = "none"
    if bushfire_m and bushfire_m.group(1).lower() == "found":
        if found(r"extreme|high\s+bushfire"):
            bushfire = "extreme"
        elif found(r"medium|moderate\s+bushfire"):
            bushfire = "medium"
        else:
            bushfire = "low"

    # --- NBN ---
    nbn = found(r"FTTP|FTTN|FTTB|FTTC|NBN Fibre|nbn available|nbn connected")

    # --- Schools ---
    pri1km = found(r"State School|Primary School|Catholic School|christian.*school")
    sec2km = found(r"State High School|Secondary School|High School|College.*catchment")

    return {
        "url":      url,
        "address":  address,
        "suburb":   suburb,
        "state":    state,
        "price":    price,
        "land":     land,
        "housem2":  housem2,
        "beds":     beds,
        "baths":    baths,
        "garage":   garage,
        "age":      age,
        "type":     prop_type,
        "photo":    photo,
        "flood":    flood,
        "heritage": heritage,
        "bushfire": bushfire,
        "nbn":      nbn,
        "pri1km":   pri1km,
        "sec2km":   sec2km,
        "_manual": [
            "structural", "crime", "mainroad", "industrial", "poorStreet",
            "culdesac", "quietstreet", "nothrough", "oostreet",
            "maintained", "presentation", "railbacking", "combacking",
            "multisch", "goodsch", "shops5", "hosp10", "employ15",
            "transport", "lowinsurance", "corner", "subdivision",
            "duplex", "granny", "walkschool", "walkshops"
        ]
    }


@app.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="fetch_properties",
            description=(
                "Search property.com.au for a list of property addresses and extract live data. "
                "Requires Chrome running with --remote-debugging-port=9222. "
                "Automatically searches each address, navigates to the property page, and returns structured data."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "addresses": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of full property addresses, e.g. ['8 Drummond Court Kirwan QLD 4817']"
                    }
                },
                "required": ["addresses"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name != "fetch_properties":
        raise ValueError(f"Unknown tool: {name}")

    addresses = arguments.get("addresses", [])
    if not addresses:
        return [types.TextContent(type="text", text="No addresses provided.")]

    results = []
    for address in addresses:
        loop   = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, search_and_scrape, address)
        results.append(result)

    return [types.TextContent(type="text", text=json.dumps(results, indent=2))]


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())


if __name__ == "__main__":
    asyncio.run(main())
