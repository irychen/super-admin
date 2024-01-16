/**
 * 合并URL路径
 * @param path 路径
 * @param paterPath 父路径
 * @example
 * mergePath("a", "b") // "b/a"
 * mergePath("/a", "b") // "b/a"
 * mergePath("a", "/b") // "b/a"
 * mergePath("/a", "/b") // "b/a"
 */
function mergePath(path = "", paterPath = "") {
    path = path.replace(/^\//, "")
    paterPath = paterPath.replace(/\/$/, "")
    return paterPath + "/" + path
}

export default mergePath
