type IInputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel(props: IInputLabelProps) {
  return (
    <>
      <label
        {...props}
        className={"text-sm leading-5" + " " + (props.className ?? "")}
      />
      <br />
    </>
  );
}
