import {
  BaseInput,
  IBaseInputProps,
} from "@/presentation/components/BaseInput";

type ITextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<
    IBaseInputProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>,
    "Component"
  >;

function TextAreaComponent(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} />;
}

export function TextArea(props: ITextAreaProps) {
  return (
    <BaseInput<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
      Component={TextAreaComponent}
      {...props}
    />
  );
}
