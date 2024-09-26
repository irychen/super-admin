import { Location } from "react-router-dom"

let _location: Location

export function setLocation(location: Location) {
    _location = location
}

export function getLocation() {
    return _location
}
