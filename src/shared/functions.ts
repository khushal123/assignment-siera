export function isTokenExpired(createdAt: number, expiresIn: number): boolean {
    const currentTime = new Date().getTime();
    if ((currentTime - createdAt / 1000) <= 3600) {
        return false
    }
    return true
}