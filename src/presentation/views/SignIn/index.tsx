import { useNavigate } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import { Authentication } from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { Link } from "@/presentation/components/Link";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import { notificationService } from "@/presentation/services/notificationService";
import {
  CREATE_DOCUMENTO_ROUTE_URL,
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import {
  SignInDto,
  signInValidationSchema,
} from "./common/validation/signInValidationSchema";
import { useAuthenticationMutation } from "./common/hooks/useAuthenticationMutation";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";

type ISignInProps = {
  authentication: Authentication;
};

export function SignIn({ authentication }: ISignInProps) {
  const form = useFormWithZod({ schema: signInValidationSchema });

  const authenticationMutation = useAuthenticationMutation({ authentication });

  const navigate = useNavigate();

  const handleSignIn = form.handleSubmit(({ email, password }) => {
    authenticationMutation.mutate(
      { email, password },
      {
        onSuccess: ({ accessToken }) => {
          console.log({ accessToken });
          void navigate({ to: CREATE_DOCUMENTO_ROUTE_URL });
        },
        onError: (error) => notificationService.error(error.message),
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
            <Link to={RECOVER_PASSWORD_ROUTE_URL}>Recuperar senha</Link>
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
