import { AddProtocoloResponse } from "@/domain/usecases/addProtocolo";

export type AddDocumentosToProtocoloArgs = {
  idProtocolo: number;
  documentos: File[];
};

export type AddDocumentosToProtocoloResponse = AddProtocoloResponse;

export interface AddDocumentosToProtocolo {
  add(
    args: AddDocumentosToProtocoloArgs,
    token: string,
  ): Promise<AddDocumentosToProtocoloResponse>;
}
