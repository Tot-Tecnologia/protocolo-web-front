import { AddProtocoloResponse } from "@/domain/usecases/addProtocolo";

export type LoadProtocoloDetailsArgs = {
  numeroProtocolo: string;
};

export type LoadProtocoloDetailsResponse = AddProtocoloResponse;

export interface LoadProtocoloDetails {
  load: (
    args: LoadProtocoloDetailsArgs,
    token: string, // TODO: remover token daqui
  ) => Promise<LoadProtocoloDetailsResponse>;
}
