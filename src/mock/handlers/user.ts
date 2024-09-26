import { delay, http, HttpResponse } from "msw"

const signIn = http.post("/api/user/signin", async ({ request }) => {
    const { account, password } = (await request.json()) as { account: string; password: string }
    if (!account || !password) {
        return HttpResponse.json(
            {
                code: 400,
                message: "账号或密码不能为空",
            },
            { status: 400 },
        )
    }
    return HttpResponse.json({
        token: "1234567890",
        user: {
            authKeys: ["admin"],
        },
    })
})

export const userHandlers = [signIn]
