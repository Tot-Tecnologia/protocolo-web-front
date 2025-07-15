import { Link, LinkComponentProps, useNavigate } from "@tanstack/react-router";
import { router } from "@/presentation/router";
import {
  LIST_PROTOCOLOS_ROUTE_URL,
  SIGN_IN_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { Button } from "@/presentation/components/Button";
import { NavBar } from "@/presentation/components/NavBar";
import { ArrowLeftIcon } from "@/presentation/icons/ArrowLeftIcon";
import { LogoutIcon } from "@/presentation/icons/LogoutIcon";
import { useAuthContext } from "@/presentation/constants/AuthContext/common/hooks/useAuthContext";
import { Dropdown } from "@/presentation/components/Dropdown";
import { NavLinksList } from "@/presentation/components/NavBar/common/components/NavLinksList";
import { NavLink } from "@/presentation/components/NavBar/common/components/NavLink";

type PageContainerProps = {
  title?: React.ReactNode;
  navigateBackwardTo?: LinkComponentProps<"a", typeof router>["to"];
  children?: React.ReactNode;
};

export function PageContainer({
  title,
  navigateBackwardTo,
  children,
}: PageContainerProps) {
  const { protocoloWebUser, signOut } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    void navigate({ to: SIGN_IN_ROUTE_URL });
  };

  return (
    <div className="block min-h-dvh px-2.5 py-4 md:grid md:grid-cols-[auto_1fr] md:px-4 md:py-6">
      <NavBar
        className="hidden md:block"
        userType={protocoloWebUser?.tipoUsuario}
      />

      <div>
        <div className="flex items-center justify-between pb-10">
          <div className="flex items-center space-x-8">
            {!!navigateBackwardTo?.length && (
              <Link to={LIST_PROTOCOLOS_ROUTE_URL} title="Voltar">
                <ArrowLeftIcon className="size-6" viewBox="0 0 20 20" />
              </Link>
            )}

            <h1 className="text-xl font-semibold">{title}</h1>
          </div>

          <Dropdown
            positionX="right"
            anchorEl={
              <Button
                variant="outlined"
                size="small"
                className="flex md:hidden"
              >
                Menu
              </Button>
            }
          >
            <ul className="flex w-55 flex-col gap-y-1">
              <NavLinksList userType={protocoloWebUser?.tipoUsuario} />
              <NavLink
                to={"#" as never}
                onClick={handleLogout}
                iconSvg={
                  <LogoutIcon className="text-error-light ml-0.5 size-6" />
                }
              >
                Sair
              </NavLink>
            </ul>
          </Dropdown>

          <Button
            aria-label="Deslogar do sistema"
            size="small"
            variant="outlined"
            onClick={handleLogout}
            className="hidden md:flex"
          >
            <LogoutIcon className="mr-2 size-4.25" /> Sair
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
