export const Header = () => {
    return (
        <div className="flex fixed w-full items-center baseline bg-white p-4 pl-8 shadow-md shadow-gray-300/50 z-1000">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-cyan-400" />
            <div className="text-base font-bold rounded-b px-2">
                <span className="text-gray-900">Data</span>
                <span className="text-indigo-500">Mind</span>
                <span className="text-indigo-400"> AI</span>
            </div>
        </div>

    );
}