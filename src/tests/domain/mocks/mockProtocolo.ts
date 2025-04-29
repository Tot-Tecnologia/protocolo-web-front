import { faker } from "@faker-js/faker";
import { ILoadProtocoloListArgs } from "@/domain/usecases";
import { IProtocoloModel } from "@/domain/models";

export const mockLoadProtocoloListArgs = (): ILoadProtocoloListArgs => ({
  pagina: faker.number.int(),
  itemsPorPagina: faker.number.int(),
  cpfCnpj: faker.string.uuid(),
  ano: faker.number.int(),
  numeroProtocolo: faker.number.int(),
  tipoSolicitacao: faker.number.int(),
});

export const mockProtocoloModel = (): IProtocoloModel => ({
  dataSolicitacao: faker.date.anytime(),
  numero: faker.number.int(),
  status: faker.helpers.arrayElement([
    "aberto",
    "emAnalise",
    "aprovado",
    "rejeitado",
  ]),
  tipoSolicitacao: faker.lorem.sentence(),
});
