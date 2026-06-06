import { MENU_ICON, MIC_ICON, NOTIFICATION_ICON, SEARCH_ICON, USER_ICON, YOUTUBE_LOGO } from "../constants/utils";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        // Debounce: wait for 200ms after the user stops typing
        const timer = setTimeout(() => {
            if (searchQuery) {
                getSearchSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 200);

        return () => {
            // Decline the API call if the user types within 200ms
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        try {
            const data = await fetch(YOUTUBE_SEARCH_API(searchQuery));
            const json = await data.json();
            // Get at least 8 suggestions by extracting the video titles from search results
            const fetchedSuggestions = json.items?.map(item => item.snippet.title).slice(0, 8) || [];
            setSuggestions(fetchedSuggestions);
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
    };

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        navigate(`/search?q=${suggestion}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            navigate(`/search?q=${searchQuery.trim()}`);
        }
    };

    return (
        <nav className="flex justify-between items-center m-4 px-4">
            <div className="flex gap-4 items-center">
                <img className="h-6 w-6 cursor-pointer" src={MENU_ICON} alt="Menu" onClick={toggleMenuHandler} />
                <Link to="/" onClick={() => document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img className="h-5 md:h-6 cursor-pointer" src={YOUTUBE_LOGO} alt="YouTube Logo" />
                </Link>
            </div>

            <div className="flex flex-col flex-1 items-center relative mx-4 lg:mx-20">
                <div className="flex w-full max-w-[600px] items-center">
                    <form onSubmit={handleSearch} className="flex w-full items-center">
                        <input
                            className="border border-gray-400 rounded-l-full px-5 py-2.5 w-full focus:outline-none focus:border-blue-500 shadow-inner"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        <button type="submit" className="bg-gray-100 hover:bg-gray-200 border border-gray-400 border-l-0 rounded-r-full px-5 py-2.5 cursor-pointer">
                            <img className="h-5 w-5 opacity-70" src={SEARCH_ICON} alt="Search" />
                        </button>
                    </form>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-transparent rounded-full p-2.5 ml-4 cursor-pointer hidden sm:block">
                        <img className="h-5 w-5 opacity-80" src={MIC_ICON} alt="Microphone" />
                    </button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[3.2rem] bg-white py-3 px-2 w-full max-w-[550px] shadow-xl rounded-xl border border-gray-200 z-50 text-left mr-14">
                        <ul>
                            {suggestions.map((s, index) => (
                                <li
                                    key={index}
                                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded flex gap-4 items-center"
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    <img className="h-4 w-4 opacity-50" src={SEARCH_ICON} alt="search" />
                                    <span className="font-medium text-gray-800 line-clamp-1">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="hidden md:block bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-full cursor-pointer">
                    + Create
                </button>
                <img className="h-6 w-6 cursor-pointer ml-2 opacity-80" src={NOTIFICATION_ICON} alt="Notification" />
                <img className="h-8 w-8 cursor-pointer ml-4 rounded-full" src={USER_ICON} alt="User" />
            </div>
        </nav>
    );
};

export default Navbar;