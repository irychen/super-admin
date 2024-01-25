import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getToken, setToken } from "@/utils/token.ts"
import { message as antdMessage } from "antd"
import mergePath from "@/utils/mergePath.ts"
import { toNumber } from "fortea"

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
    url = url.startsWith("http") ? url : mergePath(url, baseUrl)

    config.headers = config.headers || {}

    if (config.hideLoading === true) {
        config.headers["loading"] = "false"
    }
    if (config.needToken) {
        const token = getToken()
        if (!token) {
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
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                const { response, config, message } = err
                let msg = response?.data?.message || response?.data?.msg || response?.data?.error || message
                if (message === "Network Error") {
                    antdMessage.error("网络开小差了!  请稍后重试 ...")
                } else {
                    antdMessage.error(msg)
                }
                console.error(msg, config.url)
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
