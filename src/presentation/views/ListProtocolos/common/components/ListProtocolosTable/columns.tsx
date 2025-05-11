import { createColumnHelper } from "@tanstack/react-table";
import { ThemeColor } from "@/types/utils";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { ListProtocolosActionsColumn } from "../ListProtocolosActionsColumn";
import { ILoadProtocoloListResponseData } from "@/domain/usecases";

const columnHelper = createColumnHelper<ILoadProtocoloListResponseData>();

const getColor = (
  status: ILoadProtocoloListResponseData["status"],
): ThemeColor => {
  switch (status) {
    case "#TODO1":
      return "info";
    case "#TODO2":
      return "success";
    case "Em Análise":
      return "warning";
    case "#TODO3":
      return "error";
    default:
      return "error";
  }
};

export const columns = [
  columnHelper.accessor("numeroProtocolo", {
    header: "Número",
  }),
  columnHelper.display({
    id: "tipoSolicitacao",
    header: "Tipo de solicitação",
    cell: () => "#TODO",
  }),
  columnHelper.accessor(
    (protocolo) => {
      const raw = protocolo.dataSolicitacao;
      if (!raw) return "-";
      const date = new Date(raw);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("pt-BR");
    },
    {
      id: "dataSolicitacao",
      header: "Data da solicitação",
    },
  ),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge color={getColor(row.original.status)}>{row.original.status}</Badge>
    ),
  }),
  columnHelper.display({
    id: ACTIONS_COLUMN_ID,
    cell: (info) => <ListProtocolosActionsColumn info={info} />,
  }),
];
