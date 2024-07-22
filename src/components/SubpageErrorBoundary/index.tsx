import { Component, ErrorInfo, ReactNode } from "react"

interface SubpageErrorBoundaryProps {
    children: ReactNode
}

interface SubpageErrorBoundaryState {
    hasError: boolean
    error?: Error
    errorStackInfo?: ErrorInfo
    showErrorMessage: boolean
}

class SubpageErrorBoundary extends Component<SubpageErrorBoundaryProps, SubpageErrorBoundaryState> {
    constructor(props: SubpageErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, showErrorMessage: false }
    }

    static getDerivedStateFromError(_: Error): SubpageErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, showErrorMessage: false }
    }

    componentDidCatch(error: Error, errorStackInfo: ErrorInfo) {
        // You can log the error to an error reporting service
        console.error("Uncaught error:", error, errorStackInfo)
        this.setState({
            error,
            errorStackInfo,
        })
    }

    render() {
        const { hasError, error, showErrorMessage } = this.state
        const { children } = this.props

        if (hasError) {
            return (
                <div
                    className={
                        "flex flex-col items-center justify-center bg-white min-h-[600px] dark:bg-[#0F1318] p-[20px]"
                    }
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2m0 14h-7.277L9 18.233V16H4V4h16z"
                            />
                            <path fill="currentColor" d="M11 6h2v5h-2zm0 6h2v2h-2z" />
                        </svg>
                    </div>
                    <h1 className={"text-[18px] mb-[0px] mt-[16px] font-bold"}>sorry, the page crashed!</h1>
                    <div className={"text-[14px] mt-[14px] "}>Try refreshing the page or contact the administrator</div>

                    {error?.message && (
                        <div
                            className={"mt-[10px] text-[12px] underline cursor-pointer"}
                            onClick={() => {
                                this.setState({
                                    showErrorMessage: !showErrorMessage,
                                })
                            }}
                        >
                            view error message
                        </div>
                    )}
                    {showErrorMessage && (
                        <div className={"mt-[10px] rounded p-[20px] bg-gray-100 dark:bg-gray-950"}>
                            <code className={"mt-[10px] "}>{error?.message}</code>
                        </div>
                    )}
                </div>
            )
        }
        return children
    }
}

export default SubpageErrorBoundary
