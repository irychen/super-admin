function mergePath(path: string, paterPath = "") {
    path = path.startsWith("/") ? path : "/" + path
    return paterPath + path
}

export default mergePath
