import { useState } from "react";

interface ComparisonTableProps {
  headers: string[];
  rows: { aspect: string }[];
}

const ComparisonTable = ({ headers, rows }: ComparisonTableProps) => {
  const [cells, setCells] = useState<Record<string, string>>({});

  const handleChange = (rowIdx: number, colIdx: number, value: string) => {
    setCells((prev) => ({ ...prev, [`${rowIdx}-${colIdx}`]: value }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead>
          <tr className="bg-primary/5">
            {headers.map((h, i) => (
              <th key={i} className="p-3 font-display text-lg font-semibold text-left border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="p-3 font-body text-lg font-medium">{row.aspect}</td>
              {headers.slice(1).map((_, ci) => (
                <td key={ci} className="p-2">
                  <textarea
                    value={cells[`${ri}-${ci}`] || ""}
                    onChange={(e) => handleChange(ri, ci, e.target.value)}
                    placeholder="Write here..."
                    className="w-full p-2 rounded-lg border bg-background font-body text-lg resize-none min-h-[60px] focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
