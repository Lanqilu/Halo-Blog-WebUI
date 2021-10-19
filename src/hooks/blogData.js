import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {onMounted, reactive, watch} from "vue";
import {BlogDetail, getAuthorInfo} from "../api";
import {get} from "../utils/request";
import {ElMessage} from "element-plus";


export default function () {

    const route = useRoute();
    const store = useStore();

    // 进入页面 滚动条重置
    document.body.scrollTo(0, 0);

    let blog = reactive({
        info: {
            userId: null,
            blogTitle: "",
            description: "",
            content: "",
            blogLike: null,
            isShow: true,
            isLike: false,
        },
        isOwnBlog: false,
        author: {
            avatar: "",
            username: "",
            email: "",
        },
    });

    let state = reactive({
        isShowContent: true,
        treeArray: [],
        scroll: "",
    });

    const blogId = route.params.blogId;

    onMounted(async () => {
        let blogDetailRes = await BlogDetail(blogId);
        console.log("————————————————数据获取完成————————————————");

        blog.info = {...blog.info, ...blogDetailRes.data.data};

        blog.info.content = blog.info.contentHtml;

        try {
            // 判断是否是自己的文章，能否编辑
            blog.isOwnBlog = blog.info.userId === store.getters.getUser.id;
        } catch (e) {
            console.log(e);
            console.log("未登录");
        }

        let authorInfoRes = await getAuthorInfo(blog.info.userId);
        blog.author = authorInfoRes.data.data;

        getToc();
        console.log("————————————————数据挂载完成————————————————");

        blog.info.isShow = false;

        window.addEventListener("scroll", dataScroll);
    });


    // 点赞
    function giveLike() {
        get(`/blog/like/${blogId}`).then((res) => {
            if (res.data.code === 200) {
                ElMessage.success({
                    message: res.data.msg,
                    type: "success",
                });
                blog.info.blogLike = res.data.data;
            } else {
                ElMessage(res.data.msg);
            }
        });
        blog.info.isLike = true;
        document.getElementById("likeNum").setAttribute("style", "display: initial;")
    }

    function getToc() {
        let children = document.getElementById("content").children;
        for (let i = 0; i < children.length - 1; i++) {
            let nodeName = children[i].nodeName;
            if (nodeName === "H2" || nodeName === "H3" || nodeName === "H4") {
                state.treeArray.push({
                    id: children[i].id,
                    name: children[i].innerText,
                    tag: children[i].nodeName,
                });
            }
        }
    }

    // 目录显示按钮;
    function showContent() {
        state.isShowContent = !state.isShowContent;
    }

    // 回到顶部 弃用
    function toTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    //获取屏幕距离顶部的距离
    function dataScroll() {
        state.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    }

    function loadScroll() {
        let children = document.getElementById("content").children;
        let anchorId;
        for (let i = 1; i < children.length - 1; i++) {
            let nodeName = children[i].nodeName;
            if (nodeName === "H2" || nodeName === "H3" || nodeName === "H4") {
                if (children[i].offsetTop - state.scroll > 10) {
                    anchorId = children[i].id + "-halo";
                    break;
                }
            }
        }
        let tocContent = document.getElementById(anchorId);
        try {
            tocContent = tocContent.previousSibling;
        } catch {
            console.log("...");
        }

        const li = document.querySelector(".catalog-active");
        if (li) {
            li.classList.remove("catalog-active");
        }
        try {
            tocContent.classList.add("catalog-active");
        } catch {
            console.log("...");
        }
    }

    function jump(v) {
        document.getElementById(v).scrollIntoView(true);
    }

    // TODO 根据页面滑动实现目录跟随 2021年9月26日

    watch(
        () => state.scroll,
        () => {
            loadScroll();
            // console.log(state.scroll);
        }
    );

    return {
        state,
        blog,
        giveLike,
        showContent,
        toTop,
        jump,
    }

}