import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";
import { useMemo } from "react";
import { useReactTablePaginationAdapter } from "@/presentation/components/TablePagination/common/hooks/useReactTablePaginationAdapter";

type GuiasTableProps = {
  protocolo: LoadProtocoloDetailsResponse | undefined;
};

export function GuiasPagamentoTable({ protocolo }: GuiasTableProps) {
  const data = useMemo(() => protocolo?.guias ?? [], [protocolo?.guias]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const tablePaginationProps = useReactTablePaginationAdapter({
    data: data,
    table: table,
  });

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} title="Guias de pagamento" />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
}
