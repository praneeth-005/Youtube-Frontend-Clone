import React from 'react';

const ShimmerCard = () => (
    <div className="flex flex-col w-full sm:w-[320px] md:w-[340px]">
        {/* Thumbnail shimmer */}
        <div className="w-full aspect-video bg-gray-200 rounded-xl animate-pulse"></div>
        
        <div className="flex gap-3 mt-3">
            {/* Avatar shimmer */}
            <div className="w-9 h-9 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
            
            {/* Details shimmer */}
            <div className="flex flex-col gap-2 w-full mt-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mt-1"></div>
            </div>
        </div>
    </div>
);

const Shimmer = () => {
    return (
        <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-8 p-4 pt-6">
            {Array(15).fill("").map((_, index) => (
                <ShimmerCard key={index} />
            ))}
        </div>
    );
};

export default Shimmer;
