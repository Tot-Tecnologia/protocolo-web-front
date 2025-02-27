import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { MainPageWithImage } from "../../components/MainPageWithImage";
import {
  RECOVER_PASSWORD_ROUTE_URL,
  SIGN_UP_ROUTE_URL,
} from "../../constants/routesUrl";

export function SignIn() {
  const navigate = useNavigate();

  const handleClickSignUp = () => navigate({ to: SIGN_UP_ROUTE_URL });

  return (
    <MainPageWithImage title="Login" fitImageToDisplayHeight>
      <form>
        <div className="flex flex-col gap-4 *:w-full">
          <Input placeholder="CPF/CNPJ" />
          <Input placeholder="Senha" />

          <div className="flex justify-end">
            <Link to={RECOVER_PASSWORD_ROUTE_URL}>Recuperar senha</Link>
          </div>

          <Button className="mt-6" type="submit">
            Acessar
          </Button>
          <Button type="button" variant="outlined" onClick={handleClickSignUp}>
            Cadastrar
          </Button>
        </div>
      </form>
    </MainPageWithImage>
  );
}
