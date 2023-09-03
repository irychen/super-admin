import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom"
import {routes} from "@/router/config"
import {map} from "ramda"
import {IsHashRouter} from "@/config"
import {lazy, LazyExoticComponent, JSX} from "react";
import {SuspenseLoading} from "@/components/Loading";

const Router = IsHashRouter ? HashRouter : BrowserRouter

export const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                {map(
                    route => {
                        if (typeof route.component === 'object') {
                            const Component = route.component as LazyExoticComponent<() => JSX.Element>
                            return <Route path={route.path} key={route.name} element={<SuspenseLoading>
                                {<Component></Component>}
                            </SuspenseLoading>}/>
                        } else {
                            return (
                                <Route path={route.path} key={route.name} element={<route.component route={route}/>}/>
                            )
                        }
                    },
                    routes,
                )}
            </Routes>
        </Router>
    )
}
