import {
  BaseInput,
  IBaseInputProps,
} from "@/presentation/components/BaseInput";
import clsx from "clsx";
import { Controller, FieldValues, Path } from "react-hook-form";

export type ISelectProps<TFieldValues extends FieldValues = FieldValues> =
  React.SelectHTMLAttributes<HTMLSelectElement> &
    Omit<
      IBaseInputProps<React.SelectHTMLAttributes<HTMLSelectElement>>,
      "Component"
    > & {
      name: Path<TFieldValues>;
    };

function SelectComponent(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} />;
}

export function Select(props: ISelectProps) {
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
            field.onChange(event);
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
