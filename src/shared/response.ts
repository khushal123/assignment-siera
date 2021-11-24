interface BaseResponse {
    status: number,
    message: string
}

interface ErrorResponse extends BaseResponse {
    error: any
}

interface TracksResponse extends BaseResponse {
    tracksList: Array<any>,
    type: string,
    temperature: number,
    input: any
}

export default class ResponseTypes {
    public static getErrorResponse(status: number, message: string, error: any): BaseResponse {
        const response: ErrorResponse = {
            status,
            message,
            error
        }
        return response;
    }

    public static getTracksResponse(trackType: string, temperature: number, trackList: Array<any>, input: any): TracksResponse {
        const response: TracksResponse = {
            status: 200,
            message: "success",
            type: trackType,
            "temperature": temperature,
            input: input,
            tracksList: trackList
        }
        return response;
    }
}