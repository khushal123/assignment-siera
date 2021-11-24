import { FastifyPluginAsync } from "fastify"
import { TracksController } from '../../controller/tracks.controller'
import ResponseTypes from '../../shared/response'
import Config from "../../shared/constants"
import { GetTracksRequest } from "../../shared/request"
import { TemperatureService } from "../../services/temperature.service"

const tracks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const temperatureService: TemperatureService = new TemperatureService()
  const tracksController = new TracksController(fastify.getSpotifyService(), temperatureService);
  fastify.get<GetTracksRequest>('/', async function (request, reply) {
    try {
      const { location, type } = request.query
      return await tracksController.getTracks(location, type)
    } catch (error) {
      return reply.status(400).send(ResponseTypes.getErrorResponse(400, Config.ErrorTypes.GENERIC_ERROR, error))
    }
  })
}

export default tracks;
