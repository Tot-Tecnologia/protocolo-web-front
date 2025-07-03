import { useMutation } from "@tanstack/react-query";
import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";

type UseLoadUserDetailMutationProps = {
  userDetail: LoadUserDetail;
};

export function useLoadUserDetailMutation({
  userDetail,
}: UseLoadUserDetailMutationProps) {
  const mutationFn = () => userDetail.load();

  return useMutation({ mutationFn });
}
