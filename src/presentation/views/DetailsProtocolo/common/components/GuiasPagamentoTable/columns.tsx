import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { EyeIcon } from "@/presentation/icons/EyeIcon";
import { DownloadIcon } from "@/presentation/icons/DownloadIcon";
import { GuiaPagamentoModel } from "@/domain/models/guiaPagamentoModel";

const columnHelper = createColumnHelper<GuiaPagamentoModel>();

export const columns = [
  columnHelper.accessor(({ id }) => id.toString().padStart(3, "0"), {
    id: "numero",
    header: "Número",
  }),

  columnHelper.accessor(({ nome }) => nome, {
    id: "nome",
    header: "nome"
  }),

  columnHelper.accessor("status", {
    header: "Situação",
    cell: (info) => (
      <Badge color={info.getValue() === "pago" ? "success" : "warning"}>
        {info.getValue() === "pago" ? "Pago" : "Pendente"}
      </Badge>
    ),
  }),

  columnHelper.accessor("dataCriacao", {
    id: "dataCriacao",
    header: "Data Criação",
    cell: (info) => info.getValue()?.length
      ? new Date(info.getValue()).toLocaleDateString()
      : "",
  }),

  columnHelper.accessor("dataPagamento", {
    id: "dataPagamento",
    header: "Data Pagamento",
    cell: (info) => info.getValue()?.length
      ? new Date(info.getValue()).toLocaleDateString()
      : "",
  }),

  columnHelper.display({
    id: ACTIONS_COLUMN_ID,
    cell: () => (
      <span className="text-info flex shrink flex-col items-center justify-end gap-5 md:flex-row md:gap-3.5">
        <DownloadIcon />
        <EyeIcon className="ml-0.25" />
      </span>
    ),
  }),
];
