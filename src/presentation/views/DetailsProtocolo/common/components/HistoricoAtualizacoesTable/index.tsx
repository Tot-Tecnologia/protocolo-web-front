import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { HistoricoAtualizacao } from "./types";

const fakeData: HistoricoAtualizacao[] = [
  {
    etapa: 1,
    local: "Secretaria de Finanças",
    responsavel: "Francisco Carlos",
    possuiAlerta: false,
    dataHora: new Date("2025-02-07T09:21"),
    status: "fechado",
  },
  {
    etapa: 2,
    local: "Secretaria de Segurança",
    responsavel: "Eliezer Jr.",
    possuiAlerta: false,
    dataHora: new Date("2025-02-07T15:37"),
    status: "fechado",
  },
  {
    etapa: 3,
    local: "Gabinete",
    responsavel: "Jacinto Pinto",
    possuiAlerta: true,
    dataHora: new Date("2025-02-10T13:40"),
    status: "aberto",
  },
];

export function HistoricoAtualizacoesTable() {
  const table = useReactTable({
    data: fakeData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} title="Histórico de atualizações da solicitação" />
      <TablePagination total={44} />
    </div>
  );
}
