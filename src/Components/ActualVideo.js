const formatViews = (views) => {
    const num = Number(views);
    if (!num || isNaN(num)) return "100K views";
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B views";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K views";
    return num + " views";
};

const ActualVideo = ({ data }) => {
    const { snippet, statistics } = data || {};
    const { title, thumbnails, channelTitle } = snippet || {};
    const thumbnailUrl = thumbnails?.medium?.url || thumbnails?.high?.url || thumbnails?.default?.url;

    return (
        <div className="flex flex-col w-full cursor-pointer group">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-xs">
                <img
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    src={thumbnailUrl}
                    alt={title || "Video thumbnail"}
                    loading="lazy"
                />
            </div>

            {/* Video Details */}
            <div className="flex gap-3 pt-3 items-start">
                {/* Channel Avatar Placeholder */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white font-semibold flex items-center justify-center flex-shrink-0 text-sm shadow-xs mt-0.5">
                    {channelTitle ? channelTitle.charAt(0).toUpperCase() : "Y"}
                </div>

                <div className="flex flex-col flex-1 overflow-hidden min-w-0">
                    <h3
                        className="text-sm font-medium text-[#0f0f0f] line-clamp-2 leading-snug group-hover:text-black"
                        title={title}
                    >
                        {title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 hover:text-black transition-colors truncate">
                        {channelTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {formatViews(statistics?.viewCount)} • recently uploaded
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ActualVideo;
