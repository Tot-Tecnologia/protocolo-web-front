import { Link, useNavigate } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import { Authentication, UiNotification } from "@/domain/usecases";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import {
  CREATE_PROTOCOLO_ROUTE_URL,
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import {
  SignInDto,
  signInValidationSchema,
} from "./common/validation/signInValidationSchema";
import { useAuthenticationMutation } from "./common/hooks/useAuthenticationMutation";

type ISignInProps = {
  authentication: Authentication;
  uiNotification: UiNotification;
};

export function SignIn({ authentication, uiNotification }: ISignInProps) {
  const [, setAccessToken] = useAccessToken();

  const form = useFormWithZod({ schema: signInValidationSchema });

  const authenticationMutation = useAuthenticationMutation({ authentication });

  const navigate = useNavigate();

  const handleSignIn = form.handleSubmit(({ email, password }) => {
    authenticationMutation.mutate(
      { email, password },
      {
        onSuccess: (accountModel) => {
          setAccessToken(accountModel.accessToken);
          void navigate({ to: CREATE_PROTOCOLO_ROUTE_URL });
        },
        onError: (error) => uiNotification.error(error.message),
      },
    );
  });

  const handleClickSignUp = () => navigate({ to: SIGN_UP_ROUTE_URL });

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
            loading={authenticationMutation.isPending}
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
