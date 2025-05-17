import { createColumnHelper } from "@tanstack/react-table";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { EyeIcon } from "@/presentation/icons/EyeIcon";
import { DownloadIcon } from "@/presentation/icons/DownloadIcon";

const columnHelper =
  createColumnHelper<LoadProtocoloDetailsResponse["documentos"][0]>();

export const columns = [
  columnHelper.accessor("id", {
    header: "Número",
  }),

  columnHelper.accessor("nome", {
    header: "Nome documento",
  }),

  columnHelper.accessor("dataCriacao", {
    header: "Data de envio",
    cell: (info) =>
      info.getValue()?.length
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
