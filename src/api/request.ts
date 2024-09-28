import AppConfig from "@/config"
import { navigate } from "@/utils/navigate"
import { tokenStore } from "@/store/token"
import { notificationApi } from "@/utils/notification"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { mergePath } from "fortea"

export const requestInstance = axios.create({
    baseURL: AppConfig.apiBaseUrl,
    timeout: AppConfig.apiMaxTimeout,
})

interface CustomRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
    token?: boolean
    ignoreError?: boolean
    showLoading?: boolean
}

requestInstance.interceptors.response.use(function (response) {
    // Access-Control-Expose-Headers x-token
    // check if there is a new token in the response headers
    const token = response.headers["new-token"]
    if (token) {
        // there is a new token, update the local storage token
        tokenStore.setToken(token)
    }
    return response
})

const base = function (method = "GET", url: string, data: unknown = {}, config?: CustomRequestConfig) {
    config = {
        token: false,
        ignoreError: false,
        showLoading: false,
        ...(config || {}),
    }
    url = url.startsWith("http") ? url : mergePath(AppConfig.apiBaseUrl, url)
    config.headers = config.headers || {}

    if (config.token) {
        const token = tokenStore.getToken()
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
            // config.headers["x-token"] = token
            // config.headers["token"] = token
        } else {
            navigate("/login")
            console.error("token is not found")
        }
    }

    let response: Promise<AxiosResponse<unknown, unknown>>
    switch (method) {
        case "GET":
            response = requestInstance.get(url, {
                params: data,
                ...(config || {}),
            })
            break
        case "POST":
            response = requestInstance.post(url, data, {
                ...(config || {}),
            })
            break
        case "PUT":
            response = requestInstance.put(url, data, {
                ...(config || {}),
            })
            break
        case "DELETE":
            response = requestInstance.delete(url, {
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
                const data = (res.data || {}) as ResponseList<unknown> | ResponseData<unknown>
                resolve(handleResponse(data))
            })
            .catch(async err => {
                const { response, message } = err
                reject(err)
            })
    })
}

function get(url: string, data?: unknown, config?: CustomRequestConfig) {
    return base("GET", url, data, config)
}

function post(url: string, data?: unknown, config?: CustomRequestConfig) {
    return base("POST", url, data, config)
}

function put(url: string, data?: unknown, config?: CustomRequestConfig) {
    return base("PUT", url, data, config)
}

function del(url: string, data?: unknown, config?: CustomRequestConfig) {
    return base("DELETE", url, data, config)
}

const request = { get, post, put, del }

export interface ResponseList<T> {
    data: T[]
    msg: string
    code: number
    details?: string
}

export interface ResponseData<T> {
    data: T
    msg: string
    code: number
    details?: string
}

function handleResponse<T>(res: ResponseList<T> | ResponseData<T>) {
    if (res.code !== 0) {
        let msg = res.msg || "unknown error"
        if (res.details) {
            msg += `\ndetails : ${res.details}`
        }
        notificationApi().error({
            message: "Error",
            description: msg,
        })
        return Promise.reject(res)
    }
    return res
}

export default request
