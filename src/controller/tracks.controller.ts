import { SpotifySearch } from "../dto/spotify.search";
import { SpotifyService } from "../services/spotify.service";
import { TemperatureService } from "../services/temperature.service";
import { resolveTemperature, resolveURL } from "../shared/functions";

export class TracksController {
    private spotifyService: SpotifyService
    private temperatureService: TemperatureService
    constructor(spotifyService: SpotifyService, temperatureService: TemperatureService) {
        this.spotifyService = spotifyService
        this.temperatureService = temperatureService
    }
    getTracks = async (location: string, type: string) => {
        try {
            const url: string = resolveURL(location, type)
            const temperatureData = await this.temperatureService.getTemperature(url);
            const genre: string = resolveTemperature(temperatureData);
            const spotifySearch: SpotifySearch = {
                genre: genre,
                market: "IN",
                type: "track"
            }
            const tracksResponse = await this.spotifyService.searchTracks(spotifySearch);
            const trackData = tracksResponse.tracks.items.map((item: any) => {
                return {
                    url: item.preview_url,
                    name: item.name
                }
            })
            return {
                trackData,
                spotifySearch,
                location,
                temperatureData
            };
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}