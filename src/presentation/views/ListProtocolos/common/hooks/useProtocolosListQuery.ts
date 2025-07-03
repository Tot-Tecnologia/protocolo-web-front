import { LoadProtocoloListArgs, LoadProtocoloList } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseProtocolosListQueryProps = {
  loadProtocoloList: LoadProtocoloList;
  args: LoadProtocoloListArgs;
};

export function useProtocolosListQuery({
  loadProtocoloList,
  args,
}: UseProtocolosListQueryProps) {
  return useQuery({
    queryFn: () => loadProtocoloList.loadWithFilter(args),
    queryKey: ["loadProtocoloList", args],
  });
}
