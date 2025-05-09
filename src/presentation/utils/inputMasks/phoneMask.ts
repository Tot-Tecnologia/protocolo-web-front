export function phoneMask(event: React.ChangeEvent<HTMLInputElement>) {
  let value = event.target.value.replace(/\D/g, "");  

  if (value.length <= 2) {
    value = `(${value}`;
  } else if (value.length <= 6) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else {
    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }
  if (value.length <= 13) {
    value = value.replace("-", ""); 
  }

  event.target.value = value;
}
