import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { MainPageWithImage } from "../../components/MainPageWithImage";

export function SignIn() {
  return (
    <MainPageWithImage title="Login">
      <form>
        <Input className="mt-7.5 w-full" placeholder="CPF/CNPJ" />
        <Input className="mt-4 w-full" placeholder="SENHA" />
        <div className="flex justify-end">
          <Link className="mt-4" href="#">
            Recuperar senha
          </Link>
        </div>

        <Button className="mt-10 w-full" type="submit">
          Acessar
        </Button>
        <Button className="mt-4 w-full" type="button" variant="outlined">
          Cadastrar
        </Button>
      </form>
    </MainPageWithImage>
  );
}
