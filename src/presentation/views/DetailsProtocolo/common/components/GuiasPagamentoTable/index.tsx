import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { columns } from "./columns";
import { GuiaPagamento } from "./types";

const fakeData: GuiaPagamento[] = [
  {
    numero: 1,
    status: "pago",
    dataVencimento: new Date("2025/02/18"),
  },
];

export function GuiasPagamentoTable() {
  const table = useReactTable({
    data: [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (fakeData) {
    // não faz nada
  }

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} title="Guias de pagamento" />
      <TablePagination total={0} />
    </div>
  );
}
