import Navbar from "../../Components/Navbar"
import SideBar from "../../Components/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
    return(
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div id="main-scroll-container" className="flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Home;