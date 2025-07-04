import { UserType } from "@/domain/models";
import { NavLink } from "@/presentation/components/NavBar/common/components/NavLink";
import {
  CREATE_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";

type NavLinksListProps = {
  userType: UserType;
};

export function NavLinksList({ userType }: NavLinksListProps) {
  return (
    <>
      {userType === UserType.CIDADAO ? (
        <li>
          <NavLink to={CREATE_PROTOCOLO_ROUTE_URL} iconSrc="/pageIcon.svg">
            Solicitação
          </NavLink>
        </li>
      ) : (
        <></>
      )}

      <li>
        <NavLink to={LIST_PROTOCOLOS_ROUTE_URL} iconSrc="/tableIcon.svg">
          Consultar Solicitação
        </NavLink>
      </li>
    </>
  );
}
