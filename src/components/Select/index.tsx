import { BaseInput, IBaseInputProps } from "@/components/BaseInput";
import clsx from "clsx";

type ISelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  Omit<IBaseInputProps, "Component">;

function SelectComponent(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} />;
}

export function Select(props: ISelectProps) {
  return (
    <BaseInput
      Component={SelectComponent}
      {...props}
      className={clsx(
        // setinha no fim do componente
        "appearance-none bg-[url(/arrowDownIcon.svg)] bg-[calc(100%_-_4_*_var(--spacing))_center] bg-no-repeat",
        // outras estilizações
        "cursor-pointer text-sm",
        props.className,
      )}
    />
  );
}
