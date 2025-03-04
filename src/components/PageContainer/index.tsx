type IPageContainerProps = {
  children?: React.ReactNode;
};

export function PageContainer({ children }: IPageContainerProps) {
  return <div className="px-2.5 py-4 md:px-4 md:py-6">{children}</div>;
}
