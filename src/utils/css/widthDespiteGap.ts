export function widthDespiteGap(width: string, gap: string) {
  return `w-[calc(${width}_-_calc(${gap}_*_var(--spacing)))]`;
}
