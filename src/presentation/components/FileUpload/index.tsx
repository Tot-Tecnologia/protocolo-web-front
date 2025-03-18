import {
  BaseInput,
  IBaseInputProps,
} from "@/presentation/components/BaseInput";
import clsx from "clsx";

type IFileUploadProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  Omit<
    IBaseInputProps<React.InputHTMLAttributes<HTMLInputElement>>,
    "Component"
  >;

function FileUploadComponent(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <label className="flex w-full md:mt-2 md:cursor-pointer md:flex-col md:items-center md:justify-center md:gap-y-4 md:rounded-lg md:border md:border-dashed md:border-gray-300 md:bg-gray-50 md:py-15">
      <img
        src="/uploadIcon.svg"
        alt="Ícone de upload de arquivo"
        className="hidden size-16 rounded-full bg-gray-200 p-4 md:block"
      />
      <span className="hidden px-3 py-1 font-semibold md:block">
        Escolher arquivo
      </span>
      <input {...props} type="file" />
    </label>
  );
}

export function FileUpload(props: IFileUploadProps) {
  return (
    <BaseInput<React.InputHTMLAttributes<HTMLInputElement>>
      Component={FileUploadComponent}
      {...props}
      className={clsx(
        "w-full !text-sm file:rounded file:bg-gray-200 file:px-3 file:py-1",
        "md:hidden",
        props.className,
      )}
    />
  );
}
