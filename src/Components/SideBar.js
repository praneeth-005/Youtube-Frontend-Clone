import React from "react";
import { useSelector } from "react-redux";
import { 
  HomeIcon, ShortsIcon, SubscriptionsIcon, 
  HistoryIcon, PlaylistsIcon, VideosIcon, 
  WatchLaterIcon, LikeIcon 
} from "../constants/icons";
import { Link } from "react-router-dom";

const SideBarItem = ({ icon, label, isActive, to }) => {
  const content = (
    <div className={`flex items-center py-2 px-3 mx-3 my-0.5 rounded-lg cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-bold' : ''}`}>
      <div className="mr-6 text-gray-900">
        {icon}
      </div>
      <span className="text-sm truncate text-gray-900">{label}</span>
    </div>
  );

  if (to) {
    return (
      <Link 
        to={to} 
        className="block" 
        onClick={() => {
          if (to === '/') {
            document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        {content}
      </Link>
    );
  }
  return content;
};

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="w-[240px] h-full overflow-y-auto pb-4 custom-scrollbar">
      <div className="border-b border-gray-200 pb-3 pt-2">
        <SideBarItem icon={<HomeIcon />} label="Home" isActive={true} to="/" />
        <SideBarItem icon={<ShortsIcon />} label="Shorts" />
        <SideBarItem icon={<SubscriptionsIcon />} label="Subscriptions" />
      </div>
      
      <div className="border-b border-gray-200 py-3">
        <div className="flex items-center px-3 mx-3 mb-1 cursor-pointer rounded-lg hover:bg-gray-100 py-1">
            <span className="font-semibold text-base">You</span>
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" focusable="false" style={{ pointerEvents: "none", display: "block" }}>
              <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z" fill="currentColor"></path>
            </svg>
        </div>
        <SideBarItem icon={<HistoryIcon />} label="History" />
        <SideBarItem icon={<PlaylistsIcon />} label="Playlists" />
        <SideBarItem icon={<VideosIcon />} label="Your videos" />
        <SideBarItem icon={<WatchLaterIcon />} label="Watch later" />
        <SideBarItem icon={<LikeIcon />} label="Liked videos" />
      </div>

      <div className="py-3 px-6 text-sm text-gray-500 font-semibold border-b border-gray-200">
        Subscriptions
      </div>

      <div className="py-4 px-6 text-xs text-gray-500 font-medium leading-5">
        <p>About Press Copyright Contact us Creators Advertise Developers</p>
        <br />
        <p>Terms Privacy Policy & Safety How YouTube works Test new features</p>
        <br />
        <p className="text-gray-400 font-normal">© 2026 Google LLC</p>
      </div>
    </div>
  );
};

export default SideBar;