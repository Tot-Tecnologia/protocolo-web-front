import { CellContext } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { LoadProtocoloListResponseData } from "@/domain/usecases";
import { DETAILS_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { SearchIcon } from "@/presentation/icons/SearchIcon";

type ListProtocolosActionsColumnProps = {
  info: CellContext<LoadProtocoloListResponseData, unknown>;
};

export function ListProtocolosActionsColumn({
  info,
}: ListProtocolosActionsColumnProps) {
  return (
    <span className="flex justify-end">
      <Link
        to={DETAILS_PROTOCOLO_ROUTE_URL}
        title={`Acessar detalhes da solicitação de número ${info.row.original.numeroProtocolo}`}
        params={{
          numeroProtocolo: `${info.row.original.id}`,
        }}
      >
        <SearchIcon className="size-5" />
      </Link>
    </span>
  );
}
