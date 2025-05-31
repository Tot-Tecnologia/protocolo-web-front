import { PageContainer } from "@/presentation/components/PageContainer";
import { ListUsuariosFilter } from "@/presentation/views/ListUsuarios/components/ListUsuariosFilter";
import { ListUsuariosTable } from "@/presentation/views/ListUsuarios/components/ListUsuariosTable";

export function ListUsuarios({ }) {

    return <>
        <PageContainer title="Usuários">
            <div className="grid gap-y-10">
                <ListUsuariosFilter />
                <ListUsuariosTable />
            </div>
        </PageContainer>
    </>

}