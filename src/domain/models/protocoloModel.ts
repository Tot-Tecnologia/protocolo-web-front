export type IProtocoloModel = {
  numero: number;
  tipoSolicitacao: string;
  dataSolicitacao: Date;
  status: "aberto" | "emAnalise" | "aprovado" | "rejeitado";
};
