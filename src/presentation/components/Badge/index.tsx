import { ThemeColor } from "@/types/utils";
import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  color?: ThemeColor;
};

const colorVariants: Record<ThemeColor, string> = {
  error: "text-error-dark bg-rose-100",
  info: "text-info-dark bg-indigo-50",
  primary: "text-primary bg-indigo-50",
  secondary: "text-secondary bg-stone-300",
  success: "text-success-dark bg-emerald-100",
  warning: "text-warning-dark bg-amber-100",
};

export function Badge({ color = "info", children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-2 py-0.5",
        colorVariants[color],
      )}
    >
      <p className="text-sm whitespace-nowrap">{children}</p>
    </span>
  );
}
