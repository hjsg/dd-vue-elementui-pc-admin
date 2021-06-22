export const getters = {
    sidebar: state => state.sidebar,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    config: state => state.config
}
