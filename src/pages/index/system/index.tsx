import { useOnActive } from "keepalive-for-react"

function System() {
    const domRef = useOnActive(() => {
        console.log("System use mount")
        return () => {
            console.log("System use clean")
        }
    })

    return <div ref={domRef}>hello world</div>
}

export default System
