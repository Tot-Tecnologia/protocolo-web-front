import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { IGuiaPagamento } from "./types";

const fakeData: IGuiaPagamento[] = [
  {
    numero: 1,
    status: "pago",
    dataVencimento: new Date("2025/02/18"),
  },
];

export function GuiasPagamentoTable() {
  const table = useReactTable({
    data: fakeData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} title="Guias de pagamento" />
      <TablePagination total={1} />
    </div>
  );
}
