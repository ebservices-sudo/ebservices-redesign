import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteProvider } from "@/components/site/SiteProvider";
import { StickyWhatsApp } from "@/components/site/WhatsApp";

import appCss from "../styles.css?url";

const TITLE = "EB Services — Digital Marketing Agency in Kosovo";
const DESCRIPTION =
  "Meta ads, ad design, websites, branding and an AI receptionist for businesses in Kosovo and across Europe.";

// Runs before first paint: applies the saved/system theme (no flash) and marks JS as available
// so scroll-reveal content is only hidden when it can actually be revealed.
const THEME_SCRIPT = `document.documentElement.classList.add('js');`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="label-eyebrow">Error 404</div>
        <h1 className="mt-4 text-6xl text-foreground">
          Page not <span className="accent-light text-primary">found.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-12 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition hover:bg-[#0F4789]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "EB Services" },
      { name: "theme-color", content: "#0A1A3A" },
      { property: "og:site_name", content: "EB Services" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ebservicesks.com" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://ebservicesks.com/og-image.png" },
      { name: "twitter:image", content: "https://ebservicesks.com/og-image.png" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "preload",
        href: "/fonts/BricolageGrotesque-Variable.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SiteProvider>
      <Outlet />
      <StickyWhatsApp />
    </SiteProvider>
  );
}
