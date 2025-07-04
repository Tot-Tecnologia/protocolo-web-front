import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { UserDetailModel } from "@/domain/models";

export type RouterContextValues = {
  queryClient: QueryClient;
  firebaseUser: User;
  protocoloWebUser: UserDetailModel;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContextValues>()({
  component: Outlet,
});
