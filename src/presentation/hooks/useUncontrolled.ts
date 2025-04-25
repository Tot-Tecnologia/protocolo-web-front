/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from "react";

type UseUncontrolledProps<TValue> = {
  /** Valor a ser controlado (opcional). */
  value?: TValue;

  /** Valor inicial do estado não controlado. */
  defaultValue?: TValue;

  /** Valor final do estado não controlado quando `value` e `defaultValue` não são informados */
  finalValue?: TValue;

  /** Callback para mudança no `value` */
  onChange?: (value: TValue, ...payload: any[]) => void;
};

/**
 * Hook que permite que um estado funcione como controlado ou não-controlado.
 *
 * - Se `value` for fornecido, o estado será considerado controlado e `onChange` será usado para atualizações.
 * - Se `value` não for fornecido, o hook utilizará `defaultValue` ou `finalValue` como estado interno.
 *
 * @example
 * const [value, setValue, isControlled] = useUncontrolled<string>({
 *   value: props.value,
 *   defaultValue: props.defaultValue,
 *   finalValue: '',
 *   onChange: props.onChange,
 * });
 */
export function useUncontrolled<TValue>({
  value,
  defaultValue,
  finalValue,
  onChange = () => {},
}: UseUncontrolledProps<TValue>): [
  TValue,
  (value: TValue, ...payload: any[]) => void,
  boolean,
] {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue !== undefined ? defaultValue : finalValue,
  );

  const handleUncontrolledChange = (val: TValue, ...payload: any[]) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };

  if (value !== undefined) {
    return [value as TValue, onChange, true];
  }

  return [uncontrolledValue as TValue, handleUncontrolledChange, false];
}
