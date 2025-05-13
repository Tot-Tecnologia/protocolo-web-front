import { router } from "@/presentation/router";
import { Link, LinkComponentProps } from "@tanstack/react-router";

type NavLinkProps = {
  to: LinkComponentProps<"a", typeof router>["to"];
  iconSrc: string;
  children: React.ReactNode;
};

export function NavLink({ to, iconSrc, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="flex flex-nowrap items-center gap-x-3 rounded-lg px-3 py-2 whitespace-nowrap hover:underline"
      activeProps={{
        className: "bg-white",
      }}
      data-testid={`NavLink-to-${to}`}
    >
      <img
        src={iconSrc}
        alt="Ícone do menu de navegação de Solicitar Processo"
      />
      {children}
    </Link>
  );
}
