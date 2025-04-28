// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type IGuiaPagamento = {
  numero: number;
  status: "pago";
  dataVencimento: Date;
};
