// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type GuiaPagamento = {
  numero: number;
  status: "pago";
  dataVencimento: Date;
};
