import wx from 'weixin-js-sdk'

function is_android() {
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

function is_dd_android() {
    const u = navigator.userAgent
    return u.indexOf('ddBrowser_android') > -1
}

function is_ios() {
    const u = navigator.userAgent
    return !!u.match(/iPhone|mac|iPod|iPad|ios/i)
}

function is_dd_ios() {
    const u = navigator.userAgent
    return u.indexOf('ddBrowser_ios') > -1
}

function is_app() {
    const u = navigator.userAgent
    return u.indexOf('ddBrowser_ios') > -1 || u.indexOf('ddBrowser_android') > -1
}

function appRouteTo(url, type) { // 打开APP页面，type为true时，直接是整个url,不拼接，常用于app_path字段
    let link = ''
    if (type) {
        link = url
    } else {
        link = process.env.VUE_APP_SCHEMA + process.env.VUE_APP_DOMAIN + url
    }
    if (is_dd_android() && url) {
        window.ddNative.openPage(link)
    } else if (is_dd_ios() && url) {
        window.webkit.messageHandlers.ddNative.postMessage(link)
    }
}

function is_mini() {
    let flag = false
    const u = navigator.userAgent
    if (u.indexOf('MicroMessenger') > -1) {
        wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
                // 小程序环境下逻辑
                flag = true
            }
        })
    }

    return flag
}


export default {
    is_android,
    is_ios,
    is_dd_android,
    is_dd_ios,
    is_app,
    appRouteTo,
    is_mini
}
