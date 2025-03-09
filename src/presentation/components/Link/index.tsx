import { Link as RouterLink, LinkComponentProps } from "@tanstack/react-router";

export function Link(props: LinkComponentProps) {
  return (
    <RouterLink
      {...props}
      className={"text-primary underline" + " " + (props.className ?? "")}
    />
  );
}
