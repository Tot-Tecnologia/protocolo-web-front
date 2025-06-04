import type { LoadProtocoloDetailsResponse } from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";

type AproveRejectCardProps = {
    protocolo: LoadProtocoloDetailsResponse
}

export function AprovarRejeitarCard({ }: AproveRejectCardProps) {
    return <div className="flex justify-end">

        <Button className="mr-2 md:mt-0 w-50" type="submit">
            Aprovar
        </Button>

        <Button className="w-50" variant="outlined" onClick={() => { }}>
            Rejeitar
        </Button>
    </div>
}