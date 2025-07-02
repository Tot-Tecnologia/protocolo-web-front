import { useMutation } from "@tanstack/react-query";
import { PasswordRecovery, PasswordRecoveryArgs } from "@/domain/usecases";

type UsePasswordRecoveryMutationProps = {
  passwordRecovery: PasswordRecovery;
};

export function usePasswordRecoveryMutation({
  passwordRecovery,
}: UsePasswordRecoveryMutationProps) {
  const mutationFn = async (args: PasswordRecoveryArgs) => {
    await passwordRecovery.recover(args);
  };

  return useMutation({ mutationFn });
}
