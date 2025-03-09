type IOneLargeOneSmallInputsContainerProps = {
  children?: React.ReactNode;
};

export function OneLargeOneSmallInputsContainer({
  children,
}: IOneLargeOneSmallInputsContainerProps) {
  return (
    <div className="grid w-full gap-x-5 gap-y-6 lg:grid-cols-[1fr_calc(40_*_var(--spacing))]">
      {children}
    </div>
  );
}
