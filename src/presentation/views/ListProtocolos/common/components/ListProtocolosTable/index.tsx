import { useState, useEffect } from "react";
import { getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IProtocoloModel } from "@/domain/models";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { columns } from "./columns";
import { RemoteLoadProtocoloList } from "@/data/usecases/loadProtocoloList/remoteLoadProtocoloList";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";
import { ILoadProtocoloListArgs } from "@/domain/usecases";
import { mapProtocolo } from "@/presentation/utils/mapper";


export function ListProtocolosTable() {
  const [protocolos, setProtocolos] = useState<IProtocoloModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate({ from: LIST_PROTOCOLOS_ROUTE_URL });
  const { pagina } = useSearch({ from: LIST_PROTOCOLOS_ROUTE_URL });
  const currentPage = pagina ?? 0;

  useEffect(() => {
    const rawToken = localStorage.getItem("@ProtocoloWeb__Key=authToken");
    const token = rawToken ? JSON.parse(rawToken) : null;

    const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;

    if (!token || !baseUrl) {
      console.error("Token ou URL base não definidos.");
      return;
    }

    const httpClient = makeAxiosHttpClient();

    const protocoloService = new RemoteLoadProtocoloList(
      `${baseUrl}/portal-cidadao/protocolos`,
      {
        request: async (options) => {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
          return httpClient.request(options);
        },
      }
    );

    const args: ILoadProtocoloListArgs = {
      pagina: currentPage,
      itemsPorPagina: 10,
    };

    setLoading(true);

    protocoloService.loadWithFilter(args)
      .then(({ data, totalItems, itensPagina }) => {
        const mappedData = data.map(mapProtocolo); 
        setProtocolos(mappedData);
        setTotalItems(totalItems);
        setTotalPages(Math.ceil(totalItems / itensPagina));
      })
      .catch((error) => {
        console.error("Erro ao buscar protocolos:", error);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const table = useReactTable<IProtocoloModel>({
    data: protocolos,
    columns: columns as ColumnDef<IProtocoloModel, any>[],
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChangePage = (page: number) => {
    void navigate({
      search: (old) => ({ ...old, pagina: page - 1 }),
    });
  };

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Table table={table} />
          <TablePagination
            page={currentPage + 1}
            onChange={handleChangePage}
            total={totalItems}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
