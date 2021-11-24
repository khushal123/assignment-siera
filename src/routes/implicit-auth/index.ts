import { FastifyPluginAsync } from "fastify"
import { ImplicitAuthController } from '../../controller/auth.controller'
import ResponseTypes from '../../shared/response'
import Config from "../../shared/constants"

const tracks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const implicitAuthController = new ImplicitAuthController(fastify.getSpotifyService());
    fastify.get('/', async function (request, reply) {
        try {
            return await implicitAuthController.triggerAuth(request, reply)
        } catch (error) {
            return reply.send(ResponseTypes.getErrorResponse(400, Config.ErrorTypes.GENERIC_ERROR, error))
        }
    })
}

export default tracks;
