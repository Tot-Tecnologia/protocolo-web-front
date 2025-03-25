import { Spinner } from "@/presentation/components/Spinner";
import clsx from "clsx";

type IVariant = "contained" | "outlined" | "text";

type ISize = "small" | "medium" | "large";

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ISize;
  variant?: IVariant;
  loading?: boolean;
};

export function Button({
  children,
  loading,
  disabled,
  variant = "contained",
  size = "medium",
  ...props
}: IButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      {...props}
      className={clsx(
        "flex cursor-pointer items-center justify-center rounded-md font-bold uppercase",
        // font-size
        size === "small" && "text-sm",
        // padding
        size === "small" && "px-2 py-1",
        size === "medium" && "px-3 py-2",
        size === "large" && "px-4 py-3",
        // background-color
        variant === "contained" && "bg-primary",
        // color
        variant === "contained" ? "text-white" : "text-primary",
        // border
        variant !== "text"
          ? "border-primary border-1"
          : "border-1 border-transparent",
        props.className,
      )}
    >
      {!loading ? children : <Spinner />}
    </button>
  );
}
