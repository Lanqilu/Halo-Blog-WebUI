// 导航链接API
import axios from "axios";


const baseURL = import.meta.env.VITE_GLOB_API_URL;

// 获取所有公共链接
export function getAllPublicLink() {
    return axios.get(`${baseURL}/link/all`)
}