import { Card } from "@/presentation/components/Card";
import { ConsultarCidadaoCard } from "../ConsultarCidadaoCard";
import { EnviarMensagemCard } from "@/presentation/views/DetailsProtocoloServidor/common/components/EnviarMensagemCard";

export function AnaliseCidadaoCard() {

    return (

        <Card title="Análise">
            <ConsultarCidadaoCard />
            <EnviarMensagemCard />
        </Card>
    )
}