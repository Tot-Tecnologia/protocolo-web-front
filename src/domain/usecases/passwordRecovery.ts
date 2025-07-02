export type PasswordRecoveryArgs = {
  email: string;
};

export interface PasswordRecovery {
  recover(args: PasswordRecoveryArgs): Promise<void>;
}
