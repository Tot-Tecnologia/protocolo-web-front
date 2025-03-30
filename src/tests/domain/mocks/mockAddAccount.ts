import { faker } from "@faker-js/faker";
import { AddAccountArgs } from "@/domain/usecases";

export const mockAddAccountArgs = (): AddAccountArgs => ({
  cpfCnpj: faker.string.numeric(),
  email: faker.internet.email(),
  nome: faker.person.fullName(),
  senha: faker.string.alphanumeric(),
  telefone: faker.string.numeric(),
});
