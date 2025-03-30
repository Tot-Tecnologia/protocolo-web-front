import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { AddAccountArgs } from "@/domain/usecases";
import { CPF_LENGTH } from "@/presentation/constants/stringLength";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { faker } from "@faker-js/faker";

describe("RemoteAddAccount", () => {
  test("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const httpClientSpy = new HttpClientSpy<AddAccountArgs, void>();

    const addAccountArgs: AddAccountArgs = {
      cpfCnpj: faker.string.numeric(CPF_LENGTH),
      email: faker.internet.email(),
      nome: faker.person.fullName(),
      senha: faker.string.alphanumeric(6),
      telefone: faker.string.numeric(10),
    };

    const sut = new RemoteAddAccount(url, httpClientSpy);

    await sut.signIn(addAccountArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountArgs);
  });
});
