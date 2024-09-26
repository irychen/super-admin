import { NotificationInstance } from "antd/es/notification/interface"

let _notificationApi: NotificationInstance

export function setNotificationApi(api: NotificationInstance) {
    _notificationApi = api
}

export function notificationApi() {
    return _notificationApi
}
