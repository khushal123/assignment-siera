import Config from "./constants";

export function isTokenExpired(createdAt: number, expiresIn: number): boolean {
    const currentTime = new Date().getTime();
    if ((currentTime - createdAt / 1000) <= 3600) {
        return false
    }
    return true
}

export function resolveTemperature(temperatureData: any): string {
    const { temp } = temperatureData.main
    if (temp > 30) {
        return "party"
    }
    if (temp >= 15 && temp <= 30) {
        return "pop"
    }
    if (temp >= 10 && temp < 15) {
        return "rock"
    }
    if (temp < 10) {
        return "classical"
    }
    return "hindi" //default
}

export function resolveURL(location: string, type: string): string {
    let url: string = Config.TemperatureConfig.OPEN_WEATHER_MAP_TEMPERATURE_URL!
    if (type === "latlong") {
        if (!location.includes(".")) {
            throw "invalid latlong"
        }
        const [lat, long] = location.split(",")
        url = url.replace("{{q=location}}", `lat=${lat}&long=${long}`)
    } else {
        url = url.replace("{{q=location}}", `q=${location}`)
    }
    return url
}