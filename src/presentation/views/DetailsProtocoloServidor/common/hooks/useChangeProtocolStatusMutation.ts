import type {
  ChangeProtocolStatus,
  ChangeProtocolStatusArgs,
} from "@/domain/usecases/changeProtocolStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseChangeProtocolStatusMutationProps = {
  changeProtocolStatus: ChangeProtocolStatus;
  token: string;
};

export function useChangeProtocolStatusMutation({
  changeProtocolStatus,
  token,
}: UseChangeProtocolStatusMutationProps) {
  const queryClient = useQueryClient();

  const mutationFn = (args: ChangeProtocolStatusArgs) =>
    changeProtocolStatus.change(args, token);

  return useMutation({
    mutationFn,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["loadProtocoloDetails"] }),
  });
}
