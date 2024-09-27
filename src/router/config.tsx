import { lazy } from "react"
import { BaseRouterConfig, RouteConfig } from "@/router"
import { IconUserFilled } from "@tabler/icons-react"
import Home from "@/pages/home"
// import Login from "@/pages/login"
// import Signup from "@/pages/signup"
// import Admin from "@/pages/admin"

// lazy load
// const Home = lazy(() => import("@/pages/home"))
const Login = lazy(() => import("@/pages/login"))
const Signup = lazy(() => import("@/pages/signup"))
const Admin = lazy(() => import("@/pages/admin"))

// import AdminUserInfo from "@/pages/admin/userinfo"
// import AdminUsers from "@/pages/admin/users"
// import AdminWelcome from "@/pages/admin/dashboard"

// lazy load
const AdminUsers = lazy(() => import("@/pages/admin/users"))
const AdminUserInfo = lazy(() => import("@/pages/admin/userinfo"))
const AdminWelcome = lazy(() => import("@/pages/admin/dashboard"))

import SolarCrownLineBoldDuotone from "@/components/icons/SolarCrownLineBoldDuotone"
import SolarUserBoldDuotone from "@/components/icons/SolarUserBoldDuotone"
import Nested from "@/pages/admin/nested"
import Nested_1 from "@/pages/admin/nested/nested-1"
import Nested_1_1 from "@/pages/admin/nested/nested-1/nested-1-1"
import Nested_2 from "@/pages/admin/nested/nested-2"
import Nested_2_1 from "@/pages/admin/nested/nested-2/nested-2-1"
import UimCircleLayer from "@/components/icons/UimCircleLayer"
import Error404 from "@/pages/admin/error/404"
import Error500 from "@/pages/admin/error/500"
import ClarityErrorStandardSolid from "@/components/icons/ClarityErrorStandardSolid"
import Error403 from "@/pages/403"
import SuperTablePage from "@/pages/admin/super-table"
import IconParkTwotoneTable from "@/components/icons/IconParkTwotoneTable"

export const ADMIN_PATH = "/admin"

export const adminRoutes: RouteConfig[] = [
    {
        path: "dashboard",
        cache: true,
        component: AdminWelcome,
        meta: { title: "dashboard" },
        search: true,
        icon: <SolarCrownLineBoldDuotone width={18} height={18} />,
    },
    {
        path: "users-management",
        cache: true,
        component: AdminUsers,
        meta: { title: "users_management" },
        search: true,
        icon: <SolarUserBoldDuotone width={18} height={18} />,
    },
    {
        path: "userinfo",
        cache: true,
        component: AdminUserInfo,
        meta: { title: "userinfo" },
        search: true,
        icon: <IconUserFilled size={16} />,
    },
    {
        path: "super-table",
        cache: true,
        component: SuperTablePage,
        meta: { title: "super_table" },
        search: true,
        icon: <IconParkTwotoneTable width={16} height={16} />,
    },
    {
        path: "nested",
        component: Nested,
        meta: { title: "nested" },
        redirect: "/admin/nested/nested-1",
        icon: <UimCircleLayer width={16} height={16} />,
        children: [
            {
                path: "nested-1",
                component: Nested_1,
                meta: { title: "nested_1" },
                search: true,
                redirect: "/admin/nested/nested-1/nested-1-1",
                icon: <UimCircleLayer width={16} height={16} />,
                children: [
                    {
                        path: "nested-1-1",
                        component: Nested_1_1,
                        meta: { title: "nested_1_1" },
                        // search: true,
                    },
                ],
            },
            {
                path: "nested-2",
                component: Nested_2,
                meta: { title: "nested_2" },
                redirect: "/admin/nested/nested-2/nested-2-1",
                search: true,
                icon: <UimCircleLayer width={16} height={16} />,
                children: [
                    {
                        path: "nested-2-1",
                        component: Nested_2_1,
                        meta: { title: "nested_2_1" },
                        // search: true,
                    },
                ],
            },
        ],
    },
    {
        path: "error",
        meta: { title: "error_pages" },
        icon: <ClarityErrorStandardSolid width={16} height={16} />,
        children: [
            {
                path: "404",
                component: Error404,
                meta: { title: "error_404" },
                search: true,
            },
            {
                path: "500",
                component: Error500,
                meta: { title: "error_500" },
                search: true,
            },
            {
                path: "403",
                component: Error403,
                meta: { title: "error_403" },
                search: true,
            },
        ],
    },
]

const routes: BaseRouterConfig[] = [
    {
        path: "/",
        component: Home,
    },
    {
        path: ADMIN_PATH,
        component: Admin,
        meta: { title: "admin" },
        redirect: "/admin/dashboard",
        children: adminRoutes,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/signup",
        component: Signup,
    },
    {
        path: "/403",
        component: Error403,
    },
    {
        path: "/404",
        component: Error404,
    },
    {
        path: "/*",
        component: lazy(() => import("@/pages/404")),
    },
]

export default routes
