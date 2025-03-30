import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test/mockAccountModel";
import { Authentication, AuthenticationArgs } from "@/domain/usecases";

export class AuthenticationSpy implements Authentication {
  accountModel = mockAccountModel();
  args?: AuthenticationArgs;

  signIn(args: AuthenticationArgs): Promise<AccountModel> {
    this.args = args;
    return Promise.resolve(this.accountModel);
  }
}
