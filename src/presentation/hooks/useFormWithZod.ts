import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { ZodType } from "zod";

type IUseFormWithZodProps<TFieldValues extends FieldValues = FieldValues> =
  UseFormProps<TFieldValues> & {
    schema: ZodType<TFieldValues>;
  };

export function useFormWithZod<TFieldValues extends FieldValues = FieldValues>({
  schema,
  ...props
}: IUseFormWithZodProps<TFieldValues>) {
  return useForm({
    resolver: zodResolver(schema),
    ...props,
  });
}
