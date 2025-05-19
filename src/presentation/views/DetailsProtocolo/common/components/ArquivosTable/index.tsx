import { useMemo } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { useReactTablePaginationAdapter } from "@/presentation/components/TablePagination/common/hooks/useReactTablePaginationAdapter";

type ArquivosTableProps = {
  protocolo: LoadProtocoloDetailsResponse | undefined;
};

export function ArquivosTable({ protocolo }: ArquivosTableProps) {
  const data = useMemo(
    () => protocolo?.documentos ?? [],
    [protocolo?.documentos],
  );

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
      <Table table={table} title="Arquivos já enviados" />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
}
