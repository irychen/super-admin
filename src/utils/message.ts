import { MessageInstance } from "antd/es/message/interface"

let _messageApi: MessageInstance

export function setMessageApi(api: MessageInstance) {
    _messageApi = api
}

export function messageApi() {
    return _messageApi
}
