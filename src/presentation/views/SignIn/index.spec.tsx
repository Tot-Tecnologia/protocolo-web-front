import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import { AuthenticationSpy } from "@/tests/domain/mocks";
import { SignIn } from "@/presentation/views/SignIn";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { renderWithProviders } from "@/tests/helpers/renderWithProviders";
import userEvent, { UserEvent } from "@testing-library/user-event";

type SimulateValidSubmitSignInArgs = {
  sut: typeof screen;
  user: UserEvent;
};

let mockLocalStorage: Record<string, string> = {};

const makeSut = () => {
  const user = userEvent.setup();
  const authenticationSpy = new AuthenticationSpy();

  renderWithProviders(
    <SignIn
      authentication={authenticationSpy}
      uiNotification={makeUiNotification()}
    />,
  );

  return {
    sut: screen,
    user: user,
    authenticationSpy: authenticationSpy,
  };
};

const simulateValidSubmitSignIn = async ({
  sut,
  user,
}: SimulateValidSubmitSignInArgs) => {
  const emailValue = faker.internet.email();
  const passwordValue = faker.lorem.word();

  const emailInput = sut.getByPlaceholderText<HTMLInputElement>("E-mail");
  const passwordInput = sut.getByPlaceholderText<HTMLInputElement>("Senha");
  const submitButton = sut.getByRole("button", {
    name: "Acessar",
  });

  await user.type(emailInput, emailValue);
  await user.type(passwordInput, passwordValue);
  await user.click(submitButton);

  return { emailValue, passwordValue };
};

beforeAll(() => {
  vi.spyOn(global.Storage.prototype, "setItem").mockImplementation(
    (key, value) => {
      mockLocalStorage[key] = value;
    },
  );

  vi.spyOn(global.Storage.prototype, "getItem").mockImplementation(
    (key) => mockLocalStorage[key],
  );
});

beforeEach(() => {
  mockLocalStorage = {};
});

describe("SignIn", () => {
  test("should render e-mail and password initially empty", async () => {
    const { sut } = makeSut();

    const emailInput = sut.getByPlaceholderText<HTMLInputElement>("E-mail");
    const passwordInput = sut.getByPlaceholderText<HTMLInputElement>("Senha");

    await waitFor(() => {
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    });
  });

  test("should call Authentication with correct arguments on submit", async () => {
    const { sut, user, authenticationSpy } = makeSut();

    const { emailValue, passwordValue } = await simulateValidSubmitSignIn({
      sut,
      user,
    });

    await waitFor(() => {
      expect(authenticationSpy.args?.email).toBe(emailValue);
      expect(authenticationSpy.args?.password).toBe(passwordValue);
    });
  });

  test("should save accessToken locally on success", async () => {
    const { sut, user, authenticationSpy } = makeSut();

    await simulateValidSubmitSignIn({ sut, user });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
      "@ProtocoloWeb__Key=accessToken",
      JSON.stringify(authenticationSpy.accountModel.accessToken),
    );
  });
});
