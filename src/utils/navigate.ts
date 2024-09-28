import { NavigateFunction, NavigateOptions } from "react-router-dom"

let _navigate: NavigateFunction

export function setNavigate(nav: NavigateFunction) {
    _navigate = nav
}

export function navigate(path: string, options?: NavigateOptions) {
    _navigate(path, options)
}
