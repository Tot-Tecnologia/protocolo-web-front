import { UserDetailModel } from "@/domain/models";
import { User } from "firebase/auth";
import { createContext } from "react";

type AuthContextValues = {
  firebaseUser: User;
  protocoloWebUser: UserDetailModel;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValues>(null!);
