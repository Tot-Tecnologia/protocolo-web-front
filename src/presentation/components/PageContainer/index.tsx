import { Button } from "@/presentation/components/Button";
import { NavBar } from "@/presentation/components/NavBar";

type IPageContainerProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageContainer({ title, children }: IPageContainerProps) {
  return (
    <div className="block min-h-dvh px-2.5 py-4 md:grid md:grid-cols-[auto_1fr] md:px-4 md:py-6">
      <NavBar className="hidden md:block" />

      <div>
        <div className="flex items-center justify-between pb-10">
          <h1 className="text-xl font-semibold">{title}</h1>

          <Button
            variant="outlined"
            size="small"
            className="block md:hidden"
            onClick={() => alert("TODO")}
          >
            Menu
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
