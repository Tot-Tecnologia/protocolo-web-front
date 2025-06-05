import { ProtocoloStatus } from "@/data/constants/protocoloStatusEnum";
import { LoadProtocoloDetailsResponse, UiNotification } from "@/domain/usecases";
import { ChangeProtocolStatus } from "@/domain/usecases/changeProtocolStatus";
import { Button } from "@/presentation/components/Button";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useChangeProtocolStatusMutation } from "@/presentation/views/DetailsProtocoloServidor/common/hooks/useChangeProtocolStatusMutation";

type AproveRejectCardProps = {
    protocolo: LoadProtocoloDetailsResponse,
    uiNotification: UiNotification,
    changeProtocolStatus: ChangeProtocolStatus
}

export function AprovarRejeitarCard({
    changeProtocolStatus,
    protocolo,
    uiNotification
}: AproveRejectCardProps) {

    const [token] = useAccessToken();

    const changeProtocolStatusMutation = useChangeProtocolStatusMutation({
        changeProtocolStatus: changeProtocolStatus,
        token
    });

    const handlerChangeProtocolStatus = (status: ProtocoloStatus, callback: () => void) => {
        changeProtocolStatusMutation.mutate({
            id: protocolo.id,
            status
        }, {
            onSuccess: () => {
                callback();
            },
            onError: (error) => uiNotification.error(error.message),
        })
    }
    return <div className="flex justify-end">

        <Button className="mr-2 md:mt-0 w-50" onClick={
            () => handlerChangeProtocolStatus(ProtocoloStatus.APROVADO, () => {
                uiNotification.success("Protocolo aprovado")
            })}>
            Aprovar
        </Button>

        <Button className="w-50" variant="outlined" onClick={
            () => handlerChangeProtocolStatus(ProtocoloStatus.REJEITADO, () => {
                uiNotification.warning("Protocolo rejeitado")
            })}>
            Rejeitar
        </Button>
    </div>
}