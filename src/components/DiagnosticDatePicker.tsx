type DiagnosticDatePickerProps = {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    setShowDatePicker: (show: boolean) => void;
};
export const DiagnosticDatePicker = ({ selectedDate, setSelectedDate, setShowDatePicker }: DiagnosticDatePickerProps) => {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setShowDatePicker(false);
    }

    return (
        <input
            type="date"
            className="p-1 border rounded"
            value={selectedDate}
            onChange={handleDateChange}
        />
    );
}