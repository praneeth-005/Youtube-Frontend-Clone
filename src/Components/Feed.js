import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openMenu } from '../utils/appSlice';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard from './VideoCard';
import Shimmer from './Shimmer';

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getVideos();
        dispatch(openMenu());
    }, []);

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideos(json.items || []);
        setLoading(false);
    };

    if (loading) {
        return <Shimmer />;
    }

    return (
        <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-8 p-4 pt-6">
            {videos?.map((video) => (
                <VideoCard key={video.id} info={video} />
            ))}
        </div>
    );
}

export default Feed;
