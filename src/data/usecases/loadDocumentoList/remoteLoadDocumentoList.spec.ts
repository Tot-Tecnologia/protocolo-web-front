import { faker } from "@faker-js/faker";
import { ILoadDocumentoListArgs } from "@/domain/usecases";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadDocumentoList } from "./remoteLoadDocumentoList";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadDocumentoList(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteLoadDocumentoList", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const loadDocumentoListArgs: ILoadDocumentoListArgs = {
      ano: faker.number.int(),
      numeroDocumento: faker.number.int(),
      tipoSolicitacao: faker.number.int(),
    };

    await sut.loadWithFilter(loadDocumentoListArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.body).toBe(loadDocumentoListArgs);
  });
});
