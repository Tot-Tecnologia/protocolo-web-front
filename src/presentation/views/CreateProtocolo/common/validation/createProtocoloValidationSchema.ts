import { estadosBR } from "@/data/constants/estadosBR";
import { CPF_CNPJ_REGEXP } from "@/presentation/constants/regExps";
import { z } from "zod";

export type ProtocoloRequest = {
  cpfCnpj: string;
  telefone: string;
  nomeSolicitante: string;
  endereco: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  estado: string;
  email: string;
  complemento: string;
  descricao: string;
  cidade: string;
  tipoDocumento: number;
  arquivos: File[];
};

// TODO: refinar validações

export const protocoloRequestValidationSchema: z.Schema<ProtocoloRequest> =
  z.object({
    cpfCnpj: z
      .string()
      .regex(CPF_CNPJ_REGEXP)
      .transform((input) => input.replace(/\D/g, "")),
    telefone: z
      .string()
      .regex(/^\d{2}\d{8,9}$/, "Deve conter DDD e 8 ou 9 dígitos")
      .transform((input) => input.replace(/\D/g, "")),
    nomeSolicitante: z.string().min(1, "Obrigatório"),
    email: z.string().email(),
    endereco: z.string(),
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cep: z.string(),
    estado: z
      .string()
      .refine(
        (estado) => estadosBR.includes(estado),
        "Insira abreviado (MG, SP, etc.)",
      ),
    complemento: z.string(),
    descricao: z.string(),
    cidade: z.string(),
    tipoDocumento: z.coerce.number(),
    arquivos: z.array(z.any()),
  });

export const protocoloRequestDefaultValues: ProtocoloRequest = {
  cpfCnpj: "",
  telefone: "",
  nomeSolicitante: "",
  email: "",
  endereco: "",
  logradouro: "SEM_NADA",
  numero: "",
  bairro: "",
  cep: "",
  estado: "",
  complemento: "",
  descricao: "",
  cidade: "",
  tipoDocumento: null as never,
  arquivos: [],
};
