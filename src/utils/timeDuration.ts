import { toNumber } from "fortea"

/**
 * convert time duration to milliseconds
 * @param duration time string, like: 1s、1m、1h、1d、1w、1M、1y
 * @returns milliseconds
 */
function timeDuration(duration: string) {
    const validUnits = ["s", "m", "h", "d", "w", "M", "y"]
    if (duration.length < 2 || !validUnits.some(unit => duration.endsWith(unit))) {
        throw new Error(`Invalid duration: ${duration}`)
    }
    return toNumber(duration.slice(0, -1)) * toUnit(duration.slice(-1))
}

function toUnit(unit: string) {
    switch (unit) {
        case "s":
            return 1000
        case "m":
            return 60 * 1000
        case "h":
            return 60 * 60 * 1000
        case "d":
            return 24 * 60 * 60 * 1000
        case "w":
            return 7 * 24 * 60 * 60 * 1000
        case "M":
            return 30 * 24 * 60 * 60 * 1000
        case "y":
            return 365 * 24 * 60 * 60 * 1000
        default:
            throw new Error(`Invalid duration unit: ${unit}`)
    }
}

export default timeDuration
