import { routeTree } from "@/presentation/router/generated/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";

export const mockedRouter = createRouter({ routeTree });

export const updateRouterWithWrappedChildren = ({
  children,
}: {
  children?: React.ReactNode;
} = {}) => {
  mockedRouter.routesById["__root__"].update({
    component: () => <>{children}</>, // Providers default são colocados aqui <---
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
