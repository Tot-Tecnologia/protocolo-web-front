import { AddAccount, AddAccountArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type IUseAddAccountMutationProps = {
  addAccount: AddAccount;
};

export function useAddAccountMutation({
  addAccount,
}: IUseAddAccountMutationProps) {
  const mutationFn = (args: AddAccountArgs) => addAccount.signUp(args);
  return useMutation({ mutationFn });
}
