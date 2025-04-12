import { flexRender, Table as TableType } from "@tanstack/react-table";

type ITableProps<TData = unknown> = {
  table: TableType<TData>;
};

export function Table<TData = unknown>({ table }: ITableProps<TData>) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-md border border-neutral-200 bg-white md:block">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="text-left">
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
              <tr key={row.id} className="*:px-4 *:py-3 *:whitespace-nowrap">
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

      <div className="block space-y-6 md:hidden">
        {table.getRowModel().rows.map((row) => (
          <ul
            key={row.id}
            className="rounded-md border border-neutral-200 bg-white py-1 *:px-4 *:py-1"
          >
            {row.getVisibleCells().map((cell) => (
              <li key={cell.id}>
                <b>
                  {flexRender(cell.column.columnDef.header, {
                    ...cell.getContext(),
                    header: table
                      .getFlatHeaders()
                      .find(
                        (header) => header.id === cell.column.columnDef.id,
                      )!,
                  })}
                </b>
                : {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
}
