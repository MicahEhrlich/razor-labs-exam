import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import type { FaultType, Severity } from "../types";
import { DiagnosticDatePicker } from "./DiagnosticDatePicker";


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
    const [dateError, setDateError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (!selectedDate) {
            setDateError(true);
        } else {
            setLoading(true);
            onAddNew(selectedDate, data.faultType as FaultType, data.severity as Severity);
            setLoading(false);
            onClose();
        }
    }

    const handleDateChange = (selectedDate: string) => {
        setSelectedDate(selectedDate);
        setDateError(false);
    }

    const handleCancel = () => {
        onClose();
        setShowDatePicker(false);
    }

    return (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <p className="text-lg font-semibold text-gray-900">Add new diagnostic</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <label className="block text-sm text-gray-500 mb-1">Diagnostic date</label>
                    <button
                        type="button"
                        className="w-full text-left text-gray-900 border-b border-gray-300 py-2 flex items-center justify-between"
                        onClick={() => setShowDatePicker((prev) => !prev)}
                        disabled={loading}
                    >
                        {selectedDate || "Select Date"}
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showDatePicker && (
                        <div className="absolute z-10 bg-white border rounded mt-1 p-2">
                            <DiagnosticDatePicker
                                selectedDate={selectedDate}
                                setSelectedDate={handleDateChange}
                                setShowDatePicker={setShowDatePicker}
                            />
                        </div>
                    )}
                    {dateError && (
                        <span className="text-red-500 text-sm mt-1 block">Diagnostic Date is required</span>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Fault type</label>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                        <select
                            className="w-full bg-transparent text-gray-900 appearance-none focus:outline-none"
                            disabled={loading}
                            {...register("faultType", { required: true })}
                        >
                            <option value="">Select Fault Type</option>
                            <option value="Bearing">Bearing</option>
                            <option value="Gear">Gear</option>
                            <option value="Motor">Motor</option>
                        </select>
                        <svg className="w-4 h-4 text-gray-600 shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {errors.faultType && (
                        <span className="text-red-500 text-sm mt-1 block">Fault Type is required</span>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Severity</label>
                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                        <select
                            className="w-full bg-transparent text-gray-900 appearance-none focus:outline-none"
                            disabled={loading}
                            {...register("severity", { required: true })}
                        >
                            <option value="">Select Severity</option>
                            <option value="Critical">Critical</option>
                            <option value="Alarm">Alarm</option>
                            <option value="Healthy">Healthy</option>
                        </select>
                        <svg className="w-4 h-4 text-gray-600 shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {errors.severity && (
                        <span className="text-red-500 text-sm mt-1 block">Severity is required</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border [border-color:#b1b9c3] text-gray-900"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-[#7071f3] text-white"
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>

    );
}