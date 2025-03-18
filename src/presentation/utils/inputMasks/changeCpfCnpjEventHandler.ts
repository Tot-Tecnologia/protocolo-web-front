const cpfLength = 14;
const cnpjLength = 18;

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
  if (value.length > cnpjLength) {
    // não permite que exceda a quantidade de caracteres de um CNPJ
    event.target.value = value.slice(0, cnpjLength);
  } else if (value.length <= cpfLength) {
    // formata com máscara de CPF
    event.target.value = cpfMask(value);
  } else {
    // formata com máscara de CNPJ
    event.target.value = cnpjMask(value);
  }
}
