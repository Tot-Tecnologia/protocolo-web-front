import { faker } from "@faker-js/faker";
import { ILoadProtocoloListArgs } from "@/domain/usecases";

export const mockLoadProtocoloListArgs = (): ILoadProtocoloListArgs => ({
  pagina: faker.number.int(),
  itemsPorPagina: faker.number.int(),
  cpfCnpj: faker.string.uuid(),
  ano: faker.number.int(),
  numeroProtocolo: faker.number.int(),
  tipoSolicitacao: faker.number.int(),
});
