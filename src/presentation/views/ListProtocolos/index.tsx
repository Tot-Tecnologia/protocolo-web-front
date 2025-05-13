import { PageContainer } from "@/presentation/components/PageContainer";
import { ListProtocolosFilter } from "./common/components/ListProtocolosFilter";
import { ListProtocolosTable } from "./common/components/ListProtocolosTable";
import { LoadProtocoloList, LoadTiposDocumentoList } from "@/domain/usecases";

type ListProtocolosProps = {
  loadProtocoloList: LoadProtocoloList;
  loadTiposDocumentoList: LoadTiposDocumentoList;
};

export function ListProtocolos({
  loadProtocoloList,
  loadTiposDocumentoList,
}: ListProtocolosProps) {
  return (
    <PageContainer title="Consultar Solicitação">
      <div className="grid gap-y-10">
        <ListProtocolosFilter loadTiposDocumentoList={loadTiposDocumentoList} />
        <ListProtocolosTable
          loadProtocoloList={loadProtocoloList}
          loadTiposDocumentoList={loadTiposDocumentoList}
        />
      </div>
    </PageContainer>
  );
}
