import { faker } from "@faker-js/faker"

import { delay, http, HttpResponse } from "msw"

import { URL_SET } from "@/api/services/user"
import { getBaseUrl } from "@/_mocks/utils"

const signIn = http.post(getBaseUrl(URL_SET.LOGIN_URL), async ctx => {
    // get body data
    const { account, password } = (await ctx.request.json()) as { account: string; password: string }

    await delay(2000)

    if (account !== "admin" || password !== "admin") {
        // return error response with 401 status code
        return HttpResponse.json({
            code: 401,
            msg: "用户名或密码错误",
        })
    } else {
        return HttpResponse.json({
            code: 0,
            data: {
                uid: faker.string.uuid(),
                uname: "admin",
                mobile: "18888888888",
                permissions: ["admin"],
                token: faker.string.uuid(),
            },
        })
    }
})

const handlers = [signIn]

export default handlers
