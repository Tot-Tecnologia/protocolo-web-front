import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddDocumentosToProtocolo,
  AddDocumentosToProtocoloArgs,
} from "@/domain/usecases";

type UseAddDocumentosToProtocoloMutationProps = {
  addDocumentosToProtocolo: AddDocumentosToProtocolo;
};

export function useAddDocumentosToProtocoloMutation({
  addDocumentosToProtocolo,
}: UseAddDocumentosToProtocoloMutationProps) {
  const queryClient = useQueryClient();

  const mutationFn = (args: AddDocumentosToProtocoloArgs) => {
    return addDocumentosToProtocolo.add(args);
  };

  return useMutation({
    mutationFn: mutationFn,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["loadProtocoloDetails"] }),
  });
}
