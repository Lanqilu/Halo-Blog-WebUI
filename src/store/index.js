import {createStore} from 'vuex'
import {getUserInfo} from "../api/login";
import defaultAvatar from '../assets/images/defaultAvatar.jpg'

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
        SET_EXPIRES_IN: (state, time) => {
            state.expires_in = time
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }

    },
    actions: {
        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    console.log(res)
                    const user = res.user
                    const avatar = user.avatar == "" ? defaultAvatar : user.avatar;

                    if (res.roles && res.roles.length > 0) { // 验证返回的 roles 是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.userName)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }
    }
})
