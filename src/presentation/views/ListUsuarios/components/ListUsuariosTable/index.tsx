import { LoadUsuarioListResponseData } from "@/domain/usecases/loadUsuariosList";
import { Table } from "@/presentation/components/Table";
import { TablePagination } from "@/presentation/components/TablePagination";
import { useListUsuariosTableColumns } from "@/presentation/views/ListUsuarios/components/ListUsuariosTable/columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const usuarios: LoadUsuarioListResponseData[] = [
  { id: 1, nome: "Ana Souza", orgao: "Prefeitura Municipal" },
  { id: 2, nome: "Bruno Lima", orgao: "Secretaria de Educação" },
  { id: 3, nome: "Carla Mendes", orgao: "Departamento de Trânsito" },
  { id: 4, nome: "Diego Ferreira", orgao: "Secretaria de Saúde" },
  { id: 5, nome: "Eduardo Silva", orgao: "Defesa Civil" },
  { id: 6, nome: "Fernanda Costa", orgao: "Meio Ambiente" },
  { id: 7, nome: "Gabriel Santos", orgao: "Secretaria de Esportes" },
  { id: 8, nome: "Helena Rocha", orgao: "Desenvolvimento Social" },
  { id: 9, nome: "Igor Almeida", orgao: "Procuradoria Geral" },
  { id: 10, nome: "Juliana Castro", orgao: "Secretaria de Obras" },
];

export function ListUsuariosTable() {
  const columns = useListUsuariosTableColumns();

  const table = useReactTable({
    data: usuarios,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid gap-y-6 md:gap-y-2">
      <Table table={table} />
      <TablePagination page={1} onChange={() => {}} total={2} />
    </div>
  );
}
