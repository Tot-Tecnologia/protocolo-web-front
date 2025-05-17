import clsx from "clsx";
import { FieldValues, Path, useFormContext, useWatch } from "react-hook-form";
import { BaseInput, BaseInputProps } from "@/presentation/components/BaseInput";

type FileUploadProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  Omit<
    BaseInputProps<React.InputHTMLAttributes<HTMLInputElement>>,
    "Component"
  > & {
    name: Path<TFieldValues>;
  };

function FileUploadComponent<TFieldValues extends FieldValues = FieldValues>({
  name,
  ...props
}: FileUploadProps<TFieldValues>) {
  const { setValue } = useFormContext();
  const files = useWatch<TFieldValues, typeof name>({ name: name }) as File[];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const newFiles = [...files, ...selectedFiles];
    setValue(name, newFiles as never);
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setValue(name, updatedFiles as never);
  };

  return (
    <div>
      <label className="flex w-full md:mt-2 md:cursor-pointer md:flex-col md:items-center md:justify-center md:gap-y-4 md:rounded-lg md:border md:border-dashed md:border-gray-300 md:bg-gray-50 md:py-15">
        <img
          src="/uploadIcon.svg"
          alt="Ícone de upload de arquivo"
          className="hidden size-16 rounded-full bg-gray-200 p-4 md:block"
        />
        <span className="hidden px-3 py-1 font-semibold md:block">
          Escolher arquivo
        </span>

        <input
          {...props}
          name={name}
          type="file"
          multiple
          accept="*/*"
          onChange={handleFileChange}
        />
      </label>

      {/* Display selected files */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4>Arquivos selecionados:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex justify-between">
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleFileRemove(index)}
                  className="text-red-600"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function FileUpload<TFieldValues extends FieldValues = FieldValues>(
  props: FileUploadProps<TFieldValues>,
) {
  return (
    <BaseInput<React.InputHTMLAttributes<HTMLInputElement>>
      Component={FileUploadComponent as never}
      {...props}
      className={clsx(
        "w-full !text-sm file:rounded file:bg-gray-200 file:px-3 file:py-1",
        "md:hidden",
        props.className,
      )}
    />
  );
}
