/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * Remove as propriedades do objeto com valores iguais a `null` ou `undefined`.
 */
export function removeNullish(obj: Record<string, any>) {
  return Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
}
