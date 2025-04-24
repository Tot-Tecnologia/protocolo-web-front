import { CellContext } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { IDocumento } from "@/domain/models/listDocumentosModel";
import { DETAILS_DOCUMENTO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { SearchIcon } from "@/presentation/icons/SearchIcon";

type IListDocumentosActionsColumnProps = {
  info: CellContext<IDocumento, unknown>;
};

export function ListDocumentosActionsColumn({
  info,
}: IListDocumentosActionsColumnProps) {
  return (
    <span className="flex justify-end">
      <Link
        to={DETAILS_DOCUMENTO_ROUTE_URL}
        title={`Acessar detalhes da solicitação de número ${info.row.original.numero}`}
        params={{
          numeroDocumento: `${info.row.original.numero}`,
        }}
      >
        <SearchIcon className="size-5" />
      </Link>
    </span>
  );
}
