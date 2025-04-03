import { ToastifyNotification } from "@/presentation/services/toastifyNotification";
import { renderWithProviders } from "@/tests/helpers/renderWithProviders";
import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";

type IMakeSutArgs = {
  serviceFn: () => void;
};

const makeSut = ({ serviceFn }: IMakeSutArgs) => {
  const toastifyNotification = new ToastifyNotification();

  function Component() {
    useEffect(() => serviceFn(), []);
    return null;
  }

  renderWithProviders(<Component />);

  return {
    sut: screen,
    toastifyNotification: toastifyNotification,
  };
};

describe("ToastifyNotification", () => {
  test("should display correct info message", async () => {
    const messageText = faker.lorem.words();

    const { sut, toastifyNotification } = makeSut({
      serviceFn: () => toastifyNotification.info(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });

  test("should display correct error message", async () => {
    const messageText = faker.lorem.words();

    const { sut, toastifyNotification } = makeSut({
      serviceFn: () => toastifyNotification.error(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });

  test("should display correct success message", async () => {
    const messageText = faker.lorem.words();

    const { sut, toastifyNotification } = makeSut({
      serviceFn: () => toastifyNotification.success(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });
});
