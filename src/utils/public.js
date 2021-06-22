/** 手机号校验 **/
function isTelPhone (value) {
    let isPhone = /^(13|14|15|17|18|16|19)\d{9}$/
    if (!isPhone.test(value)) {
        return false
    } else {
        return true
    }
}

/** 注册/找回密码校验 **/
function isPassWord (value) {
    let status = 0
    let isPwdLen = value.length >= 16 || value.length < 6
    let isTrim = /^[^\s].*[^\s]$/
    let isLetterNumber = /^(?!\d{6,8}$)(?! )(?=.*[A-Za-z])[a-zA-Z0-9_]|[^a-zA-Z0-9-=+_., *]{6,16}$/
    let test = /[`~!@#$%^&*()<>?:"{}\/;'[\]]/im
    if (isPwdLen || !isTrim.test(value)) {
        status = 1
    } else if (!isLetterNumber.test(value) && (!isLetterNumber.test(value) || test.test(value))) {
        status = 2
    } else if (test.test(value)) {
        status = 3
    } else {
        status = 0
    }
    return status
}

/** 易盾时间戳 **/
function getTimestamp(msec) {
    msec = !msec && msec !== 0 ? msec : 1
    return parseInt((new Date()).valueOf() / msec, 10)
}

/** 加载易盾js **/
function ydCodeUrl() {
    return new Promise((resolve, reject) => {
        var src = 'https://cstaticdun.126.net/load.min.js' + '?t=' + getTimestamp(1 * 60 * 1000)
        var head = document.head || document.getElementsByTagName('head')[0]
        var script = document.createElement('script')

        script.type = 'text/javascript'
        script.src = src

        if (!('onload' in script)) {
            script.onreadystatechange = function () {
                if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
                this.onreadystatechange = null
                resolve('load')
            }
        }

        script.onload = function () {
            this.onload = null
            resolve('load')
        }

        head.appendChild(script)
    })
}
/**
 * 获取缓存数据
 * @param key  缓存的名称
 * @param value 如果为null是清除缓存，为false是获取缓存，有值的话是设置值
 * @returns {*}
 */
export function cache (key, value) {
    if (arguments.length === 1) {
        value = false
    }
    if (arguments.length === 2 && value === null) {
        return localStorage.removeItem(key)
    } else if (arguments.length === 1 && value === false) {
        // 浏览器缓存一天
        const timestamp = Date.parse(new Date()) / 1000
        const cacheTime = localStorage.getItem('cacheTime')
        if (!cacheTime || timestamp - cacheTime > 86400) {
            localStorage.setItem('cacheTime', timestamp)
            return false
        }
        return JSON.parse(localStorage.getItem(key))
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
export default {
    isTelPhone,
    isPassWord,
    ydCodeUrl,
    cache
}
