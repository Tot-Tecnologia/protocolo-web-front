import { ListDocumentos } from "@/presentation/views/ListDocumentos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/consultarDocumento/filtro")({
  component: ListDocumentos,
});
