import { AddProtocolo, AddProtocoloArgs } from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useMutation } from "@tanstack/react-query";

type IUseAddProtocoloMutationProps = {
  addProtocolo: AddProtocolo;
};

export function useAddProtocoloMutation({
  addProtocolo,
}: IUseAddProtocoloMutationProps) {
  const [token] = useAccessToken();
  const mutationFn = (args: AddProtocoloArgs) => addProtocolo.save(args, token);
  return useMutation({ mutationFn });
}
