import { CNPJ_LENGTH, CPF_LENGTH } from "@/presentation/constants/stringLength";

function cpfMask(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
}

function cnpjMask(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1/$2");
  value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  return value;
}

export function changeCpfCnpjEventHandler(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const value = event.target.value;
  if (value.length > CNPJ_LENGTH) {
    // não permite que exceda a quantidade de caracteres de um CNPJ
    event.target.value = value.slice(0, CNPJ_LENGTH);
  } else if (value.length <= CPF_LENGTH) {
    // formata com máscara de CPF
    event.target.value = cpfMask(value);
  } else {
    // formata com máscara de CNPJ
    event.target.value = cnpjMask(value);
  }
}
