import { Dispatch, SetStateAction, useEffect, useState } from "react"

export interface Options<T> {
    serializer?: (value: T) => string
    deserializer?: (value: string) => T
    storage?: "local" | "session"
}

function useStorageState<T>(
    key: string,
    value?: T | (() => T),
    options?: Options<T>,
): [T, Dispatch<SetStateAction<T>>] {
    const { serializer, deserializer, storage } = {
        serializer: JSON.stringify,
        deserializer: JSON.parse,
        storage: "local",
        ...options,
    }

    const storageObj = storage === "local" ? window.localStorage : window.sessionStorage

    const [state, setState] = useState<T>(() => {
        const valueInLocalStorage = storageObj.getItem(key)
        if (valueInLocalStorage) {
            return deserializer(valueInLocalStorage)
        }
        return value instanceof Function ? value() : value
    })

    useEffect(() => {
        storageObj.setItem(key, serializer(state))
    }, [key, state, serializer])

    return [state, setState]
}

export default useStorageState
