import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadProtocoloList } from "./remoteLoadProtocoloList";
import { mockLoadProtocoloListArgs } from "@/tests/domain/mocks/mockLoadProtocoloList";
import { UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http/httpClient";

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
});
