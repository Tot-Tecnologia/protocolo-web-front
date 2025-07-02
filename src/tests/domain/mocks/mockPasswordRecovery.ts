import { PasswordRecovery, PasswordRecoveryArgs } from "@/domain/usecases";
import { faker } from "@faker-js/faker";

export const mockPasswordRecoveryArgs = (): PasswordRecoveryArgs => ({
  email: faker.internet.email(),
});

export class PasswordRecoverySpy implements PasswordRecovery {
  args?: PasswordRecoveryArgs;

  recover(args: PasswordRecoveryArgs): Promise<void> {
    this.args = args;
    return Promise.resolve();
  }
}
