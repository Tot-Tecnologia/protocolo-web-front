import { AddProtocolo, AddProtocoloArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type UseAddProtocoloMutationProps = {
  addProtocolo: AddProtocolo;
};

export function useAddProtocoloMutation({
  addProtocolo,
}: UseAddProtocoloMutationProps) {
  const mutationFn = (args: AddProtocoloArgs) => {
    return addProtocolo.save(args);
  };

  return useMutation({ mutationFn });
}
