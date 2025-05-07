import { faker } from "@faker-js/faker";
import { AddProtocoloArgs } from "@/domain/usecases";
import { estadosBR } from "@/data/constants/estadosBR";

export const mockAddProtocoloArgs = (): AddProtocoloArgs => ({
  cpfCnpj: faker.string.numeric(),
  telefone: faker.string.numeric({ length: { min: 10, max: 11 } }),
  nomeSolicitante: faker.person.fullName(),
  endereco: faker.lorem.sentence(),
  logradouro: faker.lorem.word({ length: { min: 3, max: 20 } }),
  numero: faker.string.alphanumeric({ length: 1 }),
  bairro: faker.lorem.word({ length: { min: 3, max: 20 } }),
  cep: faker.string.numeric({ length: 8 }),
  cidade: faker.lorem.words({ min: 1, max: 4 }),
  email: faker.internet.email(),
  complemento: faker.lorem.words({ min: 1, max: 3 }),
  descricao: faker.lorem.paragraph(),
  tipoDocumento: faker.number.int(),
  arquivos: [], // TODO
  estado: faker.helpers.arrayElement(estadosBR),
});
