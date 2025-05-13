import {
  Size,
  Variant,
} from "@/presentation/components/Button/types/buttonTypes";

export const fontSizeVariants: Record<Size, string> = {
  small: "text-sm",
  medium: "text-md",
  large: "text-md",
};

export const paddingVariants: Record<Size, string> = {
  small: "px-2 py-1",
  medium: "px-3 py-2",
  large: "px-4 py-3",
};

export const colorVariants: Record<Variant, string> = {
  contained:
    "text-white bg-primary hover:not-disabled:bg-primary-dark disabled:bg-neutral-200 disabled:text-stone-400",
  outlined:
    "text-primary hover:not-disabled:bg-gray-200 disabled:text-stone-400",
  text: "text-primary hover:not-disabled:bg-gray-200 disabled:text-stone-400",
};

export const borderVariants: Record<Variant, string> = {
  contained: "border-primary border-1 disabled:border-gray-200",
  outlined: "border-primary border-1 disabled:border-gray-200",
  text: "border-1 border-transparent disabled:border-transparent",
};
