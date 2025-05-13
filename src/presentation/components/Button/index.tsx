import {
  borderVariants,
  colorVariants,
  fontSizeVariants,
  paddingVariants,
} from "@/presentation/components/Button/styles/buttonVariants";
import { ButtonProps } from "@/presentation/components/Button/types/buttonTypes";
import { Spinner } from "@/presentation/components/Spinner";
import clsx from "clsx";

export function Button({
  children,
  loading,
  disabled,
  variant = "contained",
  size = "medium",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      {...props}
      className={clsx(
        "flex h-fit cursor-pointer items-center justify-center rounded-md font-bold uppercase",
        "disabled:cursor-default",
        fontSizeVariants[size],
        paddingVariants[size],
        colorVariants[variant],
        borderVariants[variant],
        props.className,
      )}
    >
      {!loading ? (
        children
      ) : (
        <Spinner size={size === "small" ? "small" : "medium"} />
      )}
    </button>
  );
}
