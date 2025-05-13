/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { FormProvider, useForm } from "react-hook-form";
import { InputProps, Input } from "@/presentation/components/Input";
import "@testing-library/jest-dom";

const inputName = faker.lorem.word();

type MakeSutArgs = {
  inputProps?: Partial<InputProps>;
};

const makeSut = (args?: MakeSutArgs) => {
  const user = userEvent.setup();

  const { result } = renderHook(() => useForm());

  render(
    <FormProvider {...result.current}>
      <Input name={inputName} data-testid={inputName} {...args?.inputProps} />
    </FormProvider>,
  );

  return {
    sut: screen,
    user: user,
    useFormResult: result,
  };
};

describe("Input", () => {
  test("should render initially empty", () => {
    const { sut } = makeSut();

    const input = sut.getByTestId<HTMLInputElement>(inputName);

    expect(input.value).toBe("");
  });

  test("should update field state on change", async () => {
    const { sut, user, useFormResult } = makeSut();
    const typedValue = faker.lorem.word();

    const input = sut.getByTestId<HTMLInputElement>(inputName);
    await user.type(input, typedValue);
    const fieldStateValue = useFormResult.current.getValues(inputName);

    expect(input.value).toBe(typedValue);
    expect(fieldStateValue).toBe(typedValue);
  });

  test("should render helperText when its prop is valued", () => {
    const helperTextValue = faker.lorem.word();

    const { sut } = makeSut({ inputProps: { helperText: helperTextValue } });

    const helperTextElement = sut.getByText(helperTextValue);

    expect(helperTextElement).toBeInTheDocument();
  });
});
