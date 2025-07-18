import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "../../../tests/data/mocks/mockHttpClient";
import { HttpStatusCode } from "../../protocols/http/httpClient";
import { RemoteChangeProtocolStatus } from "./remoteChangeProtocolStatus";
import { ProtocoloStatus } from "../../constants/protocoloStatusEnum";
import { ProtocoloWebErrorResponse } from "../../../domain/models";
import { ValidationError } from "../../../domain/errors";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();

  httpClientSpy.response = {
    body: {} as never,
    statusCode: HttpStatusCode.ok,
  };

  const sut = new RemoteChangeProtocolStatus(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteChangeProtocolStatus", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const changeProtocolStatusArgs = {
      id: faker.number.int(),
      status: ProtocoloStatus.APROVADO,
    };

    await sut.change(changeProtocolStatusArgs, "");

    const { id, ...args } = changeProtocolStatusArgs;

    expect(httpClientSpy.url).toBe(`${url}${id}`);
    expect(httpClientSpy.method).toBe("patch");
    expect(httpClientSpy.body).toEqual(args);
  });

  test("should throw ValidationError if HttpClient returns 404 with message", async () => {
    const { sut, httpClientSpy } = makeSut();

    const errorResponse: ProtocoloWebErrorResponse = {
      statusCode: 404,
      dateTime: faker.date.anytime().toISOString(),
      errors: [
        {
          field: "exception",
          message: "Protocolo não encontrado",
        },
      ],
    };

    httpClientSpy.response = {
      body: errorResponse,
      statusCode: HttpStatusCode.notFound,
    };

    const changeProtocolStatusArgs = {
      id: faker.number.int(),
      status: ProtocoloStatus.APROVADO,
    };

    const promise = sut.change(changeProtocolStatusArgs, "");

    await expect(promise).rejects.toThrowError(
      new ValidationError({ messages: errorResponse.errors }),
    );
  });
});
