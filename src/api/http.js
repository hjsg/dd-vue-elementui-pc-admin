import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import request from '../utils/md5/request'
import NProgress from 'nprogress'
import router from '@/router'

function generateUUID () {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0
        d = Math.floor(d/16)
        return (c=='x' ? r : (r&0x3|0x8)).toString(36)
    })
    return uuid
}
if(!localStorage.getItem('visitorId')){
    let visitorId=generateUUID()
    localStorage.setItem('visitorId',visitorId)
}
// 请求超时时间
axios.defaults.timeout = 15000

// 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_URL
// post请求头
axios.defaults.headers.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'


// 请求拦截器
axios.interceptors.request.use(
    config => {
        if (config.loading) {
            NProgress.start()
        }
        let visitorId=''
        if(localStorage.getItem('visitorId')){
            visitorId = localStorage.getItem('visitorId')
        }else {
            visitorId=generateUUID()
            localStorage.setItem('visitorId',visitorId)
        }
        config.headers['Device-Id'] = visitorId
        return config
    },
    error => {
        return Promise.error(error)
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done()
        if (response.status === 200) {
            if (response.data.code === 403) {
                /*拦截操作*/
            }
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        NProgress.done()
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 500:
                    if (store.state.user.end != 'mo') {
                        Vue.toast('访问出错了', 'error')
                    }
                    break
            }
        }
        if (typeof error.response === 'undefined') {
            if (store.state.user.end != 'mo') {
                Vue.toast(error, 'error')
            }
        }
        return Promise.reject(error)
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function doGet(url, param) {
    let params = param || {}
    params = permission.addPermission(url, params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: request.sign(params, localStorage.getItem('visitorId')),
            loading: true
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 */
function doPost(url, param) {
    let params = param || {}
    params = permission.addPermission(url, params)
    return new Promise((resolve, reject) => {
        axios.post(url, request.sign(params, localStorage.getItem('visitorId')), {
            loading: true
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * get方法，对应get请求，没有加载条
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function getNotLoading(url, param) {
    let params = param || {}
    params = permission.addPermission(url, params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: request.sign(params, localStorage.getItem('visitorId')),
            loading: false
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })

}

/**
 * post方法，对应post请求，没有加载条
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function postNotLoading(url, param) {
    let params = param || {}
    params = permission.addPermission(url, params)
    return new Promise((resolve, reject) => {
        axios.post(url, request.sign(params, localStorage.getItem('visitorId')), {
            loading: false
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * post方法，对应post请求，入参有空值不去除
 * @param {String} url [请求的url地址]
 */
function doPostNotRemove(url, param) {
    let params = param || {}
    params = permission.addPermission(url, params)
    return new Promise((resolve, reject) => {
        axios.post(url, request.signNotRemove(params, localStorage.getItem('visitorId')), {
            loading: false
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/** 文件导出/下载Get方法
 * @表格 'xls' => 'application/vnd.ms-excel'
 * @ZIP 'zip' => 'application/zip'
 * @gif => 'image/gif',
 * @jpeg => 'image/jpeg',
 * @jpg => 'image/jpeg',
 * @png => 'image/png',
 * **/
function fileExport(url, param, resType = 'blob', methodType) {
    let params = param || {}
    params = permission.addPermission(url, params)
    let method = methodType || 'get'
    return new Promise((resolve, reject) => {
        axios[method](url, {
            params: request.sign(params),
            loading: true,
            responseType: resType
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export default {
    doPost,
    doGet,
    getNotLoading,
    postNotLoading,
    fileExport,
    doPostNotRemove
}
