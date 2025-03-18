import { useId } from "react";
import { InputLabel } from "@/presentation/components/InputLabel";
import clsx from "clsx";

type IBaseInputComponentProps = {
  id?: string;
  className?: string;
};

export type IBaseInputProps<
  THTMLAttributes extends
    | React.SelectHTMLAttributes<HTMLSelectElement>
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  TComponentProps extends IBaseInputComponentProps = IBaseInputComponentProps,
> = THTMLAttributes & {
  Component: React.ComponentType<TComponentProps>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  containerClassName?: string;
};

export function BaseInput<
  THTMLAttributes extends
    | React.SelectHTMLAttributes<HTMLSelectElement>
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
>({
  Component,
  className,
  containerClassName,
  id,
  label,
  helperText,
  error,
  ...props
}: IBaseInputProps<THTMLAttributes>) {
  const isLabelVisible = label != null;
  const isHelperTextVisible = helperText != null;
  const generatedId = useId();
  const finalId = id ?? generatedId;

  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {isLabelVisible && (
        <InputLabel htmlFor={finalId} className="self-start">
          {label}
        </InputLabel>
      )}

      <Component
        id={finalId}
        className={clsx(
          "rounded-lg border bg-white px-3 py-1.5 -outline-offset-2 placeholder:text-sm focus:outline-2",
          isLabelVisible && "mt-2",
          error ? "text-error" : "text-gray-900",
          error ? "border-error" : "border-gray-300",
          error ? "focus:outline-error" : "focus:outline-primary",
          className,
        )}
        {...props}
      />

      {isHelperTextVisible && (
        <span
          className={clsx(
            "mt-1 text-sm leading-5",
            error ? "text-error" : "text-gray-500",
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
