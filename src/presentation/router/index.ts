import { queryClient } from "@/presentation/queryClient";
import { routeTree } from "@/presentation/router/generated/routeTree.gen";
import { createHashHistory, createRouter } from "@tanstack/react-router";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: queryClient,
    firebaseUser: undefined!,
    protocoloWebUser: undefined!,
    isAuthenticated: false,
  },
  history: createHashHistory(),
});
