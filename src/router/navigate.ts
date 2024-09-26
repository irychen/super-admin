import { NavigateFunction, NavigateOptions } from "react-router-dom"

let _navigateIns: NavigateFunction

export function setNavigate(nav: NavigateFunction) {
    _navigateIns = nav
}

export function navigateTo(path: string, options?: NavigateOptions) {
    _navigateIns(path, options)
}
