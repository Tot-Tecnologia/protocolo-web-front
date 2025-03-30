import { AuthenticationSpy } from "@/tests/domain/mocks/mockAuthentication";
import { SignIn } from "@/presentation/views/SignIn";
import { renderWithProviders } from "@/tests/helpers/renderWithProviders";
import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const makeSut = () => {
  const user = userEvent.setup();
  const authenticationSpy = new AuthenticationSpy();

  renderWithProviders(<SignIn authentication={authenticationSpy} />);

  return {
    sut: screen,
    user: user,
    authenticationSpy: authenticationSpy,
  };
};

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

    await waitFor(() => {
      expect(authenticationSpy.args?.email).toBe(emailValue);
      expect(authenticationSpy.args?.password).toBe(passwordValue);
    });
  });
});
