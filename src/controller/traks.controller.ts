import { FastifyReply, FastifyRequest } from "fastify";

export class TracksController {
    constructor() {

    }
    getTracks = async (request: FastifyRequest, reply: FastifyReply) => {
        return {
            "tracks": "tracks"
        }
    }

}