import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { mockAuthenticationArgs } from "@/domain/test/mockAuthenticationArgs";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = null as never;

const makeSut = () => {
  const sut = new FirebaseAuthentication(auth);
  return { sut };
};

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: vi.fn(),
  };
});

describe("FirebaseAuthentication", () => {
  test("should call firebase's signInWithEmailAndPassword with correct email and password", () => {
    const { sut } = makeSut();

    const authenticationArgs = mockAuthenticationArgs();

    sut.signIn(authenticationArgs);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      authenticationArgs.email,
      authenticationArgs.password,
    );
  });
});
