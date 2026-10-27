import { useEffect, useState, useMemo } from "react";
import { YOUTUBE_API } from "../constants/apiLinks";
import { MOCK_VIDEOS } from "../constants/mockVideos";
import ActualVideo from "./ActualVideo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
    const [allVideos, setAllVideos] = useState(MOCK_VIDEOS);
    const selectedCategory = useSelector((store) => store.app.selectedCategory);
    const searchQuery = useSelector((store) => store.app.searchQuery);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        if (!YOUTUBE_API) {
            // No API key configured - catalogue is already safely loaded with zero network errors
            return;
        }

        try {
            const data = await fetch(YOUTUBE_API);
            if (!data.ok) throw new Error("YouTube API status " + data.status);
            const json = await data.json();
            if (Array.isArray(json?.items) && json.items.length > 0) {
                setAllVideos(json.items);
            }
        } catch (err) {
            console.warn("YouTube API fallback:", err.message);
            setAllVideos(MOCK_VIDEOS);
        }
    };

    const filteredVideos = useMemo(() => {
        let result = allVideos;

        if (searchQuery && searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter((video) => {
                const title = video?.snippet?.title?.toLowerCase() || "";
                const channel = video?.snippet?.channelTitle?.toLowerCase() || "";
                const desc = video?.snippet?.description?.toLowerCase() || "";
                return title.includes(query) || channel.includes(query) || desc.includes(query);
            });
        } else if (selectedCategory && selectedCategory !== "All") {
            const cat = selectedCategory.toLowerCase();
            result = result.filter((video) => {
                const title = video?.snippet?.title?.toLowerCase() || "";
                const channel = video?.snippet?.channelTitle?.toLowerCase() || "";
                const category = video?.snippet?.category?.toLowerCase() || "";
                return category.includes(cat) || title.includes(cat) || channel.includes(cat);
            });
        }

        return result;
    }, [allVideos, searchQuery, selectedCategory]);

    if (filteredVideos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 text-center text-gray-500 w-full">
                <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700">No videos found</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Try searching for something else or explore different categories.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 w-full">
                {filteredVideos.map((video) => {
                    const videoId = typeof video.id === "object" ? video.id.videoId : video.id;
                    return (
                        <Link
                            key={videoId || Math.random()}
                            to={"/watch?v=" + videoId}
                            className="no-underline text-inherit block"
                        >
                            <ActualVideo data={video} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default VideoContainer;