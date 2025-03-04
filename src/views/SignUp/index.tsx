import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { MainPageWithImage } from "@/components/MainPageWithImage";
import { SIGN_IN_ROUTE_URL } from "@/constants/routesUrl";

export function SignUp() {
  const navigate = useNavigate();

  const handleClickBack = () => navigate({ to: SIGN_IN_ROUTE_URL });

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

          <Button className="mt-6" type="submit" size="large">
            Cadastrar
          </Button>

          <Button
            type="submit"
            variant="outlined"
            size="large"
            onClick={handleClickBack}
          >
            Voltar
          </Button>
        </div>
      </form>
    </MainPageWithImage>
  );
}
