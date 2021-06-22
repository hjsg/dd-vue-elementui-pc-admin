import Vue from 'vue'
import elementUI, {Message} from 'element-ui'
// 公用样式表
import './assets/css/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './api/http'
import $public from './utils/public'
import VueCookies from 'vue-cookies'
import el from "element-ui/src/locale/lang/el";

Vue.use(VueCookies)
Vue.use(elementUI)
Vue.prototype.$http = $http
Vue.prototype.$public = $public
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    // 获取token
    let token = Vue.$cookies.get('access_token')
    // 开始进度条
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

Vue.toast = Vue.prototype.$toast = (msg, type = 'info') => {
    Message({
        showClose: true,
        message: msg,
        type: type,
        duration: 2000
    })
}
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
