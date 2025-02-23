import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { MainPageWithImage } from "../../components/MainPageWithImage";

export function SignIn() {
  return (
    <MainPageWithImage title="Login">
      <form>
        <div className="flex flex-col gap-4">
          <Input className="w-full" placeholder="CPF/CNPJ" />
          <Input className="w-full" placeholder="SENHA" />

          <div className="flex justify-end">
            <Link className="mt-4" href="#">
              Recuperar senha
            </Link>
          </div>

          <Button className="mt-6 w-full" type="submit">
            Acessar
          </Button>
          <Button className="w-full" type="button" variant="outlined">
            Cadastrar
          </Button>
        </div>
      </form>
    </MainPageWithImage>
  );
}
