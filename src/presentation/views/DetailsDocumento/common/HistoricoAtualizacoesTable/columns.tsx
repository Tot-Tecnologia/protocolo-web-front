import { createColumnHelper } from "@tanstack/react-table";
import { IHistoricoAtualizacao } from "./types";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";

const columnHelper = createColumnHelper<IHistoricoAtualizacao>();

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
        <svg
          className="text-warning size-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 1.84961C17.6057 1.84961 22.1504 6.39431 22.1504 12C22.1504 17.6057 17.6057 22.1504 12 22.1504C6.39431 22.1504 1.84961 17.6057 1.84961 12C1.84961 6.39431 6.39431 1.84961 12 1.84961ZM12 3.65039C7.38842 3.65039 3.65039 7.38842 3.65039 12C3.65039 16.6116 7.38842 20.3496 12 20.3496C16.6116 20.3496 20.3496 16.6116 20.3496 12C20.3496 7.38842 16.6116 3.65039 12 3.65039ZM12 10.1953C12.3884 10.1953 12.7078 10.4908 12.7461 10.8691L12.75 10.9453V16.6221C12.7496 17.036 12.414 17.3721 12 17.3721C11.586 17.372 11.2504 17.036 11.25 16.6221V10.9453L11.2539 10.8691C11.2922 10.4909 11.6116 10.1954 12 10.1953ZM12.1025 6.53027C12.6067 6.58159 13 7.00771 13 7.52539C12.9998 8.04293 12.6066 8.4692 12.1025 8.52051L12 8.52539H11.999C11.4469 8.52534 10.9992 8.0775 10.999 7.52539C10.999 6.97313 11.4468 6.52544 11.999 6.52539H12L12.1025 6.53027Z" />
        </svg>
      ) : null,
  }),
];
