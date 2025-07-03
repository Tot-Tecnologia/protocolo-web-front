import { ProtocoloStatus } from "@/data/constants/protocoloStatusEnum";
import { ProtocoloWebPaginationResponse } from "@/domain/models";

export type LoadProtocoloListArgs = {
  paginaAtual: number;
  itensPagina: number;
  cpfCnpj?: string | null;
  numeroProtocolo?: string | null;
  ano?: number | null;
  tipoDocumento?: number | null;
};

export type LoadProtocoloListResponseData = {
  id: number;
  numeroProtocolo: string;
  tipoDocumento: number;
  dataSolicitacao: string;
  status: ProtocoloStatus;
};

export type LoadProtocoloListResponse =
  ProtocoloWebPaginationResponse<LoadProtocoloListResponseData>;

export interface LoadProtocoloList {
  loadWithFilter: (
    args: LoadProtocoloListArgs,
  ) => Promise<LoadProtocoloListResponse>;
}
