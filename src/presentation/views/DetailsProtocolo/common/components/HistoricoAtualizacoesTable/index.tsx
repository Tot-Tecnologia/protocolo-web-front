import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { useReactTablePaginationAdapter } from "@/presentation/components/TablePagination/common/hooks/useReactTablePaginationAdapter";
import { useMemo } from "react";

export function HistoricoAtualizacoesTable() {
  const data = useMemo(() => [], []);

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
      <Table table={table} title="Histórico de atualizações da solicitação" />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
}
