import { LoadTiposDocumentoList } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

type UseTiposDocumentoListQueryProps = {
  loadTiposDocumentoList: LoadTiposDocumentoList;
};

export function useTiposDocumentoListQuery({
  loadTiposDocumentoList,
}: UseTiposDocumentoListQueryProps) {
  return useQuery({
    queryFn: () => loadTiposDocumentoList.loadAll(),
    queryKey: ["loadTipoDocumento"],
  });
}
