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
      render={({ field }) => (
        <BaseInput
          Component={InputComponent}
          {...props}
          {...field}
          value={props.value ?? (field.value as never) ?? ""}
        />
      )}
    ></Controller>
  );
}
