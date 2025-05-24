import type { Diagnostic } from "../types";

type DiagnosticsTableProps = {
    diagnostics: Diagnostic[];
};

export const DiagnosticsTable = ({ diagnostics }: DiagnosticsTableProps) => {
    return (
        <div className="overflow-hidden rounded-xl shadow border mt-4 border-gray-200 bg-white">
            <table className="w-full px-2 text-sm bg-gray-100 border-separate border-spacing-y-2">
                <thead className="bg-gray-100 text-left text-gray-600 font-medium">
                    <tr>
                        <th className="px-6 py-3">Diagnostic date</th>
                        <th className="px-6 py-3">Fault type</th>
                        <th className="px-6 py-3">Severity</th>
                    </tr>
                </thead>
                <tbody className="text-gray-900 bg-gray-100">
                    {diagnostics.map((item) => (
                        <tr
                            key={item.id}
                            className="bg-white rounded-lg shadow-sm"
                        >
                            <td className="px-6 py-4 rounded-l-xl">{item.date}</td>
                            <td className="px-6 py-4">{item.faultType}</td>
                            <td className="px-6 py-4 rounded-r-xl">{item.severity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}