import { FastifyPluginAsync } from "fastify"
import { TracksController } from '../../controller/traks.controller'
import ResponseTypes from '../../shared/response'
import Config from "../../shared/constants"
import { GetTracksRequest } from "../../shared/request"

const tracks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const tracksController = new TracksController(fastify.getSpotifyService());
  fastify.get<GetTracksRequest>('/', async function (request, reply) {
    try {
      const { city } = request.query
      return await tracksController.getTracks(city)
    } catch (error) {
      return reply.status(400).send(ResponseTypes.getErrorResponse(400, Config.ErrorTypes.GENERIC_ERROR, error))
    }
  })
}

export default tracks;
