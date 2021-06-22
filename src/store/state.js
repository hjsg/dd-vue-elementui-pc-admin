import {cache} from '../utils/public'

export const state = {
    sidebar: {
        opened: !cache('sidebarStatus'),
        withoutAnimation: false
    },
    visitedViews: [],
    cachedViews: []
}
