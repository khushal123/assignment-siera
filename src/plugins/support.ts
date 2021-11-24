import fp from 'fastify-plugin'
import { SpotifyService } from '../services/spotify.service'
import * as token from '../data/token.json'
import { isTokenExpired } from '../shared/functions';
import { TokenResponse } from '../dto/token.response';
import * as path from 'path'
import { writeFile } from 'fs'
import { promisify } from 'util';

export interface SupportPluginOptions {
  // Specify Support plugin options here
}
let spotifyService: SpotifyService = new SpotifyService();
(async () => {

  console.log(!token.access_token)
  if (!token.access_token || isTokenExpired(token.created_at, token.expires)) {
    const tokenResponse: TokenResponse = await spotifyService.triggerToken()
    const writeFilePromise = promisify(writeFile)
    const result = await writeFilePromise(path.join(__dirname, "./../data/token.json"), JSON.stringify(tokenResponse))
    console.log(result)
  }
})()

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {

  fastify.decorate('getSpotifyService', function () {
    return spotifyService
  })
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    getSpotifyService(): SpotifyService;
  }
}
