export enum ProtocoloStatus {
  ABERTO = "ABERTO",
  EM_ANALISE = "EM_ANALISE",
  APROVADO = "APROVADO",
  REJEITADO = "REJEITADO",
}

export const ProtocoloStatusEnumDescription: Record<
  keyof typeof ProtocoloStatus,
  string
> = {
  ABERTO: "Aberto",
  APROVADO: "Aprovado",
  EM_ANALISE: "Em análise",
  REJEITADO: "Rejeitado",
};
