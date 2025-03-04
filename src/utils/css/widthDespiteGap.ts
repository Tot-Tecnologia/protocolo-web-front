export function widthDespiteGap(width: string, gap: string) {
  return `w-[calc(${width}_-_var(--spacing)_*_${gap})]`;
}
