type IInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: IInputProps) {
  return (
    <input
      {...props}
      className={
        "focus:border-primary-dark focus:outline-primary-dark rounded-md border-1 border-gray-300 px-3 py-1.5 text-gray-900 -outline-offset-2 focus:outline-2" +
        " " +
        (props.className ?? "")
      }
    />
  );
}
