import clsx from "clsx";
import { NavLink } from "@/presentation/components/NavBar/common/components/NavLink";
import {
  CREATE_DOCUMENTO_ROUTE_URL,
  LIST_DOCUMENTOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";

type INavBarProps = {
  className?: string;
};

export function NavBar({ className }: INavBarProps) {
  return (
    <nav
      className={clsx(
        "mr-11 max-w-87 border-r border-gray-200 pr-7.5",
        className,
      )}
    >
      <img
        src="/logo.png"
        alt="Logo da prefeitura de Patrocínio"
        className="mx-auto h-18 translate-x-[calc(-1_*_var(--spacing))]"
      />

      <span className="text-primary mt-5 mb-10 flex justify-center text-lg font-bold">
        Protocolo Web
      </span>

      <span className="block text-xs text-gray-400">MENU</span>

      <ul className="mt-3 flex w-62 flex-col gap-y-1">
        <li>
          <NavLink to={CREATE_DOCUMENTO_ROUTE_URL} iconSrc="/pageIcon.svg">
            Solicitação
          </NavLink>
        </li>

        <li>
          <NavLink to={LIST_DOCUMENTOS_ROUTE_URL} iconSrc="/tableIcon.svg">
            Consultar Solicitação
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
