import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { ValidationError } from "@/domain/errors/validationError";
import { AddAccountArgs } from "@/domain/usecases";
import { CPF_LENGTH } from "@/presentation/constants/stringLength";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy<AddAccountArgs, void>();
  const sut = new RemoteAddAccount(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

const mockAddAccountArgs = (): AddAccountArgs => ({
  cpfCnpj: faker.string.numeric(CPF_LENGTH),
  email: faker.internet.email(),
  nome: faker.person.fullName(),
  senha: faker.string.alphanumeric(6),
  telefone: faker.string.numeric(10),
});

describe("RemoteAddAccount", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const addAccountArgs = mockAddAccountArgs();

    await sut.signIn(addAccountArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountArgs);
  });

  test("should throw ValidationError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: null as never,
      statusCode: HttpStatusCode.unprocessableEntity,
    };

    const promise = sut.signIn(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(new ValidationError());
  });
});
