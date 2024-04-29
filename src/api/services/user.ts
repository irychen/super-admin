import request from "@/utils/request"

export const URL_SET = {
    LOGIN_URL: "/sign-in",
}

export type LoginRes = {
    code: number
    data: {
        uid: string
        uname: string
        mobile: string
        permissions: string[]
        token: string
    }
}

export function userLogin(account: string, password: string) {
    return request.post(
        URL_SET.LOGIN_URL,
        { account, password },
        {
            needToken: false,
        },
    ) as Promise<LoginRes>
}
