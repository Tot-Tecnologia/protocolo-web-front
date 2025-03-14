import { router } from "@/presentation/router";
import { Link as RouterLink, LinkComponentProps } from "@tanstack/react-router";

export function Link(props: LinkComponentProps<"a", typeof router>) {
  return (
    <RouterLink
      {...props}
      className={"text-primary underline" + " " + (props.className ?? "")}
    />
  );
}
