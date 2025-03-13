import { Input } from "@/presentation/components/Input";
import { faker } from "@faker-js/faker";
import { render, renderHook, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

const inputName = faker.lorem.word();

const makeSut = () => {
  const { result } = renderHook(() => useForm());

  render(
    <FormProvider {...result.current}>
      <Input name={inputName} data-testid={inputName} />
    </FormProvider>,
  );

  return { sut: screen };
};

describe("Input", () => {
  test("should render initially empty", () => {
    const { sut } = makeSut();

    const input = sut.getByTestId<HTMLInputElement>(inputName);

    expect(input.value).toBe("");
  });
});
