// import $http from '../utils/http'
export const actions = {
    toggleSideBar: ({ commit }) => {
        commit('TOGGLE')
    },
    addTagViews: ({ commit }, view) => {
        commit('ADD_VIEWS', view)
    },
    delTagViews ({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_VIEWS', view)
            resolve([...state.visitedViews])
        })
    },
    delOthersViews ({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('DEL_OTHERS_VIEWS', view)
            resolve([...state.visitedViews])
        })
    },
    delAllViews ({ commit, state }) {
        return new Promise((resolve) => {
            commit('DEL_ALL_VIEWS')
            resolve([...state.visitedViews])
        })
    }
}
