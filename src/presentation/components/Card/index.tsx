import clsx from "clsx";

type CardProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) {
  const isHeaderVisible = title != null;

  return (
    <div
      className={clsx("rounded-lg border border-gray-200 bg-white", className)}
    >
      {isHeaderVisible && (
        <>
          <div className="px-3 py-3 md:px-5 md:py-4">
            <h2>{title}</h2>
          </div>

          <hr className="mx-1.5 text-gray-200" />
        </>
      )}

      <div className="px-3 py-3 md:px-5 md:py-4">{children}</div>
    </div>
  );
}
