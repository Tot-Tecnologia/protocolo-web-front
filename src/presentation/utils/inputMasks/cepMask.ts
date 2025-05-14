export function cepMask(event: React.ChangeEvent<HTMLInputElement>) {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length > 5) {
    value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
  }

  event.target.value = value;
}
