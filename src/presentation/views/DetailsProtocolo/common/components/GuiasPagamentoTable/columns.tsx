import { createColumnHelper } from "@tanstack/react-table";
import { GuiaPagamento } from "./types";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { EyeIcon } from "@/presentation/icons/EyeIcon";
import { DownloadIcon } from "@/presentation/icons/DownloadIcon";

const columnHelper = createColumnHelper<GuiaPagamento>();

export const columns = [
  columnHelper.accessor(({ numero }) => numero.toString().padStart(3, "0"), {
    id: "numero",
    header: "Número",
  }),

  columnHelper.accessor("status", {
    header: "Situação",
    cell: (info) => (
      <Badge color={info.getValue() === "pago" ? "success" : "error"}>
        {info.getValue() === "pago" ? "Pago" : "Error"}
      </Badge>
    ),
  }),

  columnHelper.accessor("dataVencimento", {
    id: "data",
    header: "Data",
    cell: (info) => info.getValue().toLocaleDateString(),
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
