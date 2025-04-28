import { Link, LinkComponentProps } from "@tanstack/react-router";
import { router } from "@/presentation/router";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { Button } from "@/presentation/components/Button";
import { NavBar } from "@/presentation/components/NavBar";
import { ArrowLeftIcon } from "@/presentation/icons/ArrowLeftIcon";

type IPageContainerProps = {
  title?: React.ReactNode;
  navigateBackwardTo?: LinkComponentProps<"a", typeof router>["to"];
  children?: React.ReactNode;
};

export function PageContainer({
  title,
  navigateBackwardTo,
  children,
}: IPageContainerProps) {
  return (
    <div className="block min-h-dvh px-2.5 py-4 md:grid md:grid-cols-[auto_1fr] md:px-4 md:py-6">
      <NavBar className="hidden md:block" />

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

          <Button
            variant="outlined"
            size="small"
            className="block md:hidden"
            onClick={() => alert("TODO")}
          >
            Menu
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
