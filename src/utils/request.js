import axios from "axios";

// 创建一个 axios 对象
const axiosInstance = axios.create({
    // 会在调用请求时拼接在 url 之前
    baseURL: import.meta.env.VITE_GLOB_API_URL,
    timeout: 5000
})

// 全局请求拦截 添加 JWT 请求头
axiosInstance.interceptors.request.use(
    function (config) {
        console.group("全局请求拦截")
        console.log(config)
        console.groupEnd();
        if (localStorage.getItem("token") != null) {
            config.headers.Authorization = localStorage.getItem("token")
        }

        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
)

// 全局响应拦截 根据返回状态码进行相关处理
axiosInstance.interceptors.response.use(
    function (response) {
        console.group("全局响应拦截")
        console.log(response)
        console.groupEnd();
        return response;
    },
    function (err) {
        return Promise.reject(err);
    }
)


export function get(url, params) {
    return axiosInstance.get(url, {params})
}

export function post(url, data) {
    return axiosInstance.post(url, data)
}

export function del(url) {
    return axiosInstance.delete(url)
}

export function put(url, data) {
    return axiosInstance.put(url, data)
}