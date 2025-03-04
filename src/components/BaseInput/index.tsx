import { useId } from "react";
import { InputLabel } from "@/components/InputLabel";
import clsx from "clsx";

type IBaseInputComponentProps = {
  id?: string;
  className?: string;
};

export type IBaseInputProps<
  TComponentProps extends IBaseInputComponentProps = IBaseInputComponentProps,
> = {
  Component: React.ComponentType<TComponentProps>;
  label?: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
};

export function BaseInput({
  Component,
  className,
  containerClassName,
  id,
  label,
  ...props
}: IBaseInputProps) {
  const isLabelVisible = label != null;
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
          "focus:border-primary focus:outline-primary rounded-lg border-1 border-gray-300 bg-white px-3 py-1.5 text-gray-900 -outline-offset-2 placeholder:text-sm focus:outline-2",
          isLabelVisible && "mt-2",
          className,
        )}
        {...props}
      />
    </div>
  );
}
