import clsx from "clsx";

type IInputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel(props: IInputLabelProps) {
  return (
    <>
      <label
        {...props}
        className={clsx(
          "w-full overflow-hidden text-sm leading-5 overflow-ellipsis whitespace-nowrap",
          props.className,
        )}
      />
    </>
  );
}
