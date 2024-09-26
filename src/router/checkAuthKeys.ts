function checkAuthKeys(
    requiredAuthKeys: Array<string>,
    authKeys: Array<string>,
    authKeyCheckType: "and" | "or" = "and",
) {
    if (authKeyCheckType === "and") {
        return requiredAuthKeys.every(key => authKeys.includes(key))
    } else {
        return requiredAuthKeys.some(key => authKeys.includes(key))
    }
}

export default checkAuthKeys
