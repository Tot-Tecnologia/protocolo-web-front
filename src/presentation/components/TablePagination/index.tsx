import { Button } from "@/presentation/components/Button";
import {
  IPaginationProps,
  usePagination,
} from "@/presentation/hooks/usePagination";
import { ArrowLeftIcon } from "@/presentation/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/presentation/icons/ArrowRightIcon";

type ITablePaginationProps = IPaginationProps;

export function TablePagination(props: ITablePaginationProps) {
  const pagination = usePagination(props);

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
          <ArrowLeftIcon className="size-5" viewBox="0 0 20 20" />
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
          <ArrowRightIcon className="size-5" viewBox="0 0 20 20" />
        </Button>
      </li>
    </ul>
  );
}
