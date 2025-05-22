import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import type { FaultType, Severity } from "../types";


type AddNewDiagnosticProps = {
    onAddNew: (date: string, faultType: FaultType, severity: Severity) => void;
    onClose: () => void;
};

type Inputs = {
    date: string;
    faultType: string;
    severity: Severity;
};

export const AddNewDiagnostic = ({ onAddNew, onClose }: AddNewDiagnosticProps) => {
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        onAddNew(selectedDate, data.faultType as FaultType, data.severity as Severity);
        setLoading(false);
        onClose();
    }

    const handleCancel = () => {
        onClose();
        setShowDatePicker(false);
    }

    return (
        <div className="flex flex-col align-center items-center z-10 p-4 bg-white border rounded shadow-md fixed">
            <p>Add New Diagnostic</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center g-4 w-full">
                <div className="relative ml-2">
                    <button
                        type="button"
                        className="px-3 py-1 border rounded bg-white"
                        onClick={() => setShowDatePicker((prev) => !prev)}
                        disabled={loading}
                    >
                        {selectedDate ? selectedDate : "Select Date"}
                    </button>
                    {showDatePicker && (
                        <div className="absolute z-10 bg-white border rounded mt-1 p-2">
                            <input
                                {...register("date", { required: true })}
                                type="date"
                                className="p-1 border rounded"
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setShowDatePicker(false);
                                }}
                                disabled={loading}
                            />
                        </div>
                    )}
                </div>
                <div className="ml-2 flex flex-col">
                    <select
                        className="ml-2 px-3 py-1 border rounded bg-white"
                        disabled={loading}
                        {...register("faultType", { required: true })}
                    >
                        <option value="">Select Fault Type</option>
                        <option value="Bearing">Bearing</option>
                        <option value="Gear">Gear</option>
                        <option value="Motor">Motor</option>
                    </select>
                    {errors.faultType && <span>Fault Type is required</span>}
                </div>
                <div className="ml-2 flex flex-col">
                    <select
                        className="ml-2 px-3 py-1 border rounded bg-white"
                        disabled={loading}
                        {...register("severity", { required: true })}
                    >
                        <option value="">Select Severity</option>
                        <option value="Critical">Critical</option>
                        <option value="Alarm">Alarm</option>
                        <option value="Healthy">Healthy</option>
                    </select>
                    {errors.severity && <span>Severity is required</span>}
                </div>
                <div className="ml-2 flex flex-row">
                    <button
                        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        Save
                    </button>
                    <button
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}