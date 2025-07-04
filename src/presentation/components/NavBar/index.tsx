import clsx from "clsx";
import { UserType } from "@/domain/models";
import { NavLinksList } from "@/presentation/components/NavBar/common/components/NavLinksList";

type NavBarProps = {
  className?: string;
  userType: UserType;
};

export function NavBar({ className, userType }: NavBarProps) {
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
        <NavLinksList userType={userType} />
      </ul>
    </nav>
  );
}
