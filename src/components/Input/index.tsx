import { BaseInput, IBaseInputProps } from "@/components/BaseInput";

type IInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<IBaseInputProps, "Component">;

function InputComponent(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

export function Input(props: IInputProps) {
  return <BaseInput Component={InputComponent} {...props} />;
}
