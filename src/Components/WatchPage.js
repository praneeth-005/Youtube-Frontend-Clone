import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams, Link } from "react-router-dom";
import { MOCK_VIDEOS } from "../constants/mockVideos";

const WatchPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v") || "Ke90Tje7VS0";

    const [isLiked, setIsLiked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [comments, setComments] = useState([
        { id: 1, user: "Alex Developer", text: "Incredible explanation! This helped me understand everything in under 5 minutes.", time: "2 days ago", likes: 45 },
        { id: 2, user: "Sarah Tech", text: "The quality and pacing are top notch. Subscribed immediately!", time: "1 week ago", likes: 21 },
        { id: 3, user: "Coding Enthusiast", text: "React 19 features look so clean. Thanks for this video!", time: "3 weeks ago", likes: 12 }
    ]);
    const [newComment, setNewComment] = useState("");

    // Find video info from mock videos or create generic info
    const currentVideo = MOCK_VIDEOS.find((v) => v.id === videoId) || {
        snippet: {
            title: "Featured Video Presentation",
            channelTitle: "YouTube Creator Hub",
            description: "Welcome to this featured stream. Enjoy high definition playback and explore more recommended videos on the sidebar."
        },
        statistics: {
            viewCount: "1250000",
            likeCount: "48000"
        }
    };

    const relatedVideos = MOCK_VIDEOS.filter((v) => v.id !== videoId);

    useEffect(() => {
        dispatch(closeMenu());
        window.scrollTo(0, 0);
    }, [videoId, dispatch]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setComments([
            {
                id: Date.now(),
                user: "You",
                text: newComment.trim(),
                time: "Just now",
                likes: 0
            },
            ...comments
        ]);
        setNewComment("");
    };

    return (
        <div className="flex-1 max-w-[1700px] mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6 w-full">
            {/* Main Video & Comments Column */}
            <div className="flex-1 w-full max-w-[1100px]">
                {/* Responsive Iframe Container */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={currentVideo.snippet.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                {/* Video Info Header */}
                <div className="mt-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#0f0f0f]">
                        {currentVideo.snippet.title}
                    </h1>

                    {/* Actions and Channel Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-3 border-b border-gray-200">
                        {/* Channel details & Subscribe */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-sm">
                                {currentVideo.snippet.channelTitle?.charAt(0) || "Y"}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm sm:text-base text-[#0f0f0f]">
                                    {currentVideo.snippet.channelTitle}
                                </h4>
                                <span className="text-xs text-gray-500">1.42M subscribers</span>
                            </div>
                            <button
                                onClick={() => setIsSubscribed(!isSubscribed)}
                                className={`ml-4 ${isSubscribed ? "yt-btn-pill" : "yt-btn-pill yt-btn-dark"}`}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>

                        {/* Likes & Share Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`yt-btn-pill ${isLiked ? "!bg-red-50 !text-red-600 border border-red-200" : ""}`}
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                </svg>
                                <span>{isLiked ? "Liked" : "Like"}</span>
                            </button>
                            <button className="yt-btn-pill">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-gray-100 hover:bg-gray-200/80 rounded-xl p-4 mt-4 transition-colors cursor-pointer text-sm">
                        <div className="font-semibold text-gray-800 mb-1">
                            {Number(currentVideo.statistics?.viewCount || 100000).toLocaleString()} views
                        </div>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {currentVideo.snippet.description || "No description provided for this video."}
                        </p>
                    </div>

                    {/* Interactive Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-[#0f0f0f] mb-4">
                            {comments.length} Comments
                        </h3>

                        {/* Add Comment Input */}
                        <form onSubmit={handleAddComment} className="flex gap-3 items-start mb-6">
                            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                                Y
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border-b border-gray-300 focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
                                />
                                {newComment.trim() && (
                                    <div className="flex justify-end gap-2 mt-1">
                                        <button
                                            type="button"
                                            onClick={() => setNewComment("")}
                                            className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((c) => (
                                <div key={c.id} className="flex gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                                        {c.user.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-xs text-gray-900">{c.user}</span>
                                            <span className="text-[11px] text-gray-500">{c.time}</span>
                                        </div>
                                        <p className="text-gray-800 mt-1">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Videos Sidebar */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
                <h3 className="font-bold text-base text-[#0f0f0f] mb-3">Recommended</h3>
                <div className="flex flex-col gap-3">
                    {relatedVideos.map((video) => (
                        <Link
                            key={video.id}
                            to={`/watch?v=${video.id}`}
                            className="flex gap-2 group no-underline text-inherit"
                        >
                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <div className="flex flex-col justify-start overflow-hidden">
                                <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {video.snippet.title}
                                </h4>
                                <span className="text-[11px] text-gray-600 mt-1 truncate">
                                    {video.snippet.channelTitle}
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    {Number(video.statistics?.viewCount || 50000).toLocaleString()} views
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchPage;