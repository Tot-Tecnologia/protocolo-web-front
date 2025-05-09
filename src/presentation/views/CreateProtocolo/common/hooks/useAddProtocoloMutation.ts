import { AddProtocolo, AddProtocoloArgs } from "@/domain/usecases";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useMutation } from "@tanstack/react-query";

// ✅ Função para transformar os dados do formulário em FormData
function convertToFormData(data: any): FormData {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (key === "arquivos" && Array.isArray(value)) {
      value.forEach((file: File) => {
        formData.append("arquivos", file); // ou "arquivos[]" se o backend exigir
      });
    } else {
      formData.append(key, value);
    }
  }

  return formData;
}

type IUseAddProtocoloMutationProps = {
  addProtocolo: AddProtocolo;
};

export function useAddProtocoloMutation({
  addProtocolo,
}: IUseAddProtocoloMutationProps) {
  const [token] = useAccessToken();

  const mutationFn = (args: AddProtocoloArgs) => {
    const formData = convertToFormData(args);
    return addProtocolo.save(formData, token);
  };

  return useMutation({ mutationFn });
}
