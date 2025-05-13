import { LoadProtocoloDetails } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseProtocoloDetailsQueryProps = {
  idProtocolo: number;
  loadProtocoloDetails: LoadProtocoloDetails;
  token: string;
};

export function useProtocoloDetailsQuery({
  idProtocolo,
  loadProtocoloDetails,
  token,
}: UseProtocoloDetailsQueryProps) {
  return useQuery({
    queryFn: () => loadProtocoloDetails.load({ id: idProtocolo }, token),
    queryKey: ["loadProtocoloDetails", idProtocolo],
  });
}
