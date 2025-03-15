import { Authentication, AuthenticationArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type IUseAuthenticationMutationProps = {
  authentication: Authentication;
};

export function useAuthenticationMutation({
  authentication,
}: IUseAuthenticationMutationProps) {
  const mutationFn = (args: AuthenticationArgs) => authentication.signIn(args);
  return useMutation({ mutationFn });
}
