import { useQuery } from "@tanstack/react-query";
import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";

type UseLoadUserDetailQueryProps = {
  loadUserDetail: LoadUserDetail;
  userEmail?: string | null | undefined;
  enabled?: boolean;
};

export function useLoadUserDetailQuery({
  loadUserDetail,
  enabled,
  userEmail,
}: UseLoadUserDetailQueryProps) {
  const queryFn = () => loadUserDetail.load();
  const queryKey = ["loadUserDetail", userEmail];

  return useQuery({ queryFn, queryKey, enabled });
}
