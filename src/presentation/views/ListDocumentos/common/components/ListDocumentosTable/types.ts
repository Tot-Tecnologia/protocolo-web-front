// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type IDocumento = {
  numero: number;
  tipoSolicitacao: string;
  dataSolicitacao: Date;
  status: "aberto" | "emAnalise" | "aprovado" | "rejeitado";
};
