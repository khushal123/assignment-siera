import axios from 'axios'


export class TemperatureService {
    constructor() {

    }

    getTemperature = async (url: string) => {
        try {
            const temperatureResponse = await axios.get(url);
            if (temperatureResponse.status === 200) {
                return temperatureResponse.data
            }
            throw Error("error temperature api")
        } catch (error: any) {
            throw error.response ? error.response.data : error
        }
    }
}