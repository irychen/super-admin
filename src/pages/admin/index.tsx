import AdminLayout from "@/layouts/AdminLayout"
import { memo } from "react"
function Admin() {
    console.log("Admin render")
    return <AdminLayout />
}

export default memo(Admin)
