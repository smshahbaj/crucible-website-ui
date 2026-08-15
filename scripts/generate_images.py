"""
Canonical asset generator.

The production favicon/OG pipeline lives in build_favicons.js because Sharp gives us
the same SVG source at every required size. This wrapper intentionally delegates to
that canonical generator so an old pixel renderer cannot overwrite the production
social card or favicon files.
"""

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "build_favicons.js"

try:
    result = subprocess.run(
        ["node", str(SCRIPT)],
        cwd=ROOT,
        check=False,
    )
except FileNotFoundError:
    print("Node.js is required. Run: node scripts/build_favicons.js", file=sys.stderr)
    raise SystemExit(1)

raise SystemExit(result.returncode)
