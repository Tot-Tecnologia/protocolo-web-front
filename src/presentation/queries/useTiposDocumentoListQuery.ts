import { LoadTiposDocumentoList } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseTiposDocumentoListQueryProps = {
  loadTiposDocumentoList: LoadTiposDocumentoList;
  token: string;
};

export function useTiposDocumentoListQuery({
  loadTiposDocumentoList,
  token,
}: UseTiposDocumentoListQueryProps) {
  return useQuery({
    queryFn: () => loadTiposDocumentoList.loadAll(token),
    queryKey: ["loadTipoDocumento"],
  });
}
