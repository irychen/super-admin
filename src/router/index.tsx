import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import { routes } from "@/router/config"
import { map } from "ramda"
import { IsHashRouter } from "@/config"
import { LazyExoticComponent, JSX } from "react"
import { SuspenseLoading } from "@/components/SuspenseLoading"
import { PageManageProvider } from "@/providers/PageManageProvider"
import { ErrorBoundary } from "@ant-design/pro-components"

const Router = IsHashRouter ? HashRouter : BrowserRouter

export const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                {map(route => {
                    if (typeof route.component === "object") {
                        const Component = route.component as LazyExoticComponent<() => JSX.Element>
                        return (
                            <Route
                                path={route.path}
                                key={route.name}
                                element={<SuspenseLoading>{<Component></Component>}</SuspenseLoading>}
                            />
                        )
                    } else {
                        if (route?.name === "admin") {
                            return (
                                <Route
                                    path={route.path}
                                    key={route.name}
                                    element={
                                        <PageManageProvider>
                                            <route.component route={route} />
                                        </PageManageProvider>
                                    }
                                />
                            )
                        }
                        return <Route path={route.path} key={route.name} element={<route.component route={route} />} />
                    }
                }, routes)}
            </Routes>
        </Router>
    )
}
