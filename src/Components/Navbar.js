import { MENU_ICON, MIC_ICON, NOTIFICATION_ICON, SEARCH_ICON, USER_ICON, YOUTUBE_LOGO } from "../constants/utils";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    return (
        <nav className = "flex gap-3 m-4">
            <div>
                <img className="h-6 w-6 cursor-pointer" src = {MENU_ICON} alt="Menu" onClick={toggleMenuHandler} />
            </div>
            <div className = "h-6 w-24 cursor-pointer"> 
                <Link to="/" onClick={() => document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img className="h-6 w-18" src = {YOUTUBE_LOGO} alt="YouTube Logo" />
                </Link>
            </div>

            <div className = "flex gap-0.5 ml-80">
                <input className="border border-gray-400 rounded-l-full px-4 py-2 w-96" type="text" placeholder="Search" />
                <button className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-r-full px-4 py-2 cursor-pointer">
                    <img className="h-6 w-6 mt-1 " src = {SEARCH_ICON} alt="Search" />
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-full px-4 py-2 cursor-pointer ml-6">
                    <img className="h-6 w-6 mt-1 " src = {MIC_ICON} alt="Microphone" />
                </button>
            </div>

            <div className = "flex items-center gap-4 ml-6">
                <button className="bg-gray-800 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded-full cursor-pointer ml-60">
                    +Create
                </button>
                <img className="h-8 w-8 cursor-pointer ml-2" src= {NOTIFICATION_ICON} alt="Notification" />
                <img className="h-8 w-8 cursor-pointer ml-2" src= {USER_ICON} alt="User" />
            </div>
        </nav>
    )
}
export default Navbar;