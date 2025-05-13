export interface IProtocoloModel {
  id: number;
  numeroProtocolo: string;
  tipoDocumento: number;
  numero: number;
  tipoSolicitacao: string;
  dataSolicitacao: string;
  status: "aberto" | "emAnalise" | "aprovado" | "rejeitado";
  orgaoResponsavel: string;
  observacao?: string;
}
