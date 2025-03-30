import { notificationService } from "@/presentation/services/notificationService";
import { renderWithProviders } from "@/tests/helpers/renderWithProviders";
import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";

type IMakeSutArgs = {
  serviceFn: () => void;
};

const makeSut = ({ serviceFn }: IMakeSutArgs) => {
  function Component() {
    useEffect(() => serviceFn(), []);
    return null;
  }

  renderWithProviders(<Component />);

  return { sut: screen };
};

describe("NotificationService", () => {
  test("should display correct info message", async () => {
    const messageText = faker.lorem.words();

    const { sut } = makeSut({
      serviceFn: () => notificationService.info(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });

  test("should display correct error message", async () => {
    const messageText = faker.lorem.words();

    const { sut } = makeSut({
      serviceFn: () => notificationService.error(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });

  test("should display correct success message", async () => {
    const messageText = faker.lorem.words();

    const { sut } = makeSut({
      serviceFn: () => notificationService.success(messageText),
    });

    const alert = await sut.findByRole("alert");

    await waitFor(() => {
      expect(alert.innerHTML).toContain(messageText);
    });
  });
});
