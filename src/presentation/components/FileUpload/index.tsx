import { BaseInput, BaseInputProps } from "@/presentation/components/BaseInput";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { useState } from "react";

type FileUploadProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  Omit<
    BaseInputProps<React.InputHTMLAttributes<HTMLInputElement>>,
    "Component"
  >;

function FileUploadComponent({
  name,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { setValue } = useFormContext();
  const [files, setFiles] = useState<File[]>([]); // State to store uploaded files

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setValue(name!, selectedFiles); // Setting value in form
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
    setValue(name!, updatedFiles); // Update form value
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

export function FileUpload(props: FileUploadProps) {
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
