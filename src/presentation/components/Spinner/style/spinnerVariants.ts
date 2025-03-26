import { ISize } from "@/presentation/components/Spinner/types/spinnerTypes";
import { ThemeColor } from "@/types/utils";

export const colorVariants: Record<ThemeColor, string> = {
  error: "border-t-error-light",
  info: "border-t-info-light",
  primary: "border-t-primary-light",
  secondary: "border-t-secondary-light",
  success: "border-t-success-light",
  warning: "border-t-warning-light",
};

export const sizeVariants: Record<ISize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
};
