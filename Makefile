.PHONY: install build start dev deploy stop logs

# --- PARSMONARCH — Next.js 16 Landing Page ---
# Runs on port 3000. Caddy proxies parsmonarch.com → 127.0.0.1:3000

PID_FILE := .parsmonarch.pid
LOG_FILE := .parsmonarch.log

install:
	pnpm install

build:
	pnpm build

start:
	pnpm start

dev:
	pnpm dev

# Deploy: build then start in background (nohup — no systemd)
deploy: build
	@if [ -f $(PID_FILE) ]; then \
		kill $$(cat $(PID_FILE)) 2>/dev/null || true; \
		rm -f $(PID_FILE); \
	fi
	@nohup pnpm start > $(LOG_FILE) 2>&1 & echo $$! > $(PID_FILE)
	@echo "PARSMONARCH started on port 3000 (PID=$$(cat $(PID_FILE)))"
	@echo "Logs: tail -f $(LOG_FILE)"

stop:
	@if [ -f $(PID_FILE) ]; then \
		kill $$(cat $(PID_FILE)) 2>/dev/null && echo "Stopped." || echo "Process not found."; \
		rm -f $(PID_FILE); \
	else \
		echo "No PID file found — not running?"; \
	fi

logs:
	@tail -f $(LOG_FILE)
