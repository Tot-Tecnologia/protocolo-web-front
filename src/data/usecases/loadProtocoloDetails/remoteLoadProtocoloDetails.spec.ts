import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { RemoteLoadProtocoloDetails } from "./remoteLoadProtocoloDetails";
import {
  mockLoadProtocoloDetailsArgs,
  mockLoadProtocoloDetailsResponse,
} from "@/tests/domain/mocks";
import { UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadProtocoloDetails(url, httpClientSpy);

  return { sut, url, httpClientSpy };
};

describe("RemoteLoadProtocoloDetails", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const loadProtocoloDetailsArgs = mockLoadProtocoloDetailsArgs();

    await sut.load(loadProtocoloDetailsArgs, "");

    expect(httpClientSpy.url).toBe(
      `${url}/${loadProtocoloDetailsArgs.numeroProtocolo}`,
    );
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

    const promise = sut.load(mockLoadProtocoloDetailsArgs(), "");

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should return a LoadProtocoloDetailsResponse if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();

    const responseBody = mockLoadProtocoloDetailsResponse();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const promise = sut.load(mockLoadProtocoloDetailsArgs(), "");

    await expect(promise).resolves.toEqual(responseBody);
  });
});
