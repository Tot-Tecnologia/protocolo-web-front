import { createColumnHelper } from "@tanstack/react-table";
import { HistoricoAtualizacao } from "./types";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { InfoIcon } from "@/presentation/icons/InfoIcon";

const columnHelper = createColumnHelper<HistoricoAtualizacao>();

export const columns = [
  columnHelper.accessor(({ etapa }) => etapa.toString().padStart(3, "0"), {
    id: "etapa",
    header: "Etapa",
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge color={info.getValue() === "aberto" ? "success" : "error"}>
        {info.getValue() === "aberto" ? "Aberto" : "Fechado"}
      </Badge>
    ),
  }),

  columnHelper.accessor("dataHora", {
    id: "data",
    header: "Data",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),

  columnHelper.accessor("dataHora", {
    id: "hora",
    header: "Hora",
    cell: (info) =>
      info
        .getValue()
        .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  }),

  columnHelper.accessor("local", {
    header: "Local",
  }),

  columnHelper.accessor("responsavel", {
    header: "Responsável",
  }),

  columnHelper.display({
    id: ACTIONS_COLUMN_ID,
    cell: (info) =>
      info.row.original.possuiAlerta ? (
        <span className="flex justify-end">
          <InfoIcon className="text-warning size-6" />
        </span>
      ) : null,
  }),
];
