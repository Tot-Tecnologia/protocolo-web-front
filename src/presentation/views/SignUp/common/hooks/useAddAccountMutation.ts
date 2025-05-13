import { AddAccount, AddAccountArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type UseAddAccountMutationProps = {
  addAccount: AddAccount;
};

export function useAddAccountMutation({
  addAccount,
}: UseAddAccountMutationProps) {
  const mutationFn = (args: AddAccountArgs) => addAccount.signUp(args);
  return useMutation({ mutationFn });
}
