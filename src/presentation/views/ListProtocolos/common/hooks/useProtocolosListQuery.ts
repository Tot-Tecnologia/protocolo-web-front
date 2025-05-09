import { ILoadProtocoloListArgs, LoadProtocoloList } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type IUseProtocolosListQueryProps = {
  loadProtocoloList: LoadProtocoloList;
  args: ILoadProtocoloListArgs;
  token: string;
};

export function useProtocolosListQuery({
  loadProtocoloList,
  args,
  token,
}: IUseProtocolosListQueryProps) {
  return useQuery({
    queryFn: () => loadProtocoloList.loadWithFilter(args, token),
    queryKey: ["loadProtocoloList", args],
  });
}
