import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IProtocoloModel } from "@/domain/models";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { columns } from "./columns";

const fakeData: IProtocoloModel[] = [
  {
    numero: 1869,
    tipoSolicitacao: "Alvará de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "aberto",
  },
  {
    numero: 7236,
    tipoSolicitacao: "Alvará de funcionamento de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "aberto",
  },
  {
    numero: 5623,
    tipoSolicitacao: "Alvará de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "emAnalise",
  },
  {
    numero: 9845,
    tipoSolicitacao: "Alvará de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "emAnalise",
  },
  {
    numero: 4112,
    tipoSolicitacao: "Alvará de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "aprovado",
  },
  {
    numero: 5689,
    tipoSolicitacao: "Alvará de funcionamento",
    dataSolicitacao: new Date("2025/02/21"),
    status: "rejeitado",
  },
];

export function ListProtocolosTable() {
  const table = useReactTable({
    data: fakeData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate({ from: LIST_PROTOCOLOS_ROUTE_URL });

  const { pagina } = useSearch({ from: LIST_PROTOCOLOS_ROUTE_URL });

  const handleChangePage = (page: number) => {
    void navigate({
      search: (oldSearchParams) => ({
        ...oldSearchParams,
        pagina: page - 1,
      }),
    });
  };

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} />
      <TablePagination
        page={(pagina ?? 0) + 1}
        onChange={handleChangePage}
        total={12}
      />
    </div>
  );
}
