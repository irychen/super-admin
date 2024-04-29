import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { message as antdMessage, notification } from "antd"
import { mergePath, toNumber } from "fortea"
import { getToken, setToken } from "@/utils/token.ts"

const { VITE_API_MAX_TIMEOUT, VITE_API_BASE_URL } = import.meta.env

const baseUrl = VITE_API_BASE_URL || "http://localhost:3000"

export const baseRequestInstance = axios.create({
    timeout: VITE_API_MAX_TIMEOUT ? toNumber(VITE_API_MAX_TIMEOUT) : 10000,
})

interface RequestConfig extends AxiosRequestConfig {
    needToken?: boolean
    ignoreErrors?: boolean
    hideLoading?: boolean
}

/**
 * 重定向到登录页面
 */
export function redirectToLogin() {
    if (window.location.hash !== "#/login") {
        window.location.hash = "#/login"
        window.location.reload()
    }
}

// 添加响应拦截器;
baseRequestInstance.interceptors.response.use(
    function (response) {
        // Access-Control-Expose-Headers x-token
        // 检查响应头中是否有 new token
        const token = response.headers["new-token"]
        if (token) {
            // 有 token，更新本地存储的 token
            setToken(token)
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    },
)

const baseRequest = function (method = "GET", url: string, data: any = {}, config?: RequestConfig) {
    config = {
        needToken: true,
        ignoreErrors: false,
        hideLoading: false,
        ...(config || {}),
    }
    // 如果url 不是以http 开头，加上baseurl
    url = url.startsWith("http") ? url : mergePath(baseUrl, url)

    config.headers = config.headers || {}

    if (config.hideLoading === true) {
        config.headers["loading"] = "false"
    }
    if (config.needToken) {
        const token = getToken()
        if (!token) {
            redirectToLogin()
            throw new Error("token is null")
        }
        config.headers["token"] = token
    }

    let response: Promise<AxiosResponse<any, any>>
    switch (method) {
        case "GET":
            response = baseRequestInstance.get(url, {
                params: data,
                ...(config || {}),
            })
            break
        case "POST":
            response = baseRequestInstance.post(url, data, {
                ...(config || {}),
            })
            break
        case "PUT":
            response = baseRequestInstance.put(url, data, {
                ...(config || {}),
            })
            break
        case "DELETE":
            response = baseRequestInstance.delete(url, {
                data,
                ...(config || {}),
            })
            break
        default:
            throw new Error("method is not supported")
    }
    return new Promise((resolve, reject) => {
        response
            .then(res => {
                // 服务器正常返回 检查状态码 code 是否为 0 或者 success 为 true
                const data = res.data || {}
                const { success } = data
                const msg = data?.message || data?.msg || data?.error
                if (success !== true) {
                    notification.error({
                        message: "错误",
                        description: <div dangerouslySetInnerHTML={{ __html: msg || "未知错误" }}></div>,
                    })
                    reject(data)
                } else {
                    resolve(data)
                }
            })
            .catch(err => {
                const { response, config, message } = err
                const msg = response?.data?.message || response?.data?.msg || response?.data?.error?.message || message
                if (response.status === 401) {
                    redirectToLogin()
                }
                if (message === "Network Error") {
                    antdMessage.error("网络开小差了!  请稍后重试 ...")
                } else {
                    // msg = "timeout of 10000ms exceeded" 提取超时时间ms
                    if (msg?.startsWith && msg?.startsWith("timeout of")) {
                        const timeout = msg.match(/\d+/)
                        antdMessage.error(`请求超时 ${Math.ceil(Number(timeout) / 1000)}s`)
                    } else {
                        antdMessage.error(msg)
                    }
                }
                reject(err)
            })
    })
}

function get(url: string, data?: any, config?: RequestConfig) {
    return baseRequest("GET", url, data, config)
}

function post(url: string, data?: any, config?: RequestConfig) {
    return baseRequest("POST", url, data, config)
}

function put(url: string, data?: any, config?: RequestConfig) {
    return baseRequest("PUT", url, data, config)
}

function del(url: string, data?: any, config?: RequestConfig) {
    return baseRequest("DELETE", url, data, config)
}

const request = { get, post, put, del }

export default request
