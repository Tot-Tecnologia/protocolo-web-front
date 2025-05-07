import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { UnexpectedError, ValidationError } from "@/domain/errors";
import { ProtocoloWebDefaultResponse } from "@/domain/models";
import { HttpClientSpy } from "@/tests/data/mocks/mockHttpClient";
import { mockAddAccountArgs } from "@/tests/domain/mocks";
import { DeepPartial } from "@/types/utils";
import { faker } from "@faker-js/faker";
import { UserCredential } from "firebase/auth";

const { mockedSignInWithEmailAndPassword, mockedSendEmailVerification } =
  vi.hoisted(() => {
    const mockedSignInWithEmailAndPassword = vi.fn(
      (): DeepPartial<UserCredential> => ({
        user: {
          getIdToken: () => Promise.resolve(faker.string.uuid()),
          emailVerified: true,
        },
      }),
    );

    const mockedSendEmailVerification = vi.fn();

    return { mockedSignInWithEmailAndPassword, mockedSendEmailVerification };
  });

const mockProtocoloWebErrorResponse = (
  statusCode: HttpStatusCode,
): ProtocoloWebDefaultResponse => ({
  codigo: statusCode,
  mensagem: faker.lorem.sentence(),
  dataHora: faker.date.anytime().toISOString(),
  status: faker.lorem.word(),
});

const makeSut = () => {
  const url = faker.internet.url();
  const httpClientSpy = new HttpClientSpy();
  const auth = null as never;

  httpClientSpy.response = {
    body: {} as never,
    statusCode: HttpStatusCode.created,
  };

  const sut = new RemoteAddAccount(url, httpClientSpy, auth);

  return { sut, url, httpClientSpy };
};

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: mockedSignInWithEmailAndPassword,
    sendEmailVerification: mockedSendEmailVerification,
  };
});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("RemoteAddAccount", () => {
  test("should call HttpClient with correct values", async () => {
    const { sut, url, httpClientSpy } = makeSut();

    const addAccountArgs = mockAddAccountArgs();

    await sut.signUp(addAccountArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountArgs);
  });

  test("should send email verification from firebase on success", async () => {
    const { sut } = makeSut();

    await sut.signUp(mockAddAccountArgs());

    expect(mockedSignInWithEmailAndPassword).toHaveBeenCalledOnce();
  });

  test("should throw ValidationError if HttpClient returns 400 with message", async () => {
    const { sut, httpClientSpy } = makeSut();

    const errorResponse = mockProtocoloWebErrorResponse(
      HttpStatusCode.badRequest,
    );

    httpClientSpy.response = {
      body: errorResponse,
      statusCode: errorResponse.codigo,
    };

    const promise = sut.signUp(mockAddAccountArgs());

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

    const promise = sut.signUp(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      body: {} as never,
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.signUp(mockAddAccountArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
