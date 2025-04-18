import { ACTIONS_COLUMN_ID } from "@/presentation/constants/tableColumnIds";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo } from "react";

type ITableProps<TData = unknown> = {
  table: TableType<TData>;
  title?: React.ReactNode;
};

export function Table<TData = unknown>({ table, title }: ITableProps<TData>) {
  const isHeaderVisible = title != null;

  const mustRenderActionsColumn = useMemo(
    () =>
      table._getColumnDefs().some((column) => column.id === ACTIONS_COLUMN_ID),
    [table],
  );

  return (
    <>
      <div className="hidden overflow-x-auto rounded-md border border-neutral-200 bg-white md:block">
        {isHeaderVisible && (
          <div className="px-3 py-3 md:px-5 md:py-4">
            <h2>{title}</h2>
          </div>
        )}

        <table className="min-w-full divide-y divide-neutral-200">
          <thead className={clsx("text-left", isHeaderVisible && "border-t")}>
            <tr className="*:px-4 *:py-3 *:whitespace-nowrap">
              {table.getFlatHeaders().map((header) =>
                header.isPlaceholder ? null : (
                  <th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="*:px-4 *:py-3 *:whitespace-nowrap hover:bg-violet-50"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {isHeaderVisible && (
          <div className="px-3 py-3 md:px-5 md:py-4">
            <h2>
              <b>{title}</b>
            </h2>
          </div>
        )}

        <div className="space-y-6">
          {table.getRowModel().rows.map((row) => (
            <div
              className="flex rounded-md border border-neutral-200 bg-white py-1"
              key={row.id}
            >
              <ul className="grow *:px-4 *:py-1">
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.columnDef.id === ACTIONS_COLUMN_ID) {
                    return null;
                  }
                  return (
                    <li key={cell.id}>
                      <b>
                        {flexRender(cell.column.columnDef.header, {
                          ...cell.getContext(),
                          header: table
                            .getFlatHeaders()
                            .find(
                              (header) =>
                                header.id === cell.column.columnDef.id,
                            )!,
                        })}
                      </b>
                      :{" "}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </li>
                  );
                })}
              </ul>

              {mustRenderActionsColumn && (
                <div className="flex items-center px-4 py-1">
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id !== ACTIONS_COLUMN_ID) {
                      return null;
                    }
                    return flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
