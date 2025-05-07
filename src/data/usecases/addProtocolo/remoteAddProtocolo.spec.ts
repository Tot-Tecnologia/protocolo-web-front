import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { RemoteAddProtocolo } from "@/data/usecases/addProtocolo/remoteAddProtocolo";
import { UnexpectedError, ValidationError } from "@/domain/errors";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { mockAddProtocoloArgs } from "@/tests/domain/mocks";
import { mockProtocoloWebDefaultResponse } from "@/tests/domain/mocks/mockProtocoloWebResponse";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();

  httpClientSpy.response = {
    body: {} as never,
    statusCode: HttpStatusCode.created,
  };

  const sut = new RemoteAddProtocolo(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteAddProtocolo", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const addProtocoloArgs = mockAddProtocoloArgs();

    await sut.save(addProtocoloArgs, "");

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addProtocoloArgs);
  });

  test("should throw ValidationError if HttpClient returns 400 with message", async () => {
    const { sut, httpClientSpy } = makeSut();

    const errorResponse = mockProtocoloWebDefaultResponse(
      HttpStatusCode.badRequest,
    );

    httpClientSpy.response = {
      body: errorResponse,
      statusCode: errorResponse.codigo,
    };

    const promise = sut.save(mockAddProtocoloArgs(), "");

    await expect(promise).rejects.toThrowError(
      new ValidationError({ message: errorResponse.mensagem }),
    );
  });

  test("should throw UnexpectedError if HttpClient returns 400 without message", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: {} as never,
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.save(mockAddProtocoloArgs(), "");

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: {} as never,
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.save(mockAddProtocoloArgs(), "");

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
