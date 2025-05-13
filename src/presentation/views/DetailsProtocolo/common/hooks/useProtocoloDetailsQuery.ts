import { LoadProtocoloDetails } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseProtocoloDetailsQueryProps = {
  numeroProtocolo: string;
  loadProtocoloDetails: LoadProtocoloDetails;
  token: string;
};

export function useProtocoloDetailsQuery({
  numeroProtocolo,
  loadProtocoloDetails,
  token,
}: UseProtocoloDetailsQueryProps) {
  return useQuery({
    queryFn: () =>
      loadProtocoloDetails.load({ numeroProtocolo: numeroProtocolo }, token),
    queryKey: ["loadProtocoloDetails", numeroProtocolo],
  });
}
