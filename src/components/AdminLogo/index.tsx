import logo from "@/assets/super_admin_logo.png"

interface AdminLogoProps {
    height?: number
    width?: number
}

function AdminLogo(props: AdminLogoProps) {
    const { height = 50, width = 60 } = props
    return <img src={logo} alt={"admin-logo"} style={{ width, height }} />
}

export default AdminLogo
