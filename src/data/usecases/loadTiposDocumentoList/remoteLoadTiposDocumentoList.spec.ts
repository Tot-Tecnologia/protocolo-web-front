import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { mockProtocoloWebPaginationResponse } from "@/tests/domain/mocks/mockProtocoloWebResponse";
import { UnexpectedError } from "@/domain/errors";
import { TipoDocumentoModel } from "@/domain/models";
import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { RemoteLoadTiposDocumentoList } from "./remoteLoadTiposDocumentoList";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadTiposDocumentoList(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteLoadTiposDocumentoList", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    await sut.loadAll("");

    expect(httpClientSpy.url).toContain(url);
    expect(httpClientSpy.method).toBe("get");
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

    const promise = sut.loadAll("");

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should return a LoadTiposDocumentoListResponse if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const data = faker.helpers.multiple<TipoDocumentoModel>(() => ({
      id: faker.number.int(),
      nome: faker.person.fullName(),
    }));

    const responseBody = mockProtocoloWebPaginationResponse(data);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const promise = sut.loadAll("");

    await expect(promise).resolves.toEqual(responseBody);
  });
});
