import { AuthenticationArgs } from "@/domain/usecases";
import { faker } from "@faker-js/faker";

export function mockAuthenticationArgs(): AuthenticationArgs {
  const email = faker.internet.email();
  const password = faker.internet.password();

  return { email, password };
}
