import { NavBar } from "@/components/NavBar";
import { CREATE_SOLICITATION_ROUTE_URL } from "@/constants/routesUrl";
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
  test("should be able to navigate to CreateSolicitation view", async () => {
    const { sut, user } = makeSut();

    const link = sut.getByTestId(`NavLink-to-${CREATE_SOLICITATION_ROUTE_URL}`);
    await user.click(link);

    await waitFor(() => {
      expect(window.location.href).toContain(CREATE_SOLICITATION_ROUTE_URL);
    });
  });
});
