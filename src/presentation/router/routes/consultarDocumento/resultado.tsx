import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/consultarDocumento/resultado")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>TODO</div>;
}
