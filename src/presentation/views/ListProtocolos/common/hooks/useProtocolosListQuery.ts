import { LoadProtocoloListArgs, LoadProtocoloList } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseProtocolosListQueryProps = {
  loadProtocoloList: LoadProtocoloList;
  args: LoadProtocoloListArgs;
  token: string;
};

export function useProtocolosListQuery({
  loadProtocoloList,
  args,
  token,
}: UseProtocolosListQueryProps) {
  return useQuery({
    queryFn: () => loadProtocoloList.loadWithFilter(args, token),
    queryKey: ["loadProtocoloList", args],
  });
}
