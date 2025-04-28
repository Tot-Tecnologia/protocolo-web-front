import { faker } from "@faker-js/faker";
import { ILoadProtocoloListArgs } from "@/domain/usecases";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadProtocoloList } from "./remoteLoadProtocoloList";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadProtocoloList(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteLoadProtocoloList", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const loadProtocoloListArgs: ILoadProtocoloListArgs = {
      ano: faker.number.int(),
      numeroProtocolo: faker.number.int(),
      tipoSolicitacao: faker.number.int(),
    };

    await sut.loadWithFilter(loadProtocoloListArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
    expect(httpClientSpy.body).toBe(loadProtocoloListArgs);
  });
});
