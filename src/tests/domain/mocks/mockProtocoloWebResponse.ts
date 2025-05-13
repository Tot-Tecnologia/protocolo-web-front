import { HttpStatusCode } from "@/data/protocols/http/httpClient";
import {
  ProtocoloWebDefaultResponse,
  ProtocoloWebPaginationResponse,
} from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockProtocoloWebDefaultResponse = (
  statusCode: HttpStatusCode = HttpStatusCode.ok,
): ProtocoloWebDefaultResponse => ({
  codigo: statusCode,
  mensagem: faker.lorem.sentence(),
  dataHora: faker.date.anytime().toISOString(),
  status: faker.lorem.word(),
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
