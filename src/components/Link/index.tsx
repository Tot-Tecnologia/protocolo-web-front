type ILinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link(props: ILinkProps) {
  return (
    <a
      {...props}
      className={"text-primary-dark underline" + " " + (props.className ?? "")}
    />
  );
}
