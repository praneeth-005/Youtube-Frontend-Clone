import { useDispatch, useSelector } from "react-redux";
import { HAMBURGER_MENU, USER_ICON, YT_LOGO } from "../constants/images";
import { toggleMenu, setSearchQuery, setSelectedCategory } from "../utils/appSlice";
import { useEffect, useState, useRef } from "react";
import { YOUTUBE_SEARCH_API } from "../constants/apiLinks";
import { POPULAR_SEARCH_SUGGESTIONS } from "../constants/mockVideos";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentSearchQuery = useSelector((store) => store.app.searchQuery);
    const [searchText, setSearchText] = useState(currentSearchQuery || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef(null);

    useEffect(() => {
        setSearchText(currentSearchQuery || "");
    }, [currentSearchQuery]);

    useEffect(() => {
        if (!searchText.trim()) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            getSuggestions(searchText);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchText]);

    const getSuggestions = async (query) => {
        if (!query || !query.trim()) {
            setSuggestions([]);
            return;
        }

        if (YOUTUBE_SEARCH_API) {
            try {
                const data = await fetch(YOUTUBE_SEARCH_API + encodeURIComponent(query));
                if (data.ok) {
                    const json = await data.json();
                    if (Array.isArray(json) && Array.isArray(json[1])) {
                        setSuggestions(json[1]);
                        return;
                    }
                }
            } catch (err) {
                // fall back to local suggestions
            }
        }

        const filtered = POPULAR_SEARCH_SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length > 0) {
            setSuggestions(filtered);
        } else {
            setSuggestions([
                query,
                `${query} tutorial`,
                `${query} 2026`,
                `best of ${query}`
            ]);
        }
    };

    const handleSearch = (queryToSearch) => {
        const query = (queryToSearch !== undefined ? queryToSearch : searchText).trim();
        dispatch(setSearchQuery(query));
        dispatch(setSelectedCategory("All"));
        setShowSuggestions(false);
        navigate("/");
    };

    const handleResetHome = () => {
        dispatch(setSearchQuery(""));
        dispatch(setSelectedCategory("All"));
        setSearchText("");
        setShowSuggestions(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 px-4 h-14 flex items-center justify-between">
            {/* Left section: Hamburger & YouTube Logo */}
            <div className="flex items-center gap-4 min-w-[170px]">
                <button
                    onClick={() => dispatch(toggleMenu())}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    title="Guide"
                    aria-label="Toggle navigation"
                >
                    <img
                        className="h-4 w-4"
                        alt="Menu"
                        src={HAMBURGER_MENU}
                    />
                </button>

                <Link
                    to="/"
                    onClick={handleResetHome}
                    className="flex items-center gap-1 cursor-pointer"
                    title="YouTube Home"
                >
                    <img
                        className="h-5 object-contain"
                        alt="YouTube Logo"
                        src={YT_LOGO}
                    />
                </Link>
            </div>

            {/* Center section: Search Bar & Mic */}
            <div className="flex-1 max-w-[660px] px-2 flex items-center justify-center relative" ref={searchContainerRef}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                    className="flex items-center w-full"
                >
                    <div className="relative flex-1 flex items-center">
                        <input
                            className="w-full h-10 border border-gray-300 focus:border-blue-500 pl-4 pr-9 rounded-l-full outline-none text-sm text-gray-900 transition-colors shadow-none"
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => {
                                setTimeout(() => setShowSuggestions(false), 200);
                            }}
                        />
                        {searchText && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchText("");
                                    dispatch(setSearchQuery(""));
                                }}
                                className="absolute right-3 text-gray-400 hover:text-gray-600 text-base cursor-pointer"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="h-10 px-6 border border-l-0 border-gray-300 rounded-r-full bg-[#f8f8f8] hover:bg-[#f0f0f0] text-gray-700 transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
                        title="Search"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

                {/* Voice Search Button */}
                <button
                    type="button"
                    className="w-10 h-10 ml-3 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] flex items-center justify-center text-gray-800 cursor-pointer transition-colors flex-shrink-0 hidden sm:flex"
                    title="Search with your voice"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                </button>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-2 right-14 top-11 bg-white border border-gray-200 shadow-xl py-2 rounded-2xl z-50 mt-1 overflow-hidden">
                        <ul>
                            {suggestions.map((s, index) => (
                                <li
                                    key={index}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        setSearchText(s);
                                        handleSearch(s);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-sm text-gray-800 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="truncate">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right section: Create, Notifications, Profile */}
            <div className="flex items-center gap-2 min-w-[170px] justify-end">
                <button
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    title="Create"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <button
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    title="Notifications"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer ring-1 ring-gray-200 ml-1">
                    <img
                        className="h-full w-full object-cover"
                        alt="User Profile"
                        src={USER_ICON}
                    />
                </div>
            </div>
        </header>
    );
};

export default Head;