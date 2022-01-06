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
        }
    })

    onMounted(async () => {
        // 获取点赞数最多的文章作为幻灯片展示
        let res = await getMostLikeList(5)
        carouselData.blogs = res.data.data;
    },)


    return {carouselData}
}