import { estadosBR } from "@/data/constants/estadosBR";
import { CPF_CNPJ_REGEXP } from "@/presentation/constants/regExps";
import { z } from "zod";

export type ProtocoloRequest = {
  cpfCnpj: string;
  telefone: string;
  nomeSolicitante: string;
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

export const protocoloRequestValidationSchema: z.Schema<ProtocoloRequest> =
  z.object({
    cpfCnpj: z.string().min(1, "Obrigatório").regex(CPF_CNPJ_REGEXP),
    telefone: z.string().min(1, "Obrigatório"),
    nomeSolicitante: z.string().min(1, "Obrigatório"),
    email: z.string().email(),
    logradouro: z.string().min(1, "Obrigatório"),
    numero: z.string().min(1, "Obrigatório"),
    bairro: z.string().min(1, "Obrigatório"),
    cep: z.string().min(1, "Obrigatório"),
    estado: z
      .string()
      .min(1, "Obrigatório")
      .refine(
        (estado) => estadosBR.includes(estado),
        "Insira abreviado (MG, SP, etc.)",
      ),
    complemento: z.string(),
    descricao: z.string(),
    cidade: z.string().min(1, "Obrigatório"),
    tipoDocumento: z.coerce.number().gt(0, "Obrigatório"),
    arquivos: z.array(z.any()),
  });

export const protocoloRequestDefaultValues: ProtocoloRequest = {
  cpfCnpj: "",
  telefone: "",
  nomeSolicitante: "",
  email: "",
  logradouro: "",
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
