import { Authentication, AuthenticationArgs } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";
import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";

type UseAuthenticationMutationProps = {
  authentication: Authentication;
  userDetail: LoadUserDetail;
};

export function useAuthenticationMutation({
  authentication,
  userDetail,
}: UseAuthenticationMutationProps) {
  const mutationFn = async (args: AuthenticationArgs) => {
    const accountModel = await authentication.signIn(args);
    const userModel = await userDetail.load(accountModel.accessToken);
    return {
      accessToken: accountModel.accessToken,
      userType: userModel.tipoUsuario,
    };
  };

  return useMutation({ mutationFn });
}
