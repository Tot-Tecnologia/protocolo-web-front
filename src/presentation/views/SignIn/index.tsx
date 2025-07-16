import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import { Authentication, UiNotification } from "@/domain/usecases";
import { UserType } from "@/domain/models";
import { useAuthContext } from "@/presentation/constants/AuthContext/common/hooks/useAuthContext";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import {
  CREATE_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import {
  SignInDto,
  signInValidationSchema,
} from "./common/validation/signInValidationSchema";
import { useAuthenticationMutation } from "./common/hooks/useAuthenticationMutation";

type SignInProps = {
  authentication: Authentication;
  uiNotification: UiNotification;
};

export function SignIn({ authentication, uiNotification }: SignInProps) {
  const form = useFormWithZod({ schema: signInValidationSchema });

  const { protocoloWebUser, isAuthenticated, loading } = useAuthContext();

  const authenticationMutation = useAuthenticationMutation({
    authentication,
  });

  const navigate = useNavigate();

  const handleSignIn = form.handleSubmit(async ({ email, password }) => {
    try {
      await authenticationMutation.mutateAsync(
        { email, password },
        { onError: (err) => uiNotification.error(err.message) },
      );
      // Depois que a promise resolver, o evento onAuthStateChanged dentro
      // do AuthContextProvider é disparado com firebaseUser atualizado.
    } catch {
      // Não faz nada.
    }
  });

  const handleClickSignUp = () => navigate({ to: SIGN_UP_ROUTE_URL });

  useEffect(() => {
    if (isAuthenticated && protocoloWebUser?.tipoUsuario) {
      const route =
        protocoloWebUser.tipoUsuario === UserType.CIDADAO
          ? CREATE_PROTOCOLO_ROUTE_URL
          : LIST_PROTOCOLOS_ROUTE_URL;

      void navigate({ to: route });
    }
  }, [isAuthenticated, navigate, protocoloWebUser?.tipoUsuario]);

  return (
    <MainPageWithImage title="Login" fitImageToDisplayHeight>
      <FormProvider {...form}>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4 *:w-full">
          <Input<SignInDto> name="email" placeholder="E-mail" />

          <Input<SignInDto>
            name="password"
            placeholder="Senha"
            type="password"
          />

          <div className="flex justify-end">
            <Link to={RECOVER_PASSWORD_ROUTE_URL} className="underline">
              Recuperar senha
            </Link>
          </div>

          <Button
            className="mt-6"
            type="submit"
            size="large"
            loading={authenticationMutation.isPending || loading}
          >
            Acessar
          </Button>

          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleClickSignUp}
          >
            Cadastrar
          </Button>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
