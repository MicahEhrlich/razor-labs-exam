import { FaIndustry, FaUser, FaBell, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

export const SideBar = () => {
    return (
        <div className="fixed h-screen w-16 bg-[#2e2f6e] flex flex-col items-center justify-between py-4">
            <div className="flex flex-col items-center gap-8">
                <div className="bg-cyan-300 text-black p-3 rounded-full">
                    <FaIndustry />
                </div>
                <div className="flex flex-col gap-8">
                    <FaUser className="text-white" />
                    <FaBell className="text-white" />
                    <FaFileAlt className="text-white" />
                    <FaCog className="text-white" />
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 mb-2">
                <FaSignOutAlt className="text-white" />
                <div className="bg-indigo-400 text-white font-bold text-md p-2 rounded-full">
                    EG
                </div>
            </div>
        </div>
    );
}
