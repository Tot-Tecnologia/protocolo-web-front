import { UserDetailModel } from "../models";

export interface LoadUserDetail {
  load(token: string): Promise<UserDetailModel>;
}
