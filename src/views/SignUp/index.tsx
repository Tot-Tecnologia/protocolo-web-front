import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { MainPageWithImage } from "../../components/MainPageWithImage";

export function SignUp() {
  return (
    <MainPageWithImage title="Cadastrar">
      <form>
        <div className="flex flex-col gap-4 *:w-full">
          <Input placeholder="CPF/CNPJ" />
          <Input placeholder="Nome" />
          <Input placeholder="Celular" />
          <Input placeholder="E-mail" />
          <Input placeholder="Confirmar e-mail" />
          <Input placeholder="Senha" />
          <Input placeholder="Confirmar senha" />

          <Button className="mt-6" type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </MainPageWithImage>
  );
}
