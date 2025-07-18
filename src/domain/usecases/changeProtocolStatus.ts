import type { ProtocoloStatus } from "../../data/constants/protocoloStatusEnum";
import type { AddProtocoloResponse } from "./addProtocolo";

export type ChangeProtocolStatusArgs = {
  id: number;
  status: ProtocoloStatus;
};

export type ChangeProtocolStatusResponse = AddProtocoloResponse;

export interface ChangeProtocolStatus {
  change(
    args: ChangeProtocolStatusArgs,
    token: string,
  ): Promise<ChangeProtocolStatusResponse>;
}
