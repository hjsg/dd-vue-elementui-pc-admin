import {cache} from '../utils/public'

export const mutations = {
    TOGGLE: state => {
        if (state.sidebar.opened) {
            cache('sidebarStatus', 1)
        } else {
            cache('sidebarStatus', 0)
        }
        state.sidebar.opened = !state.sidebar.opened
    },
    //  添加顶部标签(打开窗口)
    ADD_VIEWS: (state, view) => {
        if (state.visitedViews.some(item => item.path === view.path)) return
        state.visitedViews.push({
            name: view.name,
            path: view.path,
            title: view.meta.title || 'no-name',
            query: view.query,
            platform: view.meta.name
        })
    },
    //  删除顶部标签(关闭窗口)
    DEL_VIEWS: (state, view) => {
        state.visitedViews.forEach((item, index) => {
            if (item.path === view.path) {
                state.visitedViews.splice(index, 1)
            }
        })
    },
    //  关闭其他窗口
    DEL_OTHERS_VIEWS: (state, view) => {
        state.visitedViews.forEach((item, index) => {
            if (item.path === view.path) {
                state.visitedViews = state.visitedViews.slice(index, index + 1)
            }
        })
    },
    //  关闭所有窗口
    DEL_ALL_VIEWS: (state, view) => {
        state.visitedViews = []
        state.cachedViews = []
    }
}
