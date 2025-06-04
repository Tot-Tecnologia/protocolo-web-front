import { ProtocoloStatus } from "@/data/constants/protocoloStatusEnum";
import type { GuiaPagamentoModel } from "../models/guiaPagamentoModel";

export type AddProtocoloArgs = {
  cpfCnpj: string;
  telefone: string;
  nomeSolicitante: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  estado: string;
  email: string;
  complemento: string;
  descricao: string;
  cidade: string;
  tipoDocumento: number;
  documentos: File[];
};

export type AddProtocoloResponse = {
  id: number;
  numeroProtocolo: string;
  cpfCnpj: string;
  telefone: string;
  nomeSolicitante: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  estado: string;
  email: string;
  complemento: string;
  descricao: string;
  cidade: string;
  tipoDocumentoTexto: string;
  tipoDocumentoId: number;
  status: ProtocoloStatus;
  documentos: Array<{
    id: number;
    nome: string;
    dataCriacao: string;
  }>;
  guias: GuiaPagamentoModel[];
};

export interface AddProtocolo {
  save(args: AddProtocoloArgs, token: string): Promise<AddProtocoloResponse>;
}
