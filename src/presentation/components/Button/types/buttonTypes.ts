export type Variant = "contained" | "outlined" | "text";

export type Size = "small" | "medium" | "large";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
  loading?: boolean;
};
