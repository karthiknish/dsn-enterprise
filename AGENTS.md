<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Browser automation

Exactly one browser stack is configured for this machine and project:
**agent-browser** (CLI + MCP). Adding a second one is what previously left ~20
Chromium instances running — `chrome-devtools` and `alumnium` were disabled for
that reason, and the `oh-my-openagent` plugin (which registered its own) has
been removed. Don't reintroduce another.

- Prefer the `agent-browser` CLI, or the `agent_browser_*` MCP tools.
- **Always use a named session.** The default (unnamed) session is shared
  machine-wide and persists across conversations, so it will hijack whatever
  another agent or the human has open:

  ```bash
  export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix dsn)"
  ```

- `agent-browser open <url>` navigates the **current tab**. Never loop it over a
  URL list expecting one browser — that is how the tab/browser pile-up started.
  Use `tab new` / `tab close` deliberately when you actually want tabs.
- `agent-browser doctor` diagnoses stale daemons and version mismatches;
  `doctor --fix` repairs. Run it after any upgrade.

