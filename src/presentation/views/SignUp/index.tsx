import { FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import { SIGN_IN_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { changeCpfCnpjEventHandler } from "@/presentation/utils/inputMasks/changeCpfCnpjEventHandler";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  SignUpDto,
  signUpValidationSchema,
} from "@/presentation/views/SignUp/common/validation/signUpValidationSchema";
import { AddAccount, UiNotification } from "@/domain/usecases";
import { useAddAccountMutation } from "@/presentation/views/SignUp/common/hooks/useAddAccountMutation";
import { ValidationError } from "@/domain/errors/validationError";

type ISignUpProps = {
  addAccount: AddAccount;
  uiNotification: UiNotification;
};

export function SignUp({ addAccount, uiNotification }: ISignUpProps) {
  const form = useFormWithZod({ schema: signUpValidationSchema });

  const addAccountMutation = useAddAccountMutation({ addAccount });

  const navigate = useNavigate();

  const handleSignUp = form.handleSubmit((data) => {
    addAccountMutation.mutate(data, {
      onSuccess: () => {
        uiNotification.success("Cadastro realizado com sucesso.");
        void navigate({ to: SIGN_IN_ROUTE_URL });
      },
      onError: (error) => {
        if (error instanceof ValidationError) {
          error.errors.forEach((message) => uiNotification.error(message));
          return;
        }
        uiNotification.error(error.message);
      },
    });
  });

  const handleClickBack = () => navigate({ to: SIGN_IN_ROUTE_URL });

  return (
    <MainPageWithImage title="Cadastrar">
      <FormProvider {...form}>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-4 *:w-full">
            <Input<SignUpDto>
              name="cpfCnpj"
              placeholder="CPF/CNPJ"
              onChange={changeCpfCnpjEventHandler}
            />

            <Input<SignUpDto> name="nome" placeholder="Nome" />

            <Input<SignUpDto> name="telefone" placeholder="Celular" />

            <Input<SignUpDto> name="email" placeholder="E-mail" type="email" />

            <Input<SignUpDto>
              name="confirmacaoEmail"
              placeholder="Confirmar e-mail"
              type="email"
            />

            <Input<SignUpDto>
              name="senha"
              placeholder="Senha"
              type="password"
            />

            <Input<SignUpDto>
              name="confirmacaoSenha"
              placeholder="Confirmar senha"
              type="password"
            />

            <Button
              className="mt-6"
              type="submit"
              size="large"
              loading={addAccountMutation.isPending}
            >
              Cadastrar
            </Button>

            <Button variant="outlined" size="large" onClick={handleClickBack}>
              Voltar
            </Button>
          </div>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
