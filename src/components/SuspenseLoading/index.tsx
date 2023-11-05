import { ReactNode, Suspense } from "react"
import { Loading } from "@/components/Loading"

interface Props {
    children: ReactNode
}

export function SuspenseLoading({ children }: Props) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default SuspenseLoading
