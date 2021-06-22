import Vue from 'vue'
import Router from 'vue-router'

import home from './modules/home'

Vue.use(Router)

const routes = [
    ...home
]

const router = new Router({
    // mode: 'history',
    routes
})

export default router
