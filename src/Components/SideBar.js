import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory, setSearchQuery } from "../utils/appSlice";

const SideBar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    const selectedCategory = useSelector((store) => store.app.selectedCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isMenuOpen) return null;

    const handleCategoryClick = (category) => {
        dispatch(setSelectedCategory(category));
        dispatch(setSearchQuery(""));
        navigate("/");
    };

    const getItemClass = (name) => {
        const isActive = (name === "Home" && selectedCategory === "All") || (selectedCategory === name);
        return `yt-sidebar-item ${isActive ? "yt-sidebar-item-active" : ""}`;
    };

    const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M12 4.44l7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32l-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>;
    const ShortsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.06 1.42.94 2.66 2.23 3.19.77.32 1.2.5 1.2.5L6 14.94c-1.84.96-2.53 3.23-1.56 5.06s3.24 2.53 5.07 1.56L18 17.06c1.29-.68 2.07-2.04 2-3.49-.06-1.42-.94-2.66-2.23-3.19z"></path></svg>;
    const SubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg>;
    const LiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></svg>;

    const MusicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></svg>;
    const SportsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>;
    const GamingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M21 6H3v12h18V6zm-6.5 7h-1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-1c-.55 0-1-.45-1-1s.45-1 1-1h1v-1c0-.55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1s-.45 1-1 1zm-5.5-2h-1v-1c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg>;
    const NewsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0-4h10v2H7zm0 8h10v2H7z"></path></svg>;

    return (
        <aside className="w-[240px] min-w-[240px] h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto bg-white border-r border-gray-200 pb-8 flex-shrink-0 no-scrollbar">
            <ul className="py-2 border-b border-gray-200 list-none">
                <li
                    className={getItemClass("Home")}
                    onClick={() => handleCategoryClick("All")}
                >
                    <span className="yt-sidebar-icon"><HomeIcon /></span>
                    <span>Home</span>
                </li>
                <li className={getItemClass("Shorts")}>
                    <span className="yt-sidebar-icon"><ShortsIcon /></span>
                    <span>Shorts</span>
                </li>
                <li className={getItemClass("Subscriptions")}>
                    <span className="yt-sidebar-icon"><SubIcon /></span>
                    <span>Subscriptions</span>
                </li>
            </ul>

            <h3 className="font-semibold text-xs pt-4 pb-2 px-6 text-gray-500 uppercase tracking-wider">Explore</h3>
            <ul className="pb-2 border-b border-gray-200 list-none">
                <li className={getItemClass("Music")} onClick={() => handleCategoryClick("Music")}>
                    <span className="yt-sidebar-icon"><MusicIcon /></span>
                    <span>Music</span>
                </li>
                <li className={getItemClass("Gaming")} onClick={() => handleCategoryClick("Gaming")}>
                    <span className="yt-sidebar-icon"><GamingIcon /></span>
                    <span>Gaming</span>
                </li>
                <li className={getItemClass("News")} onClick={() => handleCategoryClick("News")}>
                    <span className="yt-sidebar-icon"><NewsIcon /></span>
                    <span>News</span>
                </li>
                <li className={getItemClass("Sports")} onClick={() => handleCategoryClick("Sports")}>
                    <span className="yt-sidebar-icon"><SportsIcon /></span>
                    <span>Sports</span>
                </li>
            </ul>

            <h3 className="font-semibold text-xs pt-4 pb-2 px-6 text-gray-500 uppercase tracking-wider">Subscriptions</h3>
            <ul className="pb-2 list-none">
                <li className={getItemClass("Education")} onClick={() => handleCategoryClick("Education")}>
                    <span className="yt-sidebar-icon"><SubIcon /></span>
                    <span>Coding & Tech</span>
                </li>
                <li className={getItemClass("Cricket")} onClick={() => handleCategoryClick("Cricket")}>
                    <span className="yt-sidebar-icon"><SportsIcon /></span>
                    <span>Cricket Highlights</span>
                </li>
                <li className={getItemClass("Cooking")} onClick={() => handleCategoryClick("Cooking")}>
                    <span className="yt-sidebar-icon"><SubIcon /></span>
                    <span>Street Food</span>
                </li>
            </ul>
        </aside>
    );
};

export default SideBar;