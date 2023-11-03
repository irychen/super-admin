import { useLocation } from "react-router-dom"

function useKeepAliveKey() {
    const location = useLocation()
    return location.pathname + location.search
}

export default useKeepAliveKey
