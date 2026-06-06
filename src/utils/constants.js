export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${YOUTUBE_API_KEY}`;
export const YOUTUBE_COMMENTS_API = (videoId) => `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${YOUTUBE_API_KEY}`;
export const RECOMMAND_VIDEOS = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${YOUTUBE_API_KEY}`;
export const YOUTUBE_SEARCH_API = (query) => `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${YOUTUBE_API_KEY}`;
