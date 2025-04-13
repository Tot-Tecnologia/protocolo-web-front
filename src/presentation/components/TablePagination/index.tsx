import { Button } from "@/presentation/components/Button";
import { usePagination } from "@/presentation/hooks/usePagination";

type ITablePaginationProps = {
  /** Número total de páginas. */
  total: number;
};

export function TablePagination({ total }: ITablePaginationProps) {
  const pagination = usePagination({ total });

  return (
    <ul
      className="align-center flex justify-end gap-3 md:gap-1"
      aria-label="Paginação da tabela"
    >
      <li>
        <Button
          aria-label="Página anterior"
          size="small"
          variant="outlined"
          onClick={pagination.previous}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </li>

      {pagination.range.map((pageNumber, index) => {
        if (pageNumber === "dots") {
          return (
            <li className="hidden md:list-item" key={`page-dots-${index}`}>
              <Button
                variant="text"
                size="small"
                className="text-primary! font-normal"
                disabled
              >
                ...
              </Button>
            </li>
          );
        }

        if (pageNumber === pagination.active) {
          return (
            <li
              className="hidden md:list-item"
              key={`page-number-${pageNumber}`}
            >
              <Button
                aria-current="page"
                variant="text"
                size="small"
                className="text-primary! underline"
                disabled
              >
                {pageNumber}
              </Button>
            </li>
          );
        }

        return (
          <li className="hidden md:list-item" key={`page-number-${pageNumber}`}>
            <Button
              aria-label={`Ir para página ${pageNumber}`}
              size="small"
              variant="text"
              className="font-normal"
              onClick={() => pagination.setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}

      <li>
        <Button
          aria-label="Próxima página"
          size="small"
          variant="outlined"
          onClick={pagination.next}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </li>
    </ul>
  );
}
