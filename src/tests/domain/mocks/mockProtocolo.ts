import { faker } from "@faker-js/faker";
import { estadosBR } from "@/data/constants/estadosBR";
import { IProtocoloModel } from "@/domain/models";
import {
  LoadProtocoloListArgs,
  LoadProtocoloDetailsArgs,
  LoadProtocoloDetailsResponse,
} from "@/domain/usecases";
import { ProtocoloStatus } from "@/data/constants/protocoloStatusEnum";

export const mockLoadProtocoloListArgs = (): LoadProtocoloListArgs => ({
  paginaAtual: faker.number.int(),
  itensPagina: faker.number.int(),
  cpfCnpj: faker.string.uuid(),
  ano: faker.number.int(),
  numeroProtocolo: faker.lorem.word(),
  tipoDocumento: faker.number.int(),
});

export const mockLoadProtocoloDetailsArgs = (): LoadProtocoloDetailsArgs => ({
  numeroProtocolo: faker.lorem.word(),
});

export const mockLoadProtocoloDetailsResponse =
  (): LoadProtocoloDetailsResponse => ({
    id: faker.number.int(),
    bairro: faker.lorem.words(),
    cep: faker.string.numeric({ allowLeadingZeros: true, length: 8 }),
    cidade: faker.person.fullName(),
    complemento: faker.lorem.word(),
    cpfCnpj: faker.string.numeric({ allowLeadingZeros: true, length: 11 }),
    documentos: [
      {
        id: faker.number.int(),
        nome: faker.lorem.words(),
        dataCriacao: faker.date.anytime().toISOString(),
      },
    ],
    descricao: faker.lorem.paragraph(),
    email: faker.internet.email(),
    estado: faker.helpers.arrayElement(estadosBR),
    logradouro: faker.lorem.word(),
    nomeSolicitante: faker.person.fullName(),
    numero: faker.string.alphanumeric(),
    telefone: faker.string.numeric({ length: 11 }),
    tipoDocumentoId: faker.number.int(),
    tipoDocumentoTexto: faker.person.fullName(),
    status: faker.helpers.arrayElement(Object.values(ProtocoloStatus)),
    numeroProtocolo: faker.lorem.word(),
  });

export const mockProtocoloModel = (): IProtocoloModel => ({
  id: faker.number.int(),
  dataSolicitacao: faker.date.anytime().toISOString(),
  numero: faker.number.int(),
  numeroProtocolo: faker.lorem.word(),
  orgaoResponsavel: faker.lorem.word({ length: { min: 1, max: 5 } }),
  status: faker.helpers.arrayElement([
    "aberto",
    "emAnalise",
    "aprovado",
    "rejeitado",
  ]),
  tipoDocumento: faker.number.int(),
  tipoSolicitacao: faker.lorem.word(),
  observacao: faker.lorem.paragraph(),
});
