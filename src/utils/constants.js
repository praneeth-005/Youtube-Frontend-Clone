export const YOUTUBE_API_KEY = "AIzaSyAbkbTq2b4NUTNs6ll7GByDejIEce6JYKU";
export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&key=${YOUTUBE_API_KEY}`;
export const YOUTUBE_COMMENTS_API = (videoId) => `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${YOUTUBE_API_KEY}`;
