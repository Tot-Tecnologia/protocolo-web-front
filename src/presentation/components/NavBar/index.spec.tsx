import "@testing-library/jest-dom";
import { NavBar } from "@/presentation/components/NavBar";
import { CREATE_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import {
  mockedRouter,
  renderWithProviders,
} from "@/tests/helpers/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const makeSut = () => {
  const user = userEvent.setup();
  renderWithProviders(<NavBar />);
  return { sut: screen, user };
};

beforeAll(async () => {
  await mockedRouter.navigate({ to: "/" });
});

describe("NavBar", () => {
  test("should be able to navigate to CreateProtocolo view", async () => {
    const { sut, user } = makeSut();

    const link = sut.getByTestId(`NavLink-to-${CREATE_PROTOCOLO_ROUTE_URL}`);
    await user.click(link);

    await waitFor(() => {
      expect(window.location.href).toContain(CREATE_PROTOCOLO_ROUTE_URL);
    });
  });
});
