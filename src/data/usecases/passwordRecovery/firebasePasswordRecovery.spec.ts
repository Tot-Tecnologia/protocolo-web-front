import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { faker } from "@faker-js/faker";
import { FirebasePasswordRecovery } from "@/data/usecases/passwordRecovery/firebasePasswordRecovery";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { mockPasswordRecoveryArgs } from "@/tests/domain/mocks";

const auth = null as never;

const { mockedSendPasswordResetEmail } = vi.hoisted(() => {
  const mockedSendPasswordResetEmail = vi.fn();

  return { mockedSendPasswordResetEmail };
});

const makeSut = () => {
  const sut = new FirebasePasswordRecovery(auth);
  return { sut };
};

const simulateFirebaseError = async (errorCode: string) => {
  const { sut } = makeSut();

  mockedSendPasswordResetEmail.mockRejectedValueOnce(
    new FirebaseError(errorCode, ""),
  );

  const promise = sut.recover(mockPasswordRecoveryArgs());

  return promise;
};

vi.mock("firebase/auth", () => {
  return {
    sendPasswordResetEmail: mockedSendPasswordResetEmail,
  };
});

describe("FirebaseAuthentication", () => {
  test("should call firebase's sendPasswordResetEmail with correct email", async () => {
    const { sut } = makeSut();

    const passwordRecoveryArgs = mockPasswordRecoveryArgs();

    await sut.recover(passwordRecoveryArgs);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      passwordRecoveryArgs.email,
    );
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/invalid-email", async () => {
    const promise = simulateFirebaseError("auth/invalid-email");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw InvalidCredentialsError on FireBaseError code auth/missing-email", async () => {
    const promise = simulateFirebaseError("auth/missing-email");

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError());
  });

  test("should throw UnexpectedError when some error was not handled by the code", async () => {
    const { sut } = makeSut();

    mockedSendPasswordResetEmail.mockRejectedValueOnce(
      new Error(faker.lorem.sentence()),
    );

    const promise = sut.recover(mockPasswordRecoveryArgs());

    await expect(promise).rejects.toThrowError(new UnexpectedError());
  });
});
