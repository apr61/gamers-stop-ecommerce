import { useCallback, useEffect, useState } from "react"

export function useAsync(func, dependencies = []) {
    const {execute, ...state} = useAsyncInternal(func, dependencies, true)

    useEffect(() => {
        execute()
    }, [execute])
    return state
}

export function useAsyncFn(func, dependencies = []) {
    return useAsyncInternal(func, dependencies, false)
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState()
    const [value, setValue] = useState()

    const execute = useCallback((...params) => {
        setLoading(true)
        return func(...params).then(data => {
            setValue(data)
            setError(undefined)
        }).catch(err => {
            setError(err)
            setValue(undefined)
            return Promise.reject(err)
        }).finally(() => {
            setLoading(false)
            return value
        })
    }, dependencies)
    return {loading, error, value, execute}
}