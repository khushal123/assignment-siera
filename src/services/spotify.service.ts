import axios from 'axios'
import { stringify } from 'querystring'
import { SpotifySearch } from '../dto/spotify.search'
import { TokenResponse } from '../dto/token.response'
import Config from '../shared/constants'
import * as utilFunctions from '../shared/functions'



export class SpotifyService {
    _token: string = ""
    createdAt: number = 0
    expiresIn: number = 0
    constructor() {
    }

    searchTracks = async (searchParams: SpotifySearch) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this._token}`,
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                }
            }
            const queryString = stringify(searchParams as any)
            const tracksResponse = await axios.get(Config.SpotifyConfig.SPOTIFY_SEARCH_URL + "?q=" + queryString, config)
            return tracksResponse.data
        } catch (error: any) {
            throw error.response.data
        }
    }
    triggerToken = async (): Promise<TokenResponse> => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(Config.SpotifyConfig.SPOTIFY_CLIENT_ID + ':' + Config.SpotifyConfig.SPOTIFY_CLIENT_SECRET).toString('base64')),
                    'Content-Type': "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
            }
            const data: any = {
                "grant_type": "client_credentials"
            }
            const res = await axios.post(Config.SpotifyConfig.SPOTIFY_AUTH_URL, stringify(data), config)
            if (res.status === 200) {
                this._token = res.data.access_token
                this.createdAt = new Date().getTime()
                this.expiresIn = res.data.expires_in
                const tokenResponse: TokenResponse = {
                    ...res.data,
                    created_at: this.createdAt
                }
                return tokenResponse
            }
            throw res.data
        } catch (error: any) {
            console.error(error)
            throw error.response.data
        }
    }

    isTokenExpired(): boolean {
        return utilFunctions.isTokenExpired(this.createdAt, this.expiresIn)
    }

    get token(): string {
        return this._token
    }
    get tokenCreated(): number {
        return this.createdAt
    }
    get getExpiry(): number {
        return this.expiresIn
    }

    set setExpiry(expires: number) {
        this.expiresIn = expires
    }
    set tokenCreated(created: number) {
        this.createdAt = created
    }
    set token(authToken: string) {
        this._token = authToken
    }

}