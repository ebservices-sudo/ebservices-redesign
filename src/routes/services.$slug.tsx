import { createFileRoute, redirect } from "@tanstack/react-router";

// Services live on the home page now; old links to /services/<name> land on that section.
export const Route = createFileRoute("/services/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "services", statusCode: 301 });
  },
});
