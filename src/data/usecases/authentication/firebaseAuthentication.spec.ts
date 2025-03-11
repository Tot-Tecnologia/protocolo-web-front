import { HttpStatusCode } from "@/data/protocols/http/httpResponse";
import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { mockAuthenticationArgs } from "@/domain/test/mockAuthenticationArgs";
import { DeepPartial } from "@/types/utils";
import { faker } from "@faker-js/faker";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

const auth = null as never;
const accessToken = faker.string.uuid();

const makeSut = () => {
  const sut = new FirebaseAuthentication(auth);
  return { sut };
};

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: vi.fn(
      (): DeepPartial<UserCredential> => ({
        user: {
          getIdToken: () => Promise.resolve(accessToken),
        },
      }),
    ),
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

    expect(response.statusCode).toBe(HttpStatusCode.ok);
    expect(response.body.accessToken).toBe(accessToken);
  });
});
