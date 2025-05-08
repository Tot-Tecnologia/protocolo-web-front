import { useMemo } from "react";
import { useUncontrolled } from "./useUncontrolled";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

const DOTS = "dots";

export type IPaginationProps = {
  /** Página selecionada inicialmente. @default 1 */
  initialPage?: number;

  /** Estado controlado da página selecionada. */
  page?: number;

  /** Quantidade total de itens. */
  total: number;

  /** Quantidade total de páginas (opcional). */
  totalPages?: number; // Adiciona totalPages aqui

  /** Quantidade de irmãos na direita e esquerda da página selecionada. @default 1 */
  siblings?: number;

  /** Quantidade de elementos visíveis nas extremidades da esquerda e direita. @default 1  */
  boundaries?: number;

  /** Função disparada ao trocar de página. */
  onChange?: (page: number) => void;
};

export function usePagination({
  total,
  totalPages = Math.ceil(total / 10),  // Caso totalPages não seja fornecido, calcule com base em `total` e itens por página (assumido como 10 aqui)
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: IPaginationProps) {
  const _total = Math.max(Math.trunc(total), 0);
  const _totalPages = totalPages;

  // A página ativa agora é controlada pela variável `activePage`
  const [activePage, setActivePage] = useUncontrolled({
    value: page,
    onChange,
    defaultValue: initialPage,
    finalValue: initialPage,
  });

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _totalPages) {
      setActivePage(_totalPages);
    } else {
      setActivePage(pageNumber);
    }
  };

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_totalPages);

  const paginationRange = useMemo((): (number | "dots")[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _totalPages) {
      return range(1, _totalPages);
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(
      activePage + siblings,
      _totalPages - boundaries,
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _totalPages - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_totalPages - (boundaries - 1), _totalPages),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(_totalPages - rightItemCount, _totalPages),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_totalPages - boundaries + 1, _totalPages),
    ];
  }, [siblings, boundaries, _totalPages, activePage]);

  return {
    range: paginationRange,
    active: activePage,  // Utilize `activePage` em vez de `paginaAtual`
    setPage,
    next,
    previous,
    first,
    last,
  };
}
