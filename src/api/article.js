import {get, post} from "../utils/request"

const baseURL = import.meta.env.VITE_GLOB_API_URL + "/system";

// 获取作者信息
export function getAuthorInfo(userId) {
    return get(`${baseURL}/user/${userId}`)
}