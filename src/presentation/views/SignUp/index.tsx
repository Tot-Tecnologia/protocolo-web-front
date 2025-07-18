import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import {
  SIGN_IN_CIDADAO_ROUTE_URL,
  SIGN_IN_SERVIDOR_ROUTE_URL,
  SIGN_UP_SERVIDOR_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { changeCpfCnpjEventHandler } from "@/presentation/utils/inputMasks";
import { phoneMask } from "@/presentation/utils/inputMasks";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  SignUpDto,
  signUpValidationSchema,
} from "@/presentation/views/SignUp/common/validation/signUpValidationSchema";
import { AddAccount, UiNotification } from "@/domain/usecases";
import { useAddAccountMutation } from "@/presentation/views/SignUp/common/hooks/useAddAccountMutation";

type SignUpProps = {
  addAccount: AddAccount;
  uiNotification: UiNotification;
};

export function SignUp({ addAccount, uiNotification }: SignUpProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const isSignUpServidor = useMatch({
    from: SIGN_UP_SERVIDOR_ROUTE_URL,
    shouldThrow: false,
  });

  const form = useFormWithZod({ schema: signUpValidationSchema });

  const addAccountMutation = useAddAccountMutation({ addAccount });

  const navigate = useNavigate();

  const handleSignUp = form.handleSubmit((data) => {
    if (!agreedToTerms) return;

    addAccountMutation.mutate(data, {
      onSuccess: () => {
        uiNotification.success(
          "Cadastro realizado! Acesse seu e-mail para validar sua conta e concluir o processo.",
        );
        void navigate({
          to: isSignUpServidor
            ? SIGN_IN_SERVIDOR_ROUTE_URL
            : SIGN_IN_CIDADAO_ROUTE_URL,
        });
      },
      onError: (error) => uiNotification.error(error.message),
    });
  });

  const handleClickBack = () =>
    navigate({
      to: isSignUpServidor
        ? SIGN_IN_SERVIDOR_ROUTE_URL
        : SIGN_IN_CIDADAO_ROUTE_URL,
    });

  const handleChangeAgreedToTerms = () => setAgreedToTerms((old) => !old);

  return (
    <MainPageWithImage
      title={`Cadastrar ${isSignUpServidor ? "Servidor" : "Cidadão"}`}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-4 *:w-full">
            <Input<SignUpDto>
              name="cpfCnpj"
              placeholder="CPF/CNPJ"
              onChange={changeCpfCnpjEventHandler} // Certifique-se de que o handler está correto
            />

            <Input<SignUpDto> name="nome" placeholder="Nome" />

            <Input<SignUpDto>
              name="telefone"
              placeholder="Celular"
              onChange={phoneMask}
            />

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

            <div className="my-4 text-sm">
              <input
                id="checkbox-termos"
                type="checkbox"
                checked={agreedToTerms}
                onChange={handleChangeAgreedToTerms}
              />

              <label htmlFor="checkbox-termos" className="ml-3">
                Aceito os{" "}
                <a
                  href="http://www.google.com.br"
                  className="font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a
                  href="http://www.google.com.br"
                  className="font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  Política de Privacidade
                </a>
              </label>
            </div>

            <Button
              type="submit"
              size="large"
              loading={addAccountMutation.isPending}
              disabled={!agreedToTerms}
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
