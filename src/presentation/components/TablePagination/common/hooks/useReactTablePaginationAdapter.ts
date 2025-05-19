import { Table } from "@tanstack/react-table";
import { TablePaginationProps } from "../..";

type UseReactTablePaginationAdapterProps<TData = unknown> = {
  data: TData[];
  table: Table<TData>;
};

/**
 * Gera as props a serem usadas no componente `TablePagination`.
 *
 * @example
 * const tablePaginationProps = useReactTablePaginationAdapter({
 *   data: data,
 *   table: table,
 * });
 *
 * return (
 *    <div>
 *      <Table table={table} title="Tabela" />
 *      <TablePagination {...tablePaginationProps} />
 *    </div>
 *  );
 */
export function useReactTablePaginationAdapter<TData = unknown>({
  data,
  table,
}: UseReactTablePaginationAdapterProps<TData>): TablePaginationProps {
  const pageSize = table.getState().pagination.pageSize;

  return {
    total: Math.ceil(data.length / pageSize),
    page: table.getState().pagination.pageIndex + 1,
    onChange: (index: number) => table.setPageIndex(index - 1),
    initialPage: 1,
  };
}
