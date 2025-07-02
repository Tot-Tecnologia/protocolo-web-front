import { Button } from "@/presentation/components/Button";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import { SIGN_IN_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { useNavigate } from "@tanstack/react-router";

export function RecoverPasswordMessage() {
  const navigate = useNavigate();

  return (
    <MainPageWithImage title="Pronto!">
      <div className="flex flex-col gap-4 *:w-full">
        <p>
          Se o <b>e-mail</b> inserido estiver cadastrado em nosso sistema, em
          breve uma mensagem chegará na <b>caixa de entrada</b>. Siga as
          instruções e continue.
        </p>

        <Button
          type="button"
          onClick={() => navigate({ to: SIGN_IN_ROUTE_URL })}
        >
          Continuar
        </Button>
      </div>
    </MainPageWithImage>
  );
}
