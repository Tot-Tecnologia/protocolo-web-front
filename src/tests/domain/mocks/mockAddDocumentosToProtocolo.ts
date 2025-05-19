import { faker } from "@faker-js/faker";
import { AddDocumentosToProtocoloArgs } from "@/domain/usecases";

const mockDocumentos = () =>
  faker.helpers.multiple(
    (_, i) =>
      new File([`%PDF-1.${i + 3}`], `documento${i + 1}.pdf`, {
        type: "application/pdf",
      }),
  );

export const mockAddDocumentosToProtocoloArgs =
  (): AddDocumentosToProtocoloArgs => ({
    idProtocolo: faker.number.int(),
    documentos: mockDocumentos(),
  });
