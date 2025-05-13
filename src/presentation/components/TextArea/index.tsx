import { BaseInput, BaseInputProps } from "@/presentation/components/BaseInput";
import { Controller, FieldValues, Path } from "react-hook-form";

export type TextAreaProps<TFieldValues extends FieldValues = FieldValues> =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    Omit<
      BaseInputProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>,
      "Component"
    > & {
      name: Path<TFieldValues>;
    };

function TextAreaComponent(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} />;
}

export function TextArea<TFieldValues extends FieldValues = FieldValues>(
  props: TextAreaProps<TFieldValues>,
) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState }) => (
        <BaseInput<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
          Component={TextAreaComponent}
          {...props}
          {...field}
          value={(field.value as never) ?? ""}
          helperText={fieldState.error?.message ?? props.helperText}
          error={!!fieldState.error || props.error}
          onChange={(event) => {
            if (props.onChange) {
              props.onChange(event);
            }
            field.onChange(event);
          }}
        />
      )}
    />
  );
}
