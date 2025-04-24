import { createColumnHelper } from "@tanstack/react-table";
import { ThemeColor } from "@/types/utils";
import { IDocumento } from "@/domain/models/listDocumentosModel";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { ListDocumentosActionsColumn } from "../ListDocumentosActionsColumn";

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
    cell: (info) => <ListDocumentosActionsColumn info={info} />,
  }),
];
