import clsx from "clsx";
import { ISpinnerProps } from "@/presentation/components/Spinner/types/spinnerTypes";
import {
  colorVariants,
  sizeVariants,
} from "@/presentation/components/Spinner/style/spinnerVariants";

export function Spinner({ color = "primary", size = "medium" }: ISpinnerProps) {
  return (
    <div
      className={clsx(
        "rounded-50/10 m-0.5 animate-spin rounded-full border-3 border-gray-400 text-[0px]",
        colorVariants[color],
        sizeVariants[size],
      )}
    >
      Carregando
    </div>
  );
}
