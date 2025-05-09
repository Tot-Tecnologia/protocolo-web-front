import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import { ProtocoloWebDefaultResponse } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockProtocoloWebDefaultResponse = (
  statusCode: HttpStatusCode = HttpStatusCode.ok,
): ProtocoloWebDefaultResponse => ({
  codigo: statusCode,
  mensagem: faker.lorem.sentence(),
  dataHora: faker.date.anytime().toISOString(),
  status: faker.lorem.word(),
});
