import { Authentication, AuthenticationArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type UseAuthenticationMutationProps = {
  authentication: Authentication;
};

export function useAuthenticationMutation({
  authentication,
}: UseAuthenticationMutationProps) {
  const mutationFn = (args: AuthenticationArgs) => authentication.signIn(args);
  return useMutation({ mutationFn });
}
