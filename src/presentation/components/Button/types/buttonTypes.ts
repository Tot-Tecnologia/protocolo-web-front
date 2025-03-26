export type IVariant = "contained" | "outlined" | "text";

export type ISize = "small" | "medium" | "large";

export type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ISize;
  variant?: IVariant;
  loading?: boolean;
};
