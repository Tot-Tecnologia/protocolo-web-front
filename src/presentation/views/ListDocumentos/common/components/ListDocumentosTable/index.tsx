import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import {
  columns,
  IDocumento,
} from "@/presentation/views/ListDocumentos/common/components/ListDocumentosTable/columns";
import { TablePagination } from "@/presentation/components/TablePagination";

const fakeData: IDocumento[] = [
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

export function ListDocumentosTable() {
  const table = useReactTable({
    data: fakeData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} />
      <TablePagination total={44} />
    </div>
  );
}
