import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { mockAuthenticationArgs } from "@/domain/test/mockAuthentication";
import { DeepPartial } from "@/types/utils";
import { faker } from "@faker-js/faker";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

const auth = null as never;
const accessToken = faker.string.uuid();

const { mockedSignInWithEmailAndPassword } = vi.hoisted(() => {
  const mockedSignInWithEmailAndPassword = vi.fn(
    (): DeepPartial<UserCredential> => ({
      user: {
        getIdToken: () => Promise.resolve(accessToken),
      },
    }),
  );

  return { mockedSignInWithEmailAndPassword };
});

const makeSut = () => {
  const sut = new FirebaseAuthentication(auth);
  return { sut };
};

const simulateFirebaseError = async (errorCode: string) => {
  const { sut } = makeSut();

  mockedSignInWithEmailAndPassword.mockRejectedValueOnce(
    new FirebaseError(errorCode, ""),
  );

  const promise = sut.signIn(mockAuthenticationArgs());

  return promise;
};

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: mockedSignInWithEmailAndPassword,
  };
});

describe("FirebaseAuthentication", () => {
  test("should call firebase's signInWithEmailAndPassword with correct email and password", async () => {
    const { sut } = makeSut();

    const authenticationArgs = mockAuthenticationArgs();

    await sut.signIn(authenticationArgs);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      authenticationArgs.email,
      authenticationArgs.password,
    );
  });

  test("should return correct status code and accessToken on success", async () => {
    const { sut } = makeSut();

    const response = await sut.signIn(mockAuthenticationArgs());

    expect(response.accessToken).toBe(accessToken);
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/invalid-credential", async () => {
    const promise = simulateFirebaseError("auth/invalid-credential");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/invalid-email", async () => {
    const promise = simulateFirebaseError("auth/invalid-email");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/missing-email", async () => {
    const promise = simulateFirebaseError("auth/missing-email");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/missing-password", async () => {
    const promise = simulateFirebaseError("auth/missing-password");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw UnexpectedError when some error was not handled by the code", async () => {
    const { sut } = makeSut();

    mockedSignInWithEmailAndPassword.mockRejectedValueOnce(
      new Error(faker.lorem.sentence()),
    );

    const promise = sut.signIn(mockAuthenticationArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
