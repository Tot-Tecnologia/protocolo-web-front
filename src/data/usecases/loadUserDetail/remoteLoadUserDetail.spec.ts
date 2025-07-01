import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadUserDetail } from "./remoteLoadUserDetail";
import { HttpStatusCode } from "../../protocols/http/httpClient";
import { UnauthorizedError } from "@/domain/errors";
import { UserDetailModel, UserType } from "@/domain/models";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadUserDetail(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

const token = () => {
  return faker.internet.jwt();
};

describe("RemoteLoadUserDetail", () => {
  test("should call HttpClient correctly", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    await sut.load(token());

    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.url).toContain(url);
  });

  test("should throw UnexpectedError if HttpClient return a status other than 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const statusCode = faker.helpers.arrayElement([
      HttpStatusCode.badRequest,
      HttpStatusCode.serverError,
      HttpStatusCode.unprocessableEntity,
    ]);

    httpClientSpy.response = {
      statusCode: statusCode,
      body: null,
    };

    const promise = sut.load(token());

    await expect(promise).rejects.toThrowError(new UnauthorizedError());
  });

  test("should return a UserDetailModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const data: UserDetailModel = {
      documento: faker.string.numeric(),
      nome: faker.person.fullName(),
      tipoUsuario: UserType.CIDADAO,
    };

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: data,
    };

    const promise = sut.load(token());

    await expect(promise).resolves.toEqual(data);
  });
});
