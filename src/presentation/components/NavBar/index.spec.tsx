import "@testing-library/jest-dom";
import { NavBar } from "@/presentation/components/NavBar";
import { CREATE_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import {
  mockedRouter,
  renderWithProviders,
} from "@/tests/helpers/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { UserType } from "@/domain/models";

const makeSut = () => {
  const user = userEvent.setup();
  return { sut: screen, user };
};

beforeAll(async () => {
  await mockedRouter.navigate({ to: "/" });
});

describe("NavBar", () => {
  test("should be able to navigate to AddProtocolo view", async () => {

    const { sut, user } = makeSut();

    renderWithProviders(<NavBar userType={UserType.CIDADAO} />);

    const link = sut.getByTestId(`NavLink-to-${CREATE_PROTOCOLO_ROUTE_URL}`);
    await user.click(link);

    await waitFor(() => {
      expect(window.location.href).toContain(CREATE_PROTOCOLO_ROUTE_URL);
    });
  });

  test("should NOT render option to create protocol when user is SERVIDOR", async () => {

    renderWithProviders(<NavBar userType={UserType.SERVIDOR} />);

    const link = screen.queryByTestId(`NavLink-to-${CREATE_PROTOCOLO_ROUTE_URL}`);

    expect(link).not.toBeInTheDocument();

  });
});
