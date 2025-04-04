export function Table() {
  return (
    <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="text-left">
          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <th>Name</th>
            <th>DoB</th>
            <th>Role</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200">
          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <td>Nandor the Relentless</td>
            <td>04/06/1262</td>
            <td>Vampire Warrior</td>
            <td>$0</td>
          </tr>

          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <td>Laszlo Cravensworth</td>
            <td>19/10/1678</td>
            <td>Vampire Gentleman</td>
            <td>$0</td>
          </tr>

          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <td>Nadja</td>
            <td>15/03/1593</td>
            <td>Vampire Seductress</td>
            <td>$0</td>
          </tr>

          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <td>Colin Robinson</td>
            <td>01/09/1971</td>
            <td>Energy Vampire</td>
            <td>$53,000</td>
          </tr>

          <tr className="*:px-3 *:py-2 *:whitespace-nowrap">
            <td>Guillermo de la Cruz</td>
            <td>18/11/1991</td>
            <td>Familiar/Vampire Hunter</td>
            <td>$0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
