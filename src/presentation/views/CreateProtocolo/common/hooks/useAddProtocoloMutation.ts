import { AddProtocolo, AddProtocoloArgs } from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useMutation } from "@tanstack/react-query";

type UseAddProtocoloMutationProps = {
  addProtocolo: AddProtocolo;
};

export function useAddProtocoloMutation({
  addProtocolo,
}: UseAddProtocoloMutationProps) {
  const [token] = useAccessToken();

  const mutationFn = (args: AddProtocoloArgs) => {
    return addProtocolo.save(args, token);
  };

  return useMutation({ mutationFn });
}
