import { SignIn } from "@/presentation/views/SignIn";
import { renderWithProviders } from "@/tests/helpers/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";

const makeSut = () => {
  renderWithProviders(<SignIn />);
  return { sut: screen };
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
});
