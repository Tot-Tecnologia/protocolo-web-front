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
  arquivos: unknown[]; // TODO
};

export interface AddProtocolo {
  save(args: AddProtocoloArgs, token: string): Promise<void>; // TODO: remover token daqui
}
