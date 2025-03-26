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

          <Button variant="contained" size="small">
            contained small
          </Button>
          <Button loading variant="contained" size="small">
            contained small
          </Button>
          <Button variant="contained" size="medium">
            contained medium
          </Button>
          <Button loading variant="contained" size="medium">
            contained medium
          </Button>
          <Button variant="contained" size="large">
            contained large
          </Button>
          <Button loading variant="contained" size="large">
            contained large
          </Button>

          <Button variant="outlined" size="small">
            outlined small
          </Button>
          <Button loading variant="outlined" size="small">
            outlined small
          </Button>
          <Button variant="outlined" size="medium">
            outlined medium
          </Button>
          <Button loading variant="outlined" size="medium">
            outlined medium
          </Button>
          <Button variant="outlined" size="large">
            outlined large
          </Button>
          <Button loading variant="outlined" size="large">
            outlined large
          </Button>

          <Button variant="text" size="small">
            text small
          </Button>
          <Button loading variant="text" size="small">
            text small
          </Button>
          <Button variant="text" size="medium">
            text medium
          </Button>
          <Button loading variant="text" size="medium">
            text medium
          </Button>
          <Button variant="text" size="large">
            text large
          </Button>
          <Button loading variant="text" size="large">
            text large
          </Button>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
