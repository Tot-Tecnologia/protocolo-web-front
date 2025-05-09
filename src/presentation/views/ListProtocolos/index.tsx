import { PageContainer } from "@/presentation/components/PageContainer";
import { ListProtocolosFilter } from "./common/components/ListProtocolosFilter";
import { ListProtocolosTable } from "./common/components/ListProtocolosTable";
import { LoadProtocoloList } from "@/domain/usecases";

type IListProtocolosProps = {
  loadProtocoloList: LoadProtocoloList;
};

export function ListProtocolos({ loadProtocoloList }: IListProtocolosProps) {
  return (
    <PageContainer title="Consultar Solicitação">
      <div className="grid gap-y-10">
        <ListProtocolosFilter />
        <ListProtocolosTable loadProtocoloList={loadProtocoloList} />
      </div>
    </PageContainer>
  );
}
