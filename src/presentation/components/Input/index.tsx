import {
  BaseInput,
  IBaseInputProps,
} from "@/presentation/components/BaseInput";
import { Controller } from "react-hook-form";

type IInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<IBaseInputProps, "Component"> & {
    name: string;
  };

function InputComponent(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

export function Input(props: IInputProps) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState }) => (
        <BaseInput
          Component={InputComponent}
          {...props}
          {...field}
          value={(field.value as never) ?? ""}
          helperText={fieldState.error?.message ?? props.helperText}
          error={!!fieldState.error || props.error}
        />
      )}
    ></Controller>
  );
}
