import { RequestGenericInterface } from 'fastify'

export interface GetTracksRequest extends RequestGenericInterface {
    Querystring: {
        location: string,
        type: string
    }
}