import { useId } from "react";
import { InputLabel } from "@/components/InputLabel";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export function Input(props: IInputProps) {
  const isLabelVisible = props.label != null;

  const generatedId = useId();

  const id = props.id ?? generatedId;

  return (
    <>
      {isLabelVisible && <InputLabel htmlFor={id}>{props.label}</InputLabel>}

      <input
        {...props}
        id={id}
        className={
          "focus:border-primary focus:outline-primary rounded-md border-1 border-gray-300 px-3 py-1.5 text-gray-900 -outline-offset-2 focus:outline-2" +
          (isLabelVisible ? " mt-2" : "") +
          " " +
          (props.className ?? "")
        }
      />
    </>
  );
}
