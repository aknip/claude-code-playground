# Slidev

- install: `pnpm install`

- start server: `(sleep 999999 | npx slidev slides.md --no-open) > /tmp/slidev-output.log 2>&1 &` — the sleep pipe keeps stdin open so the process stays alive in non-interactive shells; redirect output to a log file so startup info (including the actual port) is captured

- alternative start method: `pnpm dev`

- default URL: `http://localhost:3030` — but the port may auto-increment (e.g. 3031, 3032) if 3030 is already in use. Always check the server output log for the actual port.

- useful routes: `/presenter/` (presenter mode), `/overview/` (slides overview), `/export/` (export slides)