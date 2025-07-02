import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import {
  mockedRouter,
  renderWithProviders,
} from "@/tests/helpers/renderWithProviders";
import { RecoverPassword } from "@/presentation/views/RecoverPassword";
import { PasswordRecoverySpy } from "@/tests/domain/mocks";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { RECOVER_PASSWORD_MESSAGE_ROUTE_URL } from "@/presentation/constants/routesUrl";

type SimulateValidSubmitSignInArgs = {
  sut: typeof screen;
  user: UserEvent;
};

const makeSut = () => {
  const user = userEvent.setup();

  const passwordRecoverySpy = new PasswordRecoverySpy();

  renderWithProviders(
    <RecoverPassword
      passwordRecovery={passwordRecoverySpy}
      uiNotification={makeUiNotification()}
    />,
  );

  return {
    sut: screen,
    user: user,
    passwordRecoverySpy: passwordRecoverySpy,
  };
};

const simulateValidSubmitPasswordRecovery = async ({
  sut,
  user,
}: SimulateValidSubmitSignInArgs) => {
  const emailValue = faker.internet.email();

  const emailInput = sut.getByPlaceholderText<HTMLInputElement>("E-mail");
  const submitButton = sut.getByRole("button", {
    name: "Confirmar",
  });

  await user.type(emailInput, emailValue);
  await user.click(submitButton);

  return { emailValue };
};

beforeAll(async () => {
  await mockedRouter.navigate({ to: "/" });
});

describe("RecoverPassword", () => {
  test("should render e-mail initially empty", async () => {
    const { sut } = makeSut();

    const emailInput = sut.getByPlaceholderText<HTMLInputElement>("E-mail");

    await waitFor(() => {
      expect(emailInput.value).toBe("");
    });
  });

  test("should call PasswordRecovery with correct arguments on submit", async () => {
    const { sut, user, passwordRecoverySpy } = makeSut();

    const { emailValue } = await simulateValidSubmitPasswordRecovery({
      sut,
      user,
    });

    await waitFor(() => {
      expect(passwordRecoverySpy.args?.email).toBe(emailValue);
    });
  });

  test("should redirect to correct page after submit", async () => {
    const { sut, user } = makeSut();

    await simulateValidSubmitPasswordRecovery({
      sut,
      user,
    });

    await waitFor(() => {
      expect(window.location.href).toContain(
        RECOVER_PASSWORD_MESSAGE_ROUTE_URL,
      );
    });
  });
});
