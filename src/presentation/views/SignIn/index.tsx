import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { Link } from "@/presentation/components/Link";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import {
  CREATE_DOCUMENTO_ROUTE_URL,
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { FormProvider, useForm } from "react-hook-form";
import { Authentication } from "@/domain/usecases";

type ISignInProps = {
  authentication: Authentication;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignIn({ authentication }: ISignInProps) {
  const form = useForm();
  const navigate = useNavigate();

  const { handleSubmit } = form;

  const handleSignIn = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 2));
    void navigate({ to: CREATE_DOCUMENTO_ROUTE_URL });
  });

  const handleClickSignUp = () => navigate({ to: SIGN_UP_ROUTE_URL });

  return (
    <MainPageWithImage title="Login" fitImageToDisplayHeight>
      <FormProvider {...form}>
        <form onSubmit={handleSignIn}>
          <div className="flex flex-col gap-4 *:w-full">
            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Senha" type="password" />

            <div className="flex justify-end">
              <Link to={RECOVER_PASSWORD_ROUTE_URL}>Recuperar senha</Link>
            </div>

            <Button className="mt-6" type="submit" size="large">
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
          </div>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
