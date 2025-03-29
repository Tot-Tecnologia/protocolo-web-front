export type AddAccountArgs = {
  cpfCnpj: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
};

export interface AddAccount {
  signIn(args: AddAccountArgs): Promise<void>;
}
