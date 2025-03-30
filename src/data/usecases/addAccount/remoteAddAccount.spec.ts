import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebErrorResponse } from "@/domain/models/protocoloWebModel";
import { AddAccountArgs } from "@/domain/usecases";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { mockAddAccountArgs } from "@/tests/domain/mocks/mockAddAccount";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy<
    AddAccountArgs,
    void | ProtocoloWebErrorResponse
  >();
  const sut = new RemoteAddAccount(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteAddAccount", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const addAccountArgs = mockAddAccountArgs();

    await sut.signUp(addAccountArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountArgs);
  });

  test("should throw ValidationError if HttpClient returns 422", async () => {
    const { sut, httpClientSpy } = makeSut();

    const errorResponse: ProtocoloWebErrorResponse = {
      error: faker.lorem.sentence(),
      message: [faker.lorem.sentence(), faker.lorem.sentence()],
      statusCode: HttpStatusCode.unprocessableEntity,
    };

    httpClientSpy.response = {
      body: errorResponse,
      statusCode: errorResponse.statusCode,
    };

    const promise = sut.signUp(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(
      new ValidationError({ errors: errorResponse.message as string[] }),
    );
  });

  test("should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: null as never,
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.signUp(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: null as never,
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.signUp(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
