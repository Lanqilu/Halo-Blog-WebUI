import {getBlogList} from "../api";
import {reactive, onMounted} from "vue";

export default function (){

    let homeData = reactive({
        blogs: {
            id: 0,
            blogCover: "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg",
            content: "默认内容",
            created: "2021-08-08",
            description: "默认描述",
            title: "默认标题",
            userId: "默认作者"
        },
        currentPage: 1,
        total: 0,
        pageSize: 3,
    })

    onMounted(async () => {
        let res = await getBlogList(1)
        homeData.blogs = res.data.data.records
        homeData.blogs = res.data.data.records;
        homeData.currentPage = res.data.data.current;
        homeData.total = res.data.data.total;
        homeData.pageSize = res.data.data.size;
    },)

    async function changePage(currentPage) {
        let res = await getBlogList(currentPage)
        homeData.blogs = res.data.data.records;
        homeData.currentPage = res.data.data.current;
        homeData.total = res.data.data.total;
        homeData.pageSize = res.data.data.size;
    }

    return {
        homeData,
        changePage
    }
}