import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { UserDetailModel, UserType } from "@/domain/models";

export type RouterContextValues = {
  queryClient: QueryClient;
  firebaseUser: User;
  protocoloWebUser: UserDetailModel;
  isAuthenticated: boolean;
  lastUserType: UserType;
};

export const Route = createRootRouteWithContext<RouterContextValues>()({
  component: Outlet,
});
