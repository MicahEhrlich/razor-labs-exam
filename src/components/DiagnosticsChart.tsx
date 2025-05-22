import type { ScatterPointItem } from "recharts/types/cartesian/Scatter";
import type { Diagonostic, Severity } from "../types";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";


type DiagnosticsChartProps = {
    diagnostics: Diagonostic[];
};

const severityToColor: Record<Severity, string> = {
    Critical: 'red',
    Alarm: 'orange',
    Healthy: 'green',
};


const severityRank: Record<Severity, number> = {
    Critical: 3,
    Alarm: 2,
    Healthy: 1,
};

const MAX_DAYS = 14;

export const DiagonosticsChart = ({ diagnostics }: DiagnosticsChartProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const filteredByDate = Object.values(
        diagnostics.reduce<Record<string, Diagonostic>>((acc, item) => {
            const existing = acc[item.date];
            if (!existing || severityRank[item.severity] > severityRank[existing.severity]) {
                acc[item.date] = item;
            }
            return acc;
        }, {})
    );

    const processedData = filteredByDate.map((item) => ({
        ...item,
        severityValue: 4 - severityRank[item.severity], // High = 1
        color: severityToColor[item.severity],
    })).slice(0, MAX_DAYS);

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

    return (
        <div className="chart-container">
            <div className="relative ml-2">
                <button
                    type="button"
                    className="px-3 py-1 border rounded bg-white"
                    onClick={() => setShowDatePicker((prev) => !prev)}
                >
                    {selectedDate ? selectedDate : "Select Date"}
                </button>
                {showDatePicker && (
                    <div className="absolute z-10 bg-white border rounded mt-1 p-2">
                        <input
                            type="date"
                            className="p-1 border rounded"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setShowDatePicker(false);
                            }}
                        />
                    </div>
                )}
            </div>
            <ResponsiveContainer width="100%" height={300}>
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
                        formatter={(value, name) => {
                            if (name === 'severityValue') {
                                return Object.entries(severityRank).find(([, v]) => 4 - v === value)?.[0];
                            }
                            return value;
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