import {getMostLikeList} from "../api";
import {reactive, onMounted} from "vue";

export default function () {
    let carouselData = reactive({
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
        let res = await getMostLikeList(5)
        carouselData.blogs = res.data.data.records;
        carouselData.currentPage = res.data.data.current;
        carouselData.total = res.data.data.total;
        carouselData.pageSize = res.data.data.size;
    },)


    return {
        carouselData
    }
}