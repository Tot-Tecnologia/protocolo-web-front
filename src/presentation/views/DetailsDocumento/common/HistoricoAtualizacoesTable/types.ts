// TODO: mover para model da camada de domínio quando estiver pronto no back-end
export type IHistoricoAtualizacao = {
  etapa: number;
  status: "aberto" | "fechado";
  dataHora: Date;
  local: string;
  responsavel: string;
  possuiAlerta: boolean;
};
