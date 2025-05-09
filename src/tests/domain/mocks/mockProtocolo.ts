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
  id: faker.number.int({ min: 1, max: 1000 }),
  numeroProtocolo: faker.string.numeric(8),
  tipoDocumento: faker.number.int({ min: 1, max: 5 }),
  numero: faker.number.int({ min: 1, max: 9999 }),
  tipoSolicitacao: faker.lorem.words(2),
  dataSolicitacao: faker.date.anytime().toISOString(),
  status: faker.helpers.arrayElement(["aberto", "emAnalise", "aprovado", "rejeitado"]),
  orgaoResponsavel: faker.company.name(),
  observacao: faker.lorem.sentence(),
});