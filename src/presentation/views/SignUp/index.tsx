import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import { SIGN_IN_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { changeCpfCnpjEventHandler } from "@/presentation/utils/inputMasks/changeCpfCnpjEventHandler";

export function SignUp() {
  const form = useForm();
  const navigate = useNavigate();

  const { handleSubmit } = form;

  const handleSignUp = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 2));
  });

  const handleClickBack = () => navigate({ to: SIGN_IN_ROUTE_URL });

  return (
    <MainPageWithImage title="Cadastrar">
      <FormProvider {...form}>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-4 *:w-full">
            <Input
              name="cpfCnpj"
              placeholder="CPF/CNPJ"
              onChange={changeCpfCnpjEventHandler}
            />

            <Input name="nome" placeholder="Nome" />

            <Input name="telefone" placeholder="Celular" />

            <Input name="email" placeholder="E-mail" type="email" />

            <Input
              name="confirmacaoEmail"
              placeholder="Confirmar e-mail"
              type="email"
            />

            <Input name="senha" placeholder="Senha" />

            <Input name="confirmacaoSenha" placeholder="Confirmar senha" />

            <Button className="mt-6" type="submit" size="large">
              Cadastrar
            </Button>

            <Button variant="outlined" size="large" onClick={handleClickBack}>
              Voltar
            </Button>
          </div>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
