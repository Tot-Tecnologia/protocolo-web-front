export type ProtocoloWebDefaultResponse = {
  codigo: number;
  mensagem: string;
  status: string;
  dataHora: string;
};

export type ProtocoloWebPaginationResponse<TData> = {
  data: TData[];
  itensPagina: number;
  totalPaginas: number;
  paginaAtual: number;
  paginaAnterior: boolean;
  primeiraPagina: boolean;
  proximaPagina: boolean;
  ultimaPagina: boolean;
  vazio: boolean;
};
