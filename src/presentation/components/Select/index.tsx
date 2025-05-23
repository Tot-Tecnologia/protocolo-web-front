import { BaseInput, BaseInputProps } from "@/presentation/components/BaseInput";
import clsx from "clsx";
import { Controller, FieldValues, Path } from "react-hook-form";

export type SelectProps<TFieldValues extends FieldValues = FieldValues> =
  React.SelectHTMLAttributes<HTMLSelectElement> &
    Omit<
      BaseInputProps<React.SelectHTMLAttributes<HTMLSelectElement>>,
      "Component"
    > & {
      name: Path<TFieldValues>;
      valueAsNumber?: boolean;
    };

function SelectComponent(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} />;
}

export function Select<TFieldValues extends FieldValues = FieldValues>(
  props: SelectProps<TFieldValues>,
) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState }) => (
        <BaseInput<React.SelectHTMLAttributes<HTMLSelectElement>>
          Component={SelectComponent}
          {...props}
          {...field}
          value={(field.value as never) ?? ""}
          helperText={fieldState.error?.message ?? props.helperText}
          error={!!fieldState.error || props.error}
          onChange={(event) => {
            if (props.onChange) {
              props.onChange(event);
            }
            if (props.valueAsNumber) {
              const value = event.target.value;
              field.onChange(value?.length ? Number(value) : null);
            } else {
              field.onChange(event);
            }
          }}
          className={clsx(
            // setinha no fim do componente
            "appearance-none bg-[url(/arrowDownIcon.svg)] bg-[calc(100%_-_4_*_var(--spacing))_center] bg-no-repeat",
            // outras estilizações
            "text-sm leading-6",
            props.disabled ? "cursor-default" : "cursor-pointer",
            props.className,
          )}
        />
      )}
    />
  );
}
