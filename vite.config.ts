// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
// - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
// componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
// error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages demo build (set by .github/workflows/deploy.yml).
// Builds a fully static site served from https://<user>.github.io/<repo>/.
// Normal Lovable builds are unaffected because GITHUB_PAGES is not set there.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const base = process.env.PAGES_BASE_PATH || "/ebservices-redesign/";

export default isGitHubPages
  ? defineConfig({
      nitro: false,
      tanstackStart: {
        prerender: { enabled: true, crawlLinks: true, failOnError: false },
        pages: [{ path: "/" }, { path: "/assistant" }],
        spa: { enabled: true },
      },
      vite: {
        base,
        // Prerendering starts a local preview server; pin it to IPv4 so it works on any CI runner.
        preview: { host: "127.0.0.1" },
      },
    })
  : defineConfig();
