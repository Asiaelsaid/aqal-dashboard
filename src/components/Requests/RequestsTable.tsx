interface TableHeader {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface TableRow {
  [key: string]: string | JSX.Element;
}

interface TableProps {
  headers: TableHeader[];
  rows: TableRow[];
}

const RequestsTable: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              className={`py-3 px-4 border border-gray-300 text-sm font-semibold ${
                header.align === "center"
                  ? "text-center"
                  : header.align === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className={`bg-white ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
            {headers.map((header) => (
              <td
                key={header.key}
                className={`py-3 px-4 border border-gray-300 text-sm ${
                  header.align === "center"
                    ? "text-center"
                    : header.align === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
