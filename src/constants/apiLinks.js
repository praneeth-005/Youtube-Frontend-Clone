// Add your Google Cloud YouTube Data API v3 key here to fetch live YouTube data.
// When empty, the application uses the local catalogue with zero network errors.
export const API_KEY = "";

export const YOUTUBE_API = API_KEY && API_KEY.trim() !== ""
    ? `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`
    : null;

export const YOUTUBE_SEARCH_API = null;