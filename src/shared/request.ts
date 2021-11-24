import { RequestGenericInterface } from 'fastify'

export interface GetTracksRequest extends RequestGenericInterface {
    Querystring: {
        city: string,
        location?: number
    }
}