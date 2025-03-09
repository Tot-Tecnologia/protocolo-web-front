import { ListProcessos } from "@/views/ListProcessos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/consultarProcessos/filtro")({
  component: ListProcessos,
});
