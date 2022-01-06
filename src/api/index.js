import axios from "axios";
import {get, post} from "../utils/request";

const baseURL = import.meta.env.VITE_GLOB_API_URL + "/blog";

// 获取文章列表
export function getBlogList(currentPage) {
    return get(`${baseURL}/blogs?currentPage=${currentPage}`)
}

// 获取点赞数最高的文章列表
export function getMostLikeList(BlogCount) {
    return axios.get(`${baseURL}/blogs/most/like/${BlogCount}`)
}

// 获取所有分类信息
export function getSortAll() {
    return axios.get(`${baseURL}/blog/sort/all`)
}

// 获取指定用户的分类信息
export function getSortByUserId(userId) {
    return axios.get(`${baseURL}/blog/sort/user/${userId}`)
}


// 获取文章信息
export function BlogDetail(blogId) {
    return axios.get(`${baseURL}/${blogId}`)
}



// 根据作者 ID 查询该作者的所有文章
export function getAuthorArticle(userId) {
    return axios.get(`${baseURL}/blog/number/${userId}`)
}


