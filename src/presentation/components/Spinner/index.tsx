import clsx from "clsx";

type ISpinnerProps = {
  color?: string;
  size?: string;
};

export function Spinner({
  color = "primary-light",
  size = "5",
}: ISpinnerProps) {
  return (
    <div
      className={clsx(
        "rounded-50/10 m-0.5 animate-spin rounded-full border-3 border-gray-400 text-[0px]",
        `border-t-${color}`,
        `size-${size}`,
      )}
    >
      Carregando
    </div>
  );
}
