import { AccountModel } from "@/domain/models";

export type AuthenticationArgs = {
  email: string;
  password: string;
};

export interface Authentication {
  signIn(args: AuthenticationArgs): Promise<AccountModel>;
  signOut(): Promise<void>;
}
