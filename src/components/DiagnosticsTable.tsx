import type { Diagonostic } from "../types";

type DiagnosticsTableProps = {
    diagonostics: Diagonostic[];
};

export const DiagnosticsTable = ({diagonostics}: DiagnosticsTableProps) => {
    return (
        <table className="min-w-full mt-6 border border-gray-200 rounded">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left font-semibold">Diagnostic Date</th>
                        <th className="px-4 py-2 text-left font-semibold">Fault Type</th>
                        <th className="px-4 py-2 text-left font-semibold">Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {diagonostics.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-t">{item.date}</td>
                            <td className="px-4 py-2 border-t">{item.faultType}</td>
                            <td className="px-4 py-2 border-t">{item.severity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}