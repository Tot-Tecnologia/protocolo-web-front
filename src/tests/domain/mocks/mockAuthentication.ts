import { faker } from "@faker-js/faker";
import { AccountModel } from "@/domain/models";
import { Authentication, AuthenticationArgs } from "@/domain/usecases";

export function mockAuthenticationArgs(): AuthenticationArgs {
  const email = faker.internet.email();
  const password = faker.internet.password();

  return { email, password };
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});

export class AuthenticationSpy implements Authentication {
  accountModel = mockAccountModel();
  args?: AuthenticationArgs;

  signIn(args: AuthenticationArgs): Promise<AccountModel> {
    this.args = args;
    return Promise.resolve(this.accountModel);
  }
}
