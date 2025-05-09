export type AddProtocoloArgs = {
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
  arquivos: File[];
};

export type AddProtocoloResponse = AddProtocoloArgs & {
  arquivos: Array<{
    id: number;
    nome: string;
  }>;
};

export interface AddProtocolo {
  save(args: AddProtocoloArgs, token: string): Promise<AddProtocoloResponse>;
}
