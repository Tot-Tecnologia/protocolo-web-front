import { Controller, FieldValues, Path } from "react-hook-form";
import {
  BaseInput,
  IBaseInputProps,
} from "@/presentation/components/BaseInput";

export type IInputProps<TFieldValues extends FieldValues = FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
    Omit<
      IBaseInputProps<React.InputHTMLAttributes<HTMLInputElement>>,
      "Component"
    > & {
      name: Path<TFieldValues>;
    };

function InputComponent(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

export function Input<TFieldValues extends FieldValues = FieldValues>(
  props: IInputProps<TFieldValues>,
) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState }) => (
        <BaseInput<React.InputHTMLAttributes<HTMLInputElement>>
          Component={InputComponent}
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
        />
      )}
    />
  );
}
