import { LoadProtocoloDetails } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type IUseProtocoloDetailsQueryProps = {
  idProtocolo: number;
  loadProtocoloDetails: LoadProtocoloDetails;
  token: string;
};

export function useProtocoloDetailsQuery({
  idProtocolo,
  loadProtocoloDetails,
  token,
}: IUseProtocoloDetailsQueryProps) {
  return useQuery({
    queryFn: () => loadProtocoloDetails.load({ id: idProtocolo }, token),
    queryKey: ["loadProtocoloDetails", idProtocolo],
  });
}
