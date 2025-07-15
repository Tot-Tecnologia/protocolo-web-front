import { CellContext } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { LoadProtocoloListResponseData } from "@/domain/usecases";
import { SearchIcon } from "@/presentation/icons/SearchIcon";

type ListProtocolosActionsColumnProps = {
  info: CellContext<LoadProtocoloListResponseData, unknown>;
  link: string;
};

export function ListProtocolosActionsColumn({
  info,
  link,
}: ListProtocolosActionsColumnProps) {
  return (
    <span className="flex justify-end">
      <Link
        to={link}
        title={`Acessar detalhes da solicitação de número ${info.row.original.numeroProtocolo}`}
        params={{
          numeroProtocolo: `${info.row.original.numeroProtocolo}`,
        }}
      >
        <SearchIcon className="size-5" />
      </Link>
    </span>
  );
}
