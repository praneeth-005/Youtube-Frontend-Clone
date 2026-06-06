import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ info }) => {
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;
    const videoId = typeof info.id === 'object' ? info.id.videoId : info.id;

    // Formatting view count to be more readable
    const formatViewCount = (count) => {
        if (!count) return '0';
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count;
    };

    return (
        <Link to={`/watch?v=${videoId}`}>
            <div className="flex flex-col w-full sm:w-[320px] md:w-[340px] cursor-pointer group">
                <div className="relative">
                    <img
                        className="rounded-xl w-full object-cover aspect-video group-hover:rounded-none transition-all duration-300"
                        alt="thumbnail"
                        src={thumbnails?.medium?.url || thumbnails?.high?.url}
                    />
                </div>
                <div className="flex gap-3 mt-3">
                    {/* Placeholder for Channel Avatar */}
                    <div className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 font-medium">{channelTitle}</p>
                        <div className="text-gray-600 text-sm flex items-center">
                            <span>{formatViewCount(statistics?.viewCount)} views</span>
                            <span className="mx-1">•</span>
                            <span>Just now</span> {/* Placeholder for time */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default VideoCard;
