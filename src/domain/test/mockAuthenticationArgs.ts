import { faker } from "@faker-js/faker";

export function mockAuthenticationArgs() {
  const email = faker.internet.email();
  const password = faker.internet.password();

  return { email, password };
}
