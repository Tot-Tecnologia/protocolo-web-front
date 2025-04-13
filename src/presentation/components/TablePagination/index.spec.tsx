import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TablePagination } from "@/presentation/components/TablePagination";
import "@testing-library/jest-dom";

type MakeSutArgs = {
  total?: number;
};

const TOTAL = faker.number.int({ min: 1, max: 100 });

const makeSut = ({ total = TOTAL }: MakeSutArgs = {}) => {
  const user = userEvent.setup();

  render(<TablePagination total={total} />);

  return {
    sut: screen,
    user: user,
  };
};

describe("TablePagination", () => {
  test("should render previous and next buttons", () => {
    const { sut } = makeSut();

    const prevButton = sut.getByLabelText("Página anterior");
    const nextButton = sut.getByLabelText("Próxima página");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test("should render first and last page buttons", () => {
    const total = faker.number.int({ min: 1, max: 100 });
    const innerHTMLofFirstClickableButton = "2";
    const { sut } = makeSut({ total });

    const pageButtons = sut.getAllByRole("button", { name: /Ir para página/i });
    const firstPageNumber = pageButtons.at(0)?.innerHTML;
    const lastPageNumber = pageButtons.at(pageButtons.length - 1)?.innerHTML;

    expect(firstPageNumber).toBe(innerHTMLofFirstClickableButton);
    expect(lastPageNumber).toBe(total.toString());
  });

  test("should highlight the current page", () => {
    const { sut } = makeSut();

    const currentPageButton = sut.getByRole("button", { current: "page" });

    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toBeDisabled();
  });

  test("should change to the next page when next button is clicked", async () => {
    const { sut, user } = makeSut();

    const nextButton = sut.getByLabelText("Próxima página");
    const currentPageButtonBeforeClickNext = sut.getByRole("button", {
      current: "page",
    });
    const pageNumberBeforeClickNext = Number(
      currentPageButtonBeforeClickNext.innerHTML,
    );

    await user.click(nextButton);

    const currentPageButtonAfterClickNext = await sut.findByRole("button", {
      current: "page",
    });
    const pageNumberAfterClickNext = Number(
      currentPageButtonAfterClickNext.innerHTML,
    );

    expect(pageNumberAfterClickNext).toEqual(pageNumberBeforeClickNext + 1);
  });

  test("should change to the previous page when previous button is clicked", async () => {
    const { sut, user } = makeSut();

    const nextButton = sut.getByLabelText("Próxima página");
    const prevButton = sut.getByLabelText("Página anterior");

    // Avança uma página antes de tentar voltar
    await user.click(nextButton);
    const currentPageButtonAfterClickNext = await sut.findByRole("button", {
      current: "page",
    });
    const pageNumberBeforeClickPrevious = Number(
      currentPageButtonAfterClickNext.innerHTML,
    );

    await user.click(prevButton);
    const currentPageButtonAfterClickPrevious = await sut.findByRole("button", {
      current: "page",
    });
    const pageNumberAfterClickPrevious = Number(
      currentPageButtonAfterClickPrevious,
    );

    expect(pageNumberAfterClickPrevious).not.toEqual(
      pageNumberBeforeClickPrevious - 1,
    );
  });

  test("should update current page when a page number is clicked", async () => {
    const { sut, user } = makeSut();

    const pageButtons = sut.getAllByRole("button", { name: /Ir para página/i });

    const targetPageButton = pageButtons[1]; // por exemplo, segunda página
    await user.click(targetPageButton);

    const currentPageButtonAfterClick = await sut.findByRole("button", {
      current: "page",
    });

    expect(currentPageButtonAfterClick).toHaveTextContent(
      targetPageButton.textContent || "",
    );
  });

  test("should not change page when when previous button is clicked at first page", async () => {
    const { sut, user } = makeSut();

    const prevButton = sut.getByLabelText("Página anterior");

    await user.click(prevButton);

    const currentPageButtonAfterClickPrevious = await sut.findByRole("button", {
      current: "page",
    });

    expect(currentPageButtonAfterClickPrevious).toHaveTextContent("1");
  });

  test("should not change page when when next button is clicked at last page", async () => {
    const { sut, user } = makeSut();

    const nextButton = sut.getByLabelText("Próxima página");
    const lastPageButton = sut.getByLabelText("Ir para página " + TOTAL);

    // Vai para a última página antes de clicar on botão next
    await user.click(lastPageButton);
    await user.click(nextButton);

    const currentPageButtonAfterClickNext = await sut.findByRole("button", {
      current: "page",
    });

    expect(currentPageButtonAfterClickNext).toHaveTextContent(TOTAL.toString());
  });
});
