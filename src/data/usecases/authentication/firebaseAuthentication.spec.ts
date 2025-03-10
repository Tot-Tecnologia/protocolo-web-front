import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { faker } from "@faker-js/faker";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: vi.fn(),
  };
});

describe("FirebaseAuthentication", () => {
  test("should call signInWithEmailAndPassword with correct email and password", () => {
    const auth = null as never;
    const sut = new FirebaseAuthentication(auth);
    const email = faker.internet.email();
    const password = faker.internet.password();

    sut.signIn({ email, password });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      email,
      password,
    );
  });
});
