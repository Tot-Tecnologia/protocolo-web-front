type IVariant = "contained" | "outlined" | "text";

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IVariant;
};

function getBackgroundColor(variant: IVariant) {
  return variant === "contained" ? " bg-primary-dark " : " ";
}

function getColor(variant: IVariant) {
  return variant === "contained" ? " text-white " : " text-primary-dark ";
}

function getBorder(variant: IVariant) {
  return variant !== "text"
    ? " border-1 border-primary-dark "
    : " border-1 border-transparent ";
}

export function Button({ variant = "contained", ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className={
        "rounded-md px-5 py-3 font-bold uppercase" +
        getBackgroundColor(variant) +
        getColor(variant) +
        getBorder(variant) +
        " " +
        (props.className ?? "")
      }
    />
  );
}
