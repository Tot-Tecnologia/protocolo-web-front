import { useMatch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/presentation/components/Card";
import axios from "axios";
import { mapProtocolo } from "@/presentation/utils/mapper";  // Importando a função de mapeamento

export function InformacoesCard() {
  const match = useMatch({ from: "/exibirProtocolo/$numeroProtocolo" });
  const { numeroProtocolo } = match?.params || {};

  const [protocolo, setProtocolo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!numeroProtocolo) {
      console.error("Número do protocolo não encontrado.");
      return;
    }

    const token = localStorage.getItem("@ProtocoloWeb__Key=authToken");

    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;

    axios
      .get(`${baseUrl}/cidadao/protocolos/${numeroProtocolo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Aplicar a função de mapeamento para ajustar os dados
        const mappedProtocolo = mapProtocolo(response.data);
        setProtocolo(mappedProtocolo);
      })
      .catch((error) => {
        console.error("Erro ao buscar protocolo:", error);
      })
      .finally(() => setLoading(false));
  }, [numeroProtocolo]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!protocolo) {
    return <p>Protocolo não encontrado.</p>;
  }

  return (
    <Card title="Informações">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
          <p>
            <b>Número</b>: {protocolo.numeroProtocolo}
          </p>
          <p>
            <b>Situação</b>: {protocolo.status}
          </p>
        </div>

        <p>
          <b>Tipo</b>: {protocolo.tipoSolicitacao}
        </p>

        <p>
          <b>Órgão responsável</b>: {protocolo.orgaoResponsavel}
        </p>

        <p>
          <b>Observação</b>: {protocolo.observacao || "Sem observações."}
        </p>
      </div>
    </Card>
  );
}
