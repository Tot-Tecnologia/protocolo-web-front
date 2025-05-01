import { ISelectProps, Select } from "@/presentation/components/Select";
import { faker } from "@faker-js/faker";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

const selectName = faker.lorem.word();

const selectOptionsLength = 3;

const selectOptions = faker.helpers.multiple(
  () => ({
    value: faker.lorem.word(),
    label: faker.lorem.sentence({ min: 1, max: 3 }),
  }),
  { count: selectOptionsLength },
);

type IMakeSutArgs = {
  selectProps?: Partial<ISelectProps>;
};

const makeSut = (args?: IMakeSutArgs) => {
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
});
