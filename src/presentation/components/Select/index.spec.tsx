/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SelectProps, Select } from "@/presentation/components/Select";
import { faker } from "@faker-js/faker";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

const selectName = faker.lorem.word();

const selectOptionsLength = 4;

const selectOptions = [
  { value: "", label: "" },
  ...faker.helpers.multiple(
    () => ({
      value: faker.lorem.word(),
      label: faker.lorem.sentence({ min: 1, max: 3 }),
    }),
    { count: selectOptionsLength - 1 },
  ),
];

type MakeSutArgs = {
  selectProps?: Partial<SelectProps>;
};

const makeSut = (args?: MakeSutArgs) => {
  const user = userEvent.setup();

  const { result } = renderHook(() => useForm());

  render(
    <FormProvider {...result.current}>
      <Select name={selectName} data-testid={selectName} {...args?.selectProps}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormProvider>,
  );

  return {
    sut: screen,
    user: user,
    useFormResult: result,
  };
};

describe("Select", () => {
  test("should update field state on change", async () => {
    const { sut, user, useFormResult } = makeSut();
    const lastSelectOption = selectOptions.at(selectOptionsLength - 1)!.value;

    const select = sut.getByTestId<HTMLSelectElement>(selectName);

    await user.selectOptions(select, lastSelectOption);

    const fieldStateValue = useFormResult.current.getValues(
      selectName,
    ) as string;

    expect(select.value).toBe(lastSelectOption);
    expect(fieldStateValue).toBe(lastSelectOption);
  });

  test("should have an empty string as component value when form value is null", async () => {
    const { sut, useFormResult } = makeSut();

    act(() => {
      useFormResult.current.setValue(selectName, null);
    });

    const select = await sut.findByTestId<HTMLSelectElement>(selectName);

    const fieldStateValue = useFormResult.current.getValues(selectName);
    const componentValue = select.value;

    await waitFor(() => {
      expect(fieldStateValue).toBeNull();
      expect(componentValue).toBe("");
    });
  });
});
