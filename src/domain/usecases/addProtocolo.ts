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
  arquivos: File[];
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
  statusTexto: string;
  statusEnum: string;
  arquivos: Array<{
    id: number;
    nome: string;
  }>;
};

export interface AddProtocolo {
  save(args: AddProtocoloArgs, token: string): Promise<AddProtocoloResponse>;
}
