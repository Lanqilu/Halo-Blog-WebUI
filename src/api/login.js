import {get} from "../utils/request";

const baseURL = import.meta.env.VITE_GLOB_API_URL;

// 获取用户信息
export function getUserInfo() {
    return get(`${baseURL}/system/user/getInfo`)
}