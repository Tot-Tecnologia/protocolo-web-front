import { LoadUsuarioListResponseData } from "@/domain/usecases/loadUsuariosList";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { ListUsuariosActionsColumn } from "@/presentation/views/ListUsuarios/components/ListUsuariosActionsColumn";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<LoadUsuarioListResponseData>();

export function useListUsuariosTableColumns() {
    return [
        columnHelper.accessor("nome", {
            header: "Nome"
        }),
        columnHelper.accessor("orgao", {
            header: "Orgão"
        }),
        columnHelper.display({
            id: ACTIONS_COLUMN_ID,
            cell: (info) => <ListUsuariosActionsColumn info={info} />,
        })
    ]
}