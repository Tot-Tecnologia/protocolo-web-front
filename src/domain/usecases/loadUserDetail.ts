import { UserDetailModel } from "../models";

export interface LoadUserDetail {
  load(): Promise<UserDetailModel>;
}
