// 导航链接API
import axios from "axios";


const baseURL = import.meta.env.VITE_GLOB_API_URL+"/blog";

// 获取所有公共链接
export function getAllPublicLink() {
    return axios.get(`${baseURL}/link/all`)
}

// 编辑链接信息
export function postEditLink(form) {
    return axios.post(`${baseURL}/link/edit`)
}