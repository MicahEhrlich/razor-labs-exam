import { Dashboard } from "../Dashboard"
import { Header } from "./Header"
import { SideBar } from "./Sidebar"

export const DashboardLayout = () => {
    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="flex flex-col  w-full h-screen ml-16">
                <Header />
                <Dashboard />
            </div>
        </div>
    );
}