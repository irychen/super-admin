export function classNames(...args: any[]): string {
    const classes = []
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (!arg) continue
        const argType = typeof arg
        if (argType === "string" || argType === "number") {
            classes.push(arg)
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg))
        } else if (argType === "object") {
            for (const key in arg) {
                if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key)
                }
            }
        }
    }
    return classes.join(" ")
}
