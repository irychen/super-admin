import LoadingArea from "@/components/LoadingArea"
import { Fragment, memo, ReactNode, Suspense } from "react"

function BaseLayout(props: { children: ReactNode }) {
    const { children } = props
    console.log("BaseLayout render")
    return (
        <Fragment>
            <Suspense fallback={<LoadingArea />}>{children}</Suspense>
        </Fragment>
    )
}

export default memo(BaseLayout)
