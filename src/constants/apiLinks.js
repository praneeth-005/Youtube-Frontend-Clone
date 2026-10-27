// Replace API_KEY with your own Google Cloud YouTube Data API v3 key if you want live API data.
// If empty, expired, or rate limited, the application automatically uses the verified fallback catalogue.
export const API_KEY = "AIzaSyAbkbTq2b4NUTNs6ll7GByDejIEce6JYKU";

export const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`;

export const YOUTUBE_SEARCH_API = "https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";