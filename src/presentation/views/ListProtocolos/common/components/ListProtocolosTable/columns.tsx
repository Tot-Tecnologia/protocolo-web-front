import { createColumnHelper } from "@tanstack/react-table";
import { ThemeColor } from "@/types/utils";
import { Badge } from "@/presentation/components/Badge";
import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { ListProtocolosActionsColumn } from "../ListProtocolosActionsColumn";
import { LoadProtocoloListResponseData } from "@/domain/usecases";
import { TipoDocumentoModel } from "@/domain/models";
import {
  ProtocoloStatus,
  ProtocoloStatusEnumDescription,
} from "@/data/constants/protocoloStatusEnum";

type IUseListProtocolosTableColumnsProps = {
  tipoDocumentoList: TipoDocumentoModel[] | undefined;
  link: string;
};

const columnHelper = createColumnHelper<LoadProtocoloListResponseData>();

const getColor = (status: ProtocoloStatus): ThemeColor => {
  switch (status) {
    case ProtocoloStatus.ABERTO:
      return "info";
    case ProtocoloStatus.APROVADO:
      return "success";
    case ProtocoloStatus.EM_ANALISE:
      return "warning";
    case ProtocoloStatus.REJEITADO:
      return "error";
    default:
      return "error";
  }
};

export function useListProtocolosTableColumns({
  tipoDocumentoList,
  link,
}: IUseListProtocolosTableColumnsProps) {
  return [
    columnHelper.accessor("numeroProtocolo", {
      header: "Número",
    }),
    columnHelper.display({
      id: "tipoSolicitacao",
      header: "Tipo de solicitação",
      cell: (info) =>
        tipoDocumentoList?.find(
          (tipoDocumento) =>
            tipoDocumento.id === info.row.original.tipoDocumento,
        )?.nome ?? "Carregando...",
    }),
    columnHelper.accessor(
      (protocolo) => {
        const raw = protocolo.dataSolicitacao;
        if (!raw) return "-";
        const date = new Date(raw);
        return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("pt-BR");
      },
      {
        id: "dataSolicitacao",
        header: "Data da solicitação",
      },
    ),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge color={getColor(info.getValue())}>
          {ProtocoloStatusEnumDescription[info.getValue()]}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: ACTIONS_COLUMN_ID,
      cell: (info) => <ListProtocolosActionsColumn link={link} info={info} />,
    }),
  ];
}
