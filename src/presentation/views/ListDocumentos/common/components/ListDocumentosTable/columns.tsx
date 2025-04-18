import { Badge } from "@/presentation/components/Badge";
import { Button } from "@/presentation/components/Button";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { ThemeColor } from "@/types/utils";
import { createColumnHelper } from "@tanstack/react-table";

// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type IDocumento = {
  numero: number;
  tipoSolicitacao: string;
  dataSolicitacao: Date;
  status: "aberto" | "emAnalise" | "aprovado" | "rejeitado";
};

const columnHelper = createColumnHelper<IDocumento>();

const getColor = (status: IDocumento["status"]): ThemeColor => {
  switch (status) {
    case "aberto":
      return "info";
    case "aprovado":
      return "success";
    case "emAnalise":
      return "warning";
    case "rejeitado":
      return "error";
    default:
      return "error";
  }
};

const getDescription = (status: IDocumento["status"]) => {
  switch (status) {
    case "aberto":
      return "Aberto";
    case "aprovado":
      return "Aprovado";
    case "emAnalise":
      return "Em análise";
    case "rejeitado":
      return "Rejeitado";
    default:
      return "Null";
  }
};

export const columns = [
  columnHelper.accessor("numero", {
    header: "Número",
  }),
  columnHelper.accessor("tipoSolicitacao", {
    header: "Tipo de solicitação",
  }),
  columnHelper.accessor(
    (documento) => documento.dataSolicitacao.toLocaleDateString(),
    {
      id: "dataSolicitacao",
      header: "Data da solicitação",
    },
  ),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge color={getColor(row.original.status)}>
        {getDescription(row.original.status)}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: ACTIONS_COLUMN_ID,
    cell: () => (
      <Button
        aria-label="Consultar detalhes da solicitação"
        size="small"
        variant="outlined"
        onClick={() => alert("TODO")}
        title="Consultar detalhes"
        className="px-1!"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 22 22"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
        </svg>
      </Button>
    ),
  }),
];
