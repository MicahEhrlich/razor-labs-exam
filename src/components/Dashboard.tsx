import { useState } from "react";
import { mockData } from "../mockData";
import { AddNewDiagnostic } from "./AddNewDiagnostic";
import type { Diagonostic, FaultType, Severity } from "../types";
import { DiagonosticsChart } from "./DiagnosticsChart";
import { sortByDate } from "../utils";
import { DiagnosticsTable } from "./DiagnosticsTable";

const TIMEOUT = 1000;

export const Dashboard = () => {
    const [diagonostics, setDiagonostics] = useState<Diagonostic[]>(sortByDate((mockData as Diagonostic[])));
    const [loading, setLoading] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);

    const handleAddNew = (date: string, faultType: FaultType, severity: Severity) => {
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            const newDiagnostic = {
                id: Date.now(),
                date,
                faultType,
                severity,
            };
            const updatedDiagnostics = [...diagonostics, newDiagnostic];
            updatedDiagnostics.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setDiagonostics(updatedDiagnostics);
            setLoading(false);
        }, TIMEOUT);
    }


    const handleCloseAddNew = () => {
        setShowAddNew(false);
    }

    const handleShowAddNew = () => {
        setShowAddNew(true);
    }

    return (
        <div className="flex flex-col m-8">
            <DiagonosticsChart diagnostics={diagonostics} />
            <div className="flex flex-row items-center justify-between">
                <p className="font-medium text-2xl">Diagonostics</p>
                <button onClick={handleShowAddNew} className="bg-sky-500 px-4 py-2 rounded">
                    + Add New
                </button>
            </div>
            <div>
                {loading && (
                    <div className="flex flex-row align-center items-center ml-4">
                        <svg className="animate-spin h-5 w-5 text-sky-500" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"></path>
                        </svg>
                    </div>
                )}
            </div>
            {showAddNew && (
                <div className="mt-4">
                    <AddNewDiagnostic onAddNew={handleAddNew} onClose={handleCloseAddNew} />
                </div>
            )}
            <DiagnosticsTable diagonostics={diagonostics} />
        </div>
    );
}