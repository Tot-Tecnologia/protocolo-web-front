import { render } from "@testing-library/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { UserType } from "@/domain/models";
import { AuthContextProvider } from "@/presentation/constants/AuthContext/common/components/AuthContextProvider";
import { routeTree } from "@/presentation/router/generated/routeTree.gen";

export const mockedRouter = createRouter({
  routeTree,
  context: {
    firebaseUser: undefined!,
    protocoloWebUser: undefined!,
    queryClient: undefined!,
    isAuthenticated: true,
    lastUserType: UserType.CIDADAO,
  },
});

export const mockedQueryClient = new QueryClient();

export const updateRouterWithWrappedChildren = ({
  children,
}: {
  children?: React.ReactNode;
} = {}) => {
  mockedRouter.routesById["__root__"].update({
    component: () => (
      // Providers default são colocados logo abaixo
      <QueryClientProvider client={mockedQueryClient}>
        <AuthContextProvider
          authentication={undefined!}
          uiNotification={undefined!}
          loadUserDetail={undefined!}
        >
          {children}
        </AuthContextProvider>
        <ToastContainer />
      </QueryClientProvider>
    ),
  });
};

export type RenderWithProvidersOptions = {
  providers?: React.FC<React.PropsWithChildren>[];
};

export const renderWithProviders = (
  children: React.ReactElement,
  { providers }: RenderWithProvidersOptions = {}, // Providers extras são informados aqui <---
) => {
  if (providers) {
    updateRouterWithWrappedChildren({
      children: providers.reduce(
        (content, Provider) => <Provider>{content}</Provider>,
        children,
      ),
    });
    render(<RouterProvider router={mockedRouter} />);
  } else {
    updateRouterWithWrappedChildren({ children });
    render(<RouterProvider router={mockedRouter} />);
  }
};
