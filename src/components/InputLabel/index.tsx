import clsx from "clsx";

type IInputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel(props: IInputLabelProps) {
  return (
    <>
      <label
        {...props}
        className={clsx("text-sm leading-5", props.className)}
      />
    </>
  );
}
