import axios from "axios";

const baseURL = "http://localhost:8088"

// 获取文章列表
export function getBlogList(currentPage) {
    return axios.get(`${baseURL}/blogs?currentPage=${currentPage}`)
}

// 获取点赞数最高的文章列表
export function getMostLikeList(BlogCount) {
    return axios.get(`${baseURL}/blog/most/like/${BlogCount}`)
}

// 获取文章信息
export function BlogDetail(blogId) {
    return axios.get(`${baseURL}/blog/${blogId}`)
}

// 获取作者信息
export function getAuthorInfo(userId) {
    return axios.post(`${baseURL}/user/userId/${userId}`)
}

// 根据作者 ID 查询该作者的所有文章
export function getAuthorArticle(userId) {
    return axios.get(`${baseURL}/blog/number/${userId}`)
}



