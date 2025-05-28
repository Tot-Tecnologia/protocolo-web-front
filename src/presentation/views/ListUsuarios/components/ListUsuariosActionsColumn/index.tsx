import { LoadUsuarioListResponseData } from "@/domain/usecases/loadUsuariosList";
import { EditIcon } from "@/presentation/icons/EditIcon";
import { ThrashIcon } from "@/presentation/icons/ThrashIcon";
import { Link } from "@tanstack/react-router";
import { CellContext } from "@tanstack/react-table";

export type ListUsuariosActionsColumnProps = {
    info: CellContext<LoadUsuarioListResponseData, unknown>;
}

export function ListUsuariosActionsColumn({
    info
}: ListUsuariosActionsColumnProps) {

    return (
        <span className="flex justify-evenly">
            <Link
                to="/"
                title={`Acessar detalhes do usuário`}
                params={{
                    numeroProtocolo: `${info.row.original.id}`,
                }}
            >
                <EditIcon className="size-5" />
            </Link>

            <Link
                to="/"
                title={`Acessar detalhes do usuário`}
                params={{
                    numeroProtocolo: `${info.row.original.id}`,
                }}
            >
                <ThrashIcon className="size-5" />
            </Link>
        </span>
    );

}