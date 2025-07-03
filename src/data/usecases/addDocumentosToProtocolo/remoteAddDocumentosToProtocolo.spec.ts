import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAddDocumentosToProtocolo } from "@/data/usecases/addDocumentosToProtocolo/remoteAddDocumentosToProtocolo";
import { UnexpectedError, ValidationError } from "@/domain/errors";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { mockAddDocumentosToProtocoloArgs } from "@/tests/domain/mocks";
import { mockProtocoloWebErrorResponse } from "@/tests/domain/mocks/mockProtocoloWebResponse";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();

  httpClientSpy.response = {
    body: {} as never,
    statusCode: HttpStatusCode.ok,
  };

  const sut = new RemoteAddDocumentosToProtocolo(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteAddDocumentosToProtocolo", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const addDocumentosToProtocoloArgs = mockAddDocumentosToProtocoloArgs();
    const { idProtocolo, ...args } = addDocumentosToProtocoloArgs;

    await sut.add(addDocumentosToProtocoloArgs);

    expect(httpClientSpy.url).toBe(`${url}/${idProtocolo}`);
    expect(httpClientSpy.method).toBe("patch");
    expect(httpClientSpy.body).toEqual(args);
  });

  test("should throw ValidationError if HttpClient returns 400 with message", async () => {
    const { sut, httpClientSpy } = makeSut();

    const errorResponse = mockProtocoloWebErrorResponse(
      HttpStatusCode.badRequest,
    );

    httpClientSpy.response = {
      body: errorResponse,
      statusCode: errorResponse.statusCode,
    };

    const promise = sut.add(mockAddDocumentosToProtocoloArgs());

    await expect(promise).rejects.toThrowError(
      new ValidationError({ messages: errorResponse.errors }),
    );
  });

  test("should throw UnexpectedError if HttpClient returns 400 without message", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: {} as never,
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.add(mockAddDocumentosToProtocoloArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: {} as never,
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.add(mockAddDocumentosToProtocoloArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
