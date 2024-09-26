import { KeepAliveRef } from "keepalive-for-react"

let _keepaliveIns: KeepAliveRef

export function getKeepaliveIns() {
    return _keepaliveIns
}

export function setKeepaliveIns(ins?: KeepAliveRef) {
    _keepaliveIns = ins!
}
