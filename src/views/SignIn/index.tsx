import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { MainPageWithImage } from "@/components/MainPageWithImage";
import {
  CREATE_SOLICITATION_ROUTE_URL,
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "@/constants/routesUrl";

export function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({ to: CREATE_SOLICITATION_ROUTE_URL });
  };

  const handleClickSignUp = () => navigate({ to: SIGN_UP_ROUTE_URL });

  return (
    <MainPageWithImage title="Login" fitImageToDisplayHeight>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col gap-4 *:w-full">
          <Input placeholder="CPF/CNPJ" />
          <Input placeholder="Senha" />

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
    </MainPageWithImage>
  );
}
