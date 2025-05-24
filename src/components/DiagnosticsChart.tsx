import type { ScatterPointItem } from "recharts/types/cartesian/Scatter";
import { BsGraphUp } from "react-icons/bs";
import { severityRank, type Diagnostic, type Severity } from "../types";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo, useState } from "react";
import { getEarliestDate, sortByDate } from "../utils";
import { DiagnosticDatePicker } from "./DiagnosticDatePicker";

type DiagnosticsChartProps = {
    diagnostics: Diagnostic[];
};

const severityToColor: Record<Severity, string> = {
    Critical: 'red',
    Alarm: 'orange',
    Healthy: 'green',
};

const MAX_DAYS = 14;

export const DiagnosticsChart = ({ diagnostics }: DiagnosticsChartProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getEarliestDate(diagnostics));

    const filteredByDate = Object.values(
        diagnostics.reduce<Record<string, Diagnostic>>((acc, item) => {
            const existing = acc[item.date];
            if (!existing || severityRank[item.severity] > severityRank[existing.severity]) {
                acc[item.date] = item;
            }
            return acc;
        }, {})
    );

    const filteredBySelectedDate = filteredByDate.filter(item => item.date >= selectedDate);

    const processedData = useMemo(
        () =>
            sortByDate(filteredBySelectedDate, true).map((item) => ({
                ...item,
                severityValue: 4 - severityRank[item.severity],
                color: severityToColor[item.severity],
            })).slice(0, MAX_DAYS),
        [filteredBySelectedDate]
    );

    const renderColoredDot = ({ cx, cy, payload }: ScatterPointItem) => {
        return (
            <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={payload.color}
                stroke="black"
                strokeWidth={1}
            />
        );
    };

    const handleDateChange = (selectedDate: string) => {
        if (!selectedDate) {
            setSelectedDate(getEarliestDate(diagnostics));
            return;
        }
        setSelectedDate(selectedDate);
    }

    return (
        <div className="p-2 bg-gray-100 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between px-4 pt-2 pb-4">
                <span className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
                    <BsGraphUp className="w-4 h-4 text-[#0f172a]" />
                    Fusion trend
                </span>
                <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md bg-white text-sm text-[#0f172a]"
                    onClick={() => setShowDatePicker((prev) => !prev)}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                    {`From ${selectedDate ? selectedDate : 'Select Date'}`}
                </button>
                {showDatePicker && (
                    <div className="z-100 absolute right-18 top-35 bg-white border mt-1 p-2">
                        <DiagnosticDatePicker
                            selectedDate={selectedDate}
                            setSelectedDate={handleDateChange}
                            setShowDatePicker={setShowDatePicker}
                        />
                    </div>
                )}
            </div>
            <ResponsiveContainer width="100%" height={300} className={"bg-white rounded-md"}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis dataKey="date" name="Date" />
                    <YAxis
                        dataKey="severityValue"
                        name="Severity"
                        tickFormatter={(val) => {
                            const found = Object.entries(severityRank).find(([, v]) => 4 - v === val)?.[0];
                            return found ?? '';
                        }}
                    />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length > 0) {
                                const { faultType } = payload[0].payload;
                                return (
                                    <div className="bg-white border border-gray-300 rounded-[10px] p-2">
                                        {faultType}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Scatter
                        data={processedData}
                        shape={renderColoredDot}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div >
    );
}