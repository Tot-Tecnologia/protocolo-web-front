import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { columns } from "./columns";
import { LoadProtocoloList } from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useProtocolosListQuery } from "@/presentation/views/ListProtocolos/common/hooks/useProtocolosListQuery";

type IListProtocolosTableProps = {
  loadProtocoloList: LoadProtocoloList;
};

export function ListProtocolosTable({
  loadProtocoloList,
}: IListProtocolosTableProps) {
  const { paginaAtual } = useSearch({
    from: LIST_PROTOCOLOS_ROUTE_URL,
  });
  const [token] = useAccessToken();

  const { data, isLoading } = useProtocolosListQuery({
    args: { paginaAtual: paginaAtual ?? 0, itensPagina: 10 },
    loadProtocoloList,
    token,
  });

  const navigate = useNavigate({ from: LIST_PROTOCOLOS_ROUTE_URL });

  const tableData = useMemo(() => data?.data ?? [], [data]);

  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChangePage = (page: number) => {
    void navigate({
      search: (old) => ({ ...old, paginaAtual: page - 1 }),
    });
  };

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Table table={table} />
          <TablePagination
            page={(paginaAtual ?? 0) + 1}
            onChange={handleChangePage}
            total={data?.totalItems ?? 0}
          />
        </>
      )}
    </div>
  );
}
