import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import VideoCard from './VideoCard';
import Shimmer from './Shimmer';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(openMenu());
        if (query) {
            getSearchVideos();
        }
    }, [query]);

    const getSearchVideos = async () => {
        setLoading(true);
        try {
            const data = await fetch(YOUTUBE_SEARCH_API(query));
            const json = await data.json();
            // Filter out non-video results like channels or playlists if any
            const items = json.items?.filter(item => item.id.kind === 'youtube#video') || [];
            setVideos(items);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
        }
        setLoading(false);
    };

    if (loading) {
        return <Shimmer />;
    }

    return (
        <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-8 p-4 pt-6 w-full">
            {videos.length === 0 ? (
                <div className="w-full text-center text-xl mt-10">No videos found for "{query}"</div>
            ) : (
                videos.map((video) => (
                    <VideoCard key={video.id.videoId} info={video} />
                ))
            )}
        </div>
    );
}

export default SearchResults;
