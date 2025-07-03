import { Authentication, AuthenticationArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

type UseAuthenticationMutationProps = {
  authentication: Authentication;
};

export function useAuthenticationMutation({
  authentication,
}: UseAuthenticationMutationProps) {
  const mutationFn = async (args: AuthenticationArgs) => {
    const accountModel = await authentication.signIn(args);

    return {
      accessToken: accountModel.accessToken,
    };
  };

  return useMutation({ mutationFn });
}
