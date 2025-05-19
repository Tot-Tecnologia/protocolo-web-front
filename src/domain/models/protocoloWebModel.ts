export type ProtocoloWebErrorResponse = {
  statusCode: number;
  dateTime: string;
  errors: Array<{
    message: string;
    field: string;
  }>;
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
