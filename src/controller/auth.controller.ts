import { FastifyReply, FastifyRequest } from "fastify";
import { TokenResponse } from "../dto/token.response";
import { SpotifyService } from "../services/spotify.service";

export class ImplicitAuthController {
    spotifyService: SpotifyService
    constructor(spotifyService: SpotifyService) {
        this.spotifyService = spotifyService
    }
    async triggerAuth(request: FastifyRequest, reply: FastifyReply) {
        try {
            const trigger: TokenResponse = await this.spotifyService.triggerToken()
            return trigger
        } catch (error) {
            throw error
        }
    }
}