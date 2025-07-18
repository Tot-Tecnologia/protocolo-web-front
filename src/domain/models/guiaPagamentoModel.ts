// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type GuiaPagamentoModel = {
  id: number;
  nome: string;
  dataPagamento: string;
  dataCriacao: string;
  status: "pago";
};
