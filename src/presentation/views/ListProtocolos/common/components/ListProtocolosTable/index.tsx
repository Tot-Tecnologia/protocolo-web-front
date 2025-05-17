import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { useListProtocolosTableColumns } from "./columns";
import { LoadProtocoloList, LoadTiposDocumentoList } from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useProtocolosListQuery } from "@/presentation/views/ListProtocolos/common/hooks/useProtocolosListQuery";
import { useTiposDocumentoListQuery } from "@/presentation/queries/useTiposDocumentoListQuery";
import { removeNullish } from "@/presentation/utils/objectUtils/removeNullish";

type ListProtocolosTableProps = {
  loadProtocoloList: LoadProtocoloList;
  loadTiposDocumentoList: LoadTiposDocumentoList;
};

const itensPagina = 10;

export function ListProtocolosTable({
  loadProtocoloList,
  loadTiposDocumentoList,
}: ListProtocolosTableProps) {
  const { paginaAtual, ano, tipoDocumento, numeroProtocolo, cpfCnpj } =
    useSearch({
      from: LIST_PROTOCOLOS_ROUTE_URL,
    });

  const [token] = useAccessToken();

  const tipoDocumentoParsed =
    tipoDocumento != null && tipoDocumento > 0 ? tipoDocumento : null;

  const protocolosListQuery = useProtocolosListQuery({
    args: {
      paginaAtual: paginaAtual ?? 0,
      itensPagina: itensPagina,
      ...removeNullish({
        ano: ano,
        tipoDocumento: tipoDocumentoParsed,
        numeroProtocolo: numeroProtocolo,
        cpfCnpj: cpfCnpj,
      }),
    },
    loadProtocoloList: loadProtocoloList,
    token: token,
  });

  const tipoDocumentoListQuery = useTiposDocumentoListQuery({
    loadTiposDocumentoList: loadTiposDocumentoList,
    token: token,
  });

  const columns = useListProtocolosTableColumns({
    tipoDocumentoList: tipoDocumentoListQuery.data,
  });

  const navigate = useNavigate({ from: LIST_PROTOCOLOS_ROUTE_URL });

  const tableData = useMemo(
    () => protocolosListQuery?.data?.data ?? [],
    [protocolosListQuery?.data],
  );

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
      {protocolosListQuery.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Table table={table} />
          <TablePagination
            page={(paginaAtual ?? 0) + 1}
            onChange={handleChangePage}
            total={protocolosListQuery.data?.totalPaginas ?? 0}
          />
        </>
      )}
    </div>
  );
}
