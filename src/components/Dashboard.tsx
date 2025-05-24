import { useState } from "react";
import { mockData } from "../mockData";
import { AddNewDiagnostic } from "./AddNewDiagnostic";
import { type Diagnostic, type FaultType, type Severity } from "../types";
import { DiagnosticsChart } from "./DiagnosticsChart";
import { sortByDateAndSeverity } from "../utils";
import { DiagnosticsTable } from "./DiagnosticsTable";


export const Dashboard = () => {
    const [diagnostics, setdiagnostics] = useState<Diagnostic[]>(sortByDateAndSeverity((mockData as Diagnostic[])));
    const [showAddNew, setShowAddNew] = useState(false);

    const handleAddNew = (date: string, faultType: FaultType, severity: Severity) => {
        const newDiagnostic = {
            id: Date.now(),
            date,
            faultType,
            severity,
        };
        const updatedDiagnostics = [...diagnostics, newDiagnostic];
        const diagnosticsSortedByDateAndSeverity = sortByDateAndSeverity(updatedDiagnostics);
        setdiagnostics(diagnosticsSortedByDateAndSeverity);
    }

    const handleCloseAddNew = () => {
        setShowAddNew(false);
    }

    const handleShowAddNew = () => {
        setShowAddNew(true);
    }

    return (
        <>
            <div className="flex flex-col m-8 mt-22">
                <DiagnosticsChart diagnostics={diagnostics} />
                <div className="flex flex-row items-center justify-between">
                    <p className="font-medium text-2xl">Diagnostics</p>
                    <button onClick={handleShowAddNew} className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg bg-[#7071f3] text-white"
                    >
                        + Add New
                    </button>
                </div>
                {showAddNew && (
                    <AddNewDiagnostic onAddNew={handleAddNew} onClose={handleCloseAddNew} />
                )}
                <DiagnosticsTable diagnostics={diagnostics} />
            </div>
        </>
    );
}