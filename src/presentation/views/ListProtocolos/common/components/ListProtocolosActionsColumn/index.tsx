import { CellContext } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { IProtocoloModel } from "@/domain/models";
import { DETAILS_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { SearchIcon } from "@/presentation/icons/SearchIcon";

type IListProtocolosActionsColumnProps = {
  info: CellContext<IProtocoloModel, unknown>;
};

export function ListProtocolosActionsColumn({
  info,
}: IListProtocolosActionsColumnProps) {
  return (
    <span className="flex justify-end">
      <Link
        to={DETAILS_PROTOCOLO_ROUTE_URL}
        title={`Acessar detalhes da solicitação de número ${info.row.original.numero}`}
        params={{
          numeroProtocolo: `${info.row.original.numero}`,
        }}
      >
        <SearchIcon className="size-5" />
      </Link>
    </span>
  );
}
