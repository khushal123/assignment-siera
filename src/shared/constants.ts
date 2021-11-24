
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1"
const SPOTIFY_SEARCH_URL = `${SPOTIFY_BASE_URL}/search`
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_AUTH_SCOPE = 'user-read-private user-read-email';
const SPOTIFY_REDIRECT_URI = "http://localhost:3000/implicit-auth/token"

const OPEN_WEATHER_MAP_TEMPERATURE_URL = process.env.OPEN_WEATHERMAP_API

const ErrorTypes = {
    GENERIC_ERROR: "An error occured",
    GET_TOKEN_ERROR: "Error while triggering token"
}

const SpotifyConfig = {
    SPOTIFY_AUTH_URL,
    SPOTIFY_SEARCH_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_AUTH_SCOPE,
    SPOTIFY_REDIRECT_URI
}
const TemperatureConfig = {
    OPEN_WEATHER_MAP_TEMPERATURE_URL
}
const Config = {
    ErrorTypes,
    SpotifyConfig,
    TemperatureConfig
}

export default Config