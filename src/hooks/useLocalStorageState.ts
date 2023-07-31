import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Options<T> {
    serializer?: (value: T) => string
    deserializer?: (value: string) => T
}

function useLocalStorageState<T>(
    key: string,
    value?: T | (() => T),
    options?: Options<T>,
): [T, Dispatch<SetStateAction<T>>] {
    const { serializer, deserializer } = {
        serializer: JSON.stringify,
        deserializer: JSON.parse,
        ...options,
    }

    const [state, setState] = useState<T>(() => {
        const valueInLocalStorage = window.localStorage.getItem(key)
        if (valueInLocalStorage) {
            return deserializer(valueInLocalStorage)
        }
        return value instanceof Function ? value() : value
    })

    useEffect(() => {
        window.localStorage.setItem(key, serializer(state))
    }, [key, state, serializer])

    return [state, setState]
}

export default useLocalStorageState
