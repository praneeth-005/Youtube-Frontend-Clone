import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../../utils/appSlice';
import { YOUTUBE_COMMENTS_API } from '../../utils/constants';

const Video = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        dispatch(closeMenu());
        getComments();
    }, [videoId]);

    const getComments = async () => {
        if (!videoId) return;
        const data = await fetch(YOUTUBE_COMMENTS_API(videoId));
        const json = await data.json();
        setComments(json.items || []);
    };

    if (!videoId) {
        return <div className="p-4 text-center text-gray-500">Video not found.</div>;
    }

    return (
        <div className="flex flex-col w-full max-w-[1000px] px-4 pt-4 md:px-6 lg:px-8 pb-10">
            <div className="w-full">
                <iframe
                    className="w-full aspect-video rounded-xl shadow-lg"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-lg mb-4">{comments.length > 0 ? `${comments.length} Comments` : 'Comments'}</h3>
                <div className="flex flex-col gap-4">
                    {comments.map((comment) => {
                        const snippet = comment?.snippet?.topLevelComment?.snippet;
                        if (!snippet) return null;
                        
                        return (
                            <div key={comment.id} className="flex gap-4">
                                <img 
                                    className="w-10 h-10 rounded-full bg-gray-200" 
                                    src={snippet.authorProfileImageUrl} 
                                    alt={snippet.authorDisplayName} 
                                />
                                <div>
                                    <p className="font-semibold text-sm">
                                        {snippet.authorDisplayName} 
                                    </p>
                                    <p className="text-sm mt-1 text-gray-800 break-words whitespace-pre-wrap">
                                        {snippet.textOriginal}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Video;
