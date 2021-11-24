import { FastifyPluginAsync } from "fastify"
import { TracksController } from '../../controller/traks.controller'
import ResponseTypes from '../../shared/response'
import ErrorTypes from "../../shared/constants"

const tracks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const tracksController = new TracksController();
  fastify.get('/', async function (request, reply) {
    try {
      return await tracksController.getTracks(request, reply)
    } catch (error) {
      return ResponseTypes.getErrorResponse(400, ErrorTypes.GENERIC_ERROR, error)
    }
  })
}

export default tracks;
