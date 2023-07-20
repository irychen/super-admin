import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import { routes } from "@/router/config"
import { map } from "ramda"
import { IsHashRouter } from "@/config"

const Router = IsHashRouter ? HashRouter : BrowserRouter

export const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                {map(
                    route => (
                        <Route path={route.path} key={route.name} element={<route.component route={route} />} />
                    ),
                    routes,
                )}
            </Routes>
        </Router>
    )
}
