import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadProtocoloList } from "./remoteLoadProtocoloList";
import {
  mockLoadProtocoloListArgs,
  mockProtocoloModel,
} from "@/tests/domain/mocks/mockProtocolo";
import { UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { ILoadProtocoloListResponse } from "@/domain/usecases";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadProtocoloList(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteLoadProtocoloList", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const loadProtocoloListArgs = mockLoadProtocoloListArgs();

    await sut.loadWithFilter(loadProtocoloListArgs);

    expect(httpClientSpy.url).toContain(url);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.pagina);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.itemsPorPagina);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.cpfCnpj);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.ano);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.numeroProtocolo);
    expect(httpClientSpy.url).toContain(loadProtocoloListArgs.tipoSolicitacao);
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

    const promise = sut.loadWithFilter(mockLoadProtocoloListArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should return a LoadProtocoloListResponse if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const data = faker.helpers.multiple(mockProtocoloModel);

    const responseBody: ILoadProtocoloListResponse = {
      totalPages: faker.number.int(),
      data: data,
    };

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const promise = sut.loadWithFilter(mockLoadProtocoloListArgs());

    await expect(promise).resolves.toEqual(responseBody);
  });
});
