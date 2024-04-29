import { useContext } from "react"
import { PageContext } from "@/components/AdminPagesProvider/index.tsx"

const usePageContext = () => {
    return useContext(PageContext)
}

export default usePageContext
