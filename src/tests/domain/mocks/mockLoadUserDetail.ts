import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";
import { faker } from "@faker-js/faker";
import { UserType, UserDetailModel } from "@/domain/models";

export const mockUserDetailModel = (): UserDetailModel => ({
  documento: faker.string.numeric(),
  nome: faker.internet.username(),
  tipoUsuario: UserType.CIDADAO,
});

export class UserDetailSpy implements LoadUserDetail {
  userDetailModel = mockUserDetailModel();
  arg?: string;

  load(): Promise<UserDetailModel> {
    return Promise.resolve(this.userDetailModel);
  }
}
