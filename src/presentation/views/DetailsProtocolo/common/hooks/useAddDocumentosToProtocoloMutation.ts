import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddDocumentosToProtocolo,
  AddDocumentosToProtocoloArgs,
} from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";

type UseAddDocumentosToProtocoloMutationProps = {
  addDocumentosToProtocolo: AddDocumentosToProtocolo;
};

export function useAddDocumentosToProtocoloMutation({
  addDocumentosToProtocolo,
}: UseAddDocumentosToProtocoloMutationProps) {
  const [token] = useAccessToken();

  const queryClient = useQueryClient();

  const mutationFn = (args: AddDocumentosToProtocoloArgs) => {
    return addDocumentosToProtocolo.add(args, token);
  };

  return useMutation({
    mutationFn: mutationFn,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["loadProtocoloDetails"] }),
  });
}
