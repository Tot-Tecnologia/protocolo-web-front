export type IDocumento = {
  numero: number;
  tipoSolicitacao: string;
  dataSolicitacao: Date;
  status: "aberto" | "emAnalise" | "aprovado" | "rejeitado";
};
