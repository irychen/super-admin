import request, { ResponseData } from "@/utils/request"

export const URL_SET = {
    LOGIN_URL: "user/login",
}

export function userLogin(email: string, password: string) {
    return request.post(URL_SET.LOGIN_URL, { email, password }, { needToken: false }) as Promise<
        ResponseData<{
            token: string
            user: {
                uid: string
                email: string
                name: string
                avatarURL: string
                roles: string[]
                desc: string
                permissions: string[]
            }
        }>
    >
}
