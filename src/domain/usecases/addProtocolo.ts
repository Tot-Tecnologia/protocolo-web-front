export type AddProtocoloArgs = {
  id: number;
  cpfCnpj: string;
  telefone: string;
  nomeSolicitante: string;
  endereco: string;
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
  status: string;
  arquivos: File[];
};

export type AddProtocoloResponse = Omit<AddProtocoloArgs, "arquivos"> & {
  arquivos: Array<{
    id: number;
    nome: string;
  }>;
};

export interface AddProtocolo {
  save(args: AddProtocoloArgs, token: string): Promise<AddProtocoloResponse>;
}
