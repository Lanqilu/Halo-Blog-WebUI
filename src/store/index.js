import {createStore} from 'vuex'

// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            // 存放全局属性
            token: "",
            userInfo: JSON.parse(localStorage.getItem("userInfo"))
        }
    },
    mutations: {
        REMOVE_INFO: (state) => {
            state.token = '',
                state.userInfo = {},
                localStorage.setItem("token", ''),
                localStorage.setItem("userInfo", JSON.stringify(''))

        },
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        },

    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }
    }
})
