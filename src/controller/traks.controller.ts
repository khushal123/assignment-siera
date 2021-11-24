import { SpotifySearch } from "../dto/spotify.search";
import { SpotifyService } from "../services/spotify.service";

export class TracksController {
    private spotifyService: SpotifyService
    constructor(spotifyService: SpotifyService) {
        this.spotifyService = spotifyService
    }
    getTracks = async (city: string) => {
        try {
            const spotifySearch: SpotifySearch = {
                genre: "pop",
                market: "IN",
                type:"track"
            }
            const tracksResponse = await this.spotifyService.searchTracks(spotifySearch);
            const trackData = tracksResponse.tracks.items.map((item:any)=>{
                return {
                    url:item.preview_url,
                    name: item.name
                }
            })
            return trackData;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}