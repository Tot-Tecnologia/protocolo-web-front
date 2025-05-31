export enum UserType {
  CIDADAO = "CIDADAO",
  SERVIDOR = "SERVIDOR",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

export type UserDetailModel = {
  nome: string;
  documento: string;
  tipoUsuario: UserType;
};
