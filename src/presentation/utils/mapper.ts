import { IProtocoloModel } from "@/domain/models";

export const mapTipoDocumento = (tipo: number): string => {
    const map: Record<number, string> = {
      1: "Alvará",
      2: "Requerimento",
      3: "Denúncia",
      4: "Outro",
    };
    return map[tipo] ?? `Tipo ${tipo}`;
  };
  
  export const normalizarStatus = (status: string): "aberto" | "emAnalise" | "aprovado" | "rejeitado" => {
    const statusNormalizado = status.trim().toLowerCase();
    switch (statusNormalizado) {
      case "em análise":
        return "emAnalise";
      case "aprovado":
      case "rejeitado":
      case "aberto":
        return statusNormalizado as "aberto" | "emAnalise" | "aprovado" | "rejeitado";
      default:
        return "aberto"; // valor padrão
    }
  };
  
  export const mapProtocolo = (item: any): IProtocoloModel => ({
    id: item.id,  
    numeroProtocolo: item.numeroProtocolo,  
    tipoDocumento: item.tipoDocumento,  
    numero: Number(item.numeroProtocolo.replace(/[^\d]/g, "")), 
    tipoSolicitacao: mapTipoDocumento(item.tipoDocumento),  
    dataSolicitacao: new Date(item.dataSolicitacao).toISOString(),  
    status: normalizarStatus(item.status),  
    orgaoResponsavel: item.orgaoResponsavel,  
    observacao: item.observacao,  
  });
  