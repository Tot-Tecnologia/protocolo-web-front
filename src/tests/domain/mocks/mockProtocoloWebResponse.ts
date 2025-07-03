import { HttpStatusCode } from "@/data/protocols/http";
import {
  ProtocoloWebErrorResponse,
  ProtocoloWebPaginationResponse,
} from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockProtocoloWebErrorResponse = (
  statusCode: HttpStatusCode = HttpStatusCode.ok,
): ProtocoloWebErrorResponse => ({
  statusCode: statusCode,
  errors: faker.helpers.multiple(() => ({
    message: faker.lorem.sentence(),
    field: faker.lorem.word(),
  })),
  dateTime: faker.date.anytime().toISOString(),
});

export const mockProtocoloWebPaginationResponse = <TData = unknown>(
  data: TData[],
): ProtocoloWebPaginationResponse<TData> => ({
  data: data,
  itensPagina: faker.number.int(),
  totalPaginas: faker.number.int(),
  paginaAnterior: faker.datatype.boolean(),
  paginaAtual: faker.number.int(),
  primeiraPagina: faker.datatype.boolean(),
  proximaPagina: faker.datatype.boolean(),
  ultimaPagina: faker.datatype.boolean(),
  vazio: faker.datatype.boolean(),
});
