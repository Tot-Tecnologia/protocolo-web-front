import { LoadProtocoloDetails } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseProtocoloDetailsQueryProps = {
  numeroProtocolo: string;
  loadProtocoloDetails: LoadProtocoloDetails;
};

export function useProtocoloDetailsQuery({
  numeroProtocolo,
  loadProtocoloDetails,
}: UseProtocoloDetailsQueryProps) {
  return useQuery({
    queryFn: () =>
      loadProtocoloDetails.load({ numeroProtocolo: numeroProtocolo }),
    queryKey: ["loadProtocoloDetails", numeroProtocolo],
  });
}
