import { z } from "zod";

export type ArquivoRequest = {
  documentos: File[];
};

export const arquivoRequestValidationSchema: z.Schema<ArquivoRequest> =
  z.object({
    documentos: z
      .array(
        z.instanceof(File).refine((file) => file.type === "application/pdf", {
          message: "São aceitos apenas arquivos .pdf",
        }),
      )
      .min(1, "Adicione ao menos um documento"),
  });

export const arquivoRequestDefaultValues: ArquivoRequest = {
  documentos: [],
};
