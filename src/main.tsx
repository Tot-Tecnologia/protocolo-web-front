import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import { Input } from "./components/Input";
import { Link } from "./components/Link";
import { Button } from "./components/Button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <div className="flex justify-between gap-4">
        <div className="mx-auto max-w-90 basis-full px-2 py-4 md:basis-65/100">
          <div className="flex flex-col items-center gap-10">
            <img
              src="logo.png"
              alt="Logo da prefeitura de Patrocínio"
              className="h-18 md:h-24"
            />
            <h1 className="text-primary-dark text-2xl font-bold">
              Protocolo Web
            </h1>
            <h2 className="text-primary-dark font-regular text-2xl">LOGIN</h2>
          </div>

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
        </div>

        <div className="hidden h-screen w-full basis-45/100 md:block">
          <img
            src="paisagem.png"
            alt="Paisagem com uma igreja"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  </StrictMode>,
);
