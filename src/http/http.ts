/**
 * http配置
 */

import axios from 'axios'
import store from '../vuex/modules/login'

declare var $: any;
const AUTH_TOKEN = "dingxiaolin"
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// build http header
function buildHeader(): { [key: string]: string } {
    return { 'Content-Type': 'application/json;charset=UTF-8' }
}



export let ax = axios.create({
    baseURL: host(),
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    transformRequest: [
        function (data) {
            if (data instanceof FormData) return data
            return JSON.stringify(data)
        }
    ],
    transformResponse: [
        function (data) {
            if (data) {
                return data
            } else {
                let msg = 'Unknow Error'
                throw new Error(msg)
            }
        }
    ],
    // `onUploadProgress`允许处理上传的进度事件
    onUploadProgress: function (progressEvent) {
        // 使用本地 progress 事件做任何你想要做的
    },
    // `onDownloadProgress`允许处理下载的进度事件
    onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },
})

//ax.defaults.baseURL='http://192.168.1.107:777/csp/';
//ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
function host(): string {
    if (window.location.hostname == "localhost" || window.location.hostname.indexOf('192.168')>-1) {
       return "/api/"                //代理
       // return "http://192.168.1.107:5000/api/" //相鹏
         return "http://192.168.1.223:5000/api/"   //刘飞
        return "http://192.168.1.222:5000/api/"   //丁闻宇
    } else if (window.location.hostname == "crm.jfry.cn" || window.location.hostname == 'crm.sowl.cn'){
        return "/api/"
    } 
}


// http request 拦截器
ax.interceptors.request.use(
    config => {
        if (store.state.jwtToken) {
             config.headers.Authorization = `Bearer ${store.state.jwtToken}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
ax.interceptors.response.use(
    response => {
        if (!response.data.success) {
            // MessageBox.alert(response.data.errorMessage, '提示', {
            //     confirmButtonText: '确定'
            // })
            // throw response;
        }else{
            return response.data
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // case 401:
                //     // 401 清除token信息并跳转到登录页面
                //     // store.commit(types.LOGOUT);
                //     router.replace({
                //         path: 'login',
                //         query: {redirect: router.currentRoute.fullPath}
                //     })
            }
        }
        return Promise.reject(error.response.data)
    });

/* 手动取消请求的不显示报错 */
function handleError(err) {
    // 如果是手动取消的请求，不显示错误信息
    console.log("handleError1", err)
    if (axios.isCancel(err)) {
        // console.log(err)
    } else {
        // bootbox.alert(err)
    }
}

/* GET  */
export function Get<T>(url, data): Promise<any> {
    // `params`是要与请求一起发送的URL参数
    // 必须是纯对象或URLSearchParams对象
    return ax
        .get(url, {
            params: data
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            handleError(err)
            throw err
        })
}

/* POST */
export function Post<T>(url, data): Promise<any> {
    return ax
        .post(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            handleError(err)
            throw err
        })
}
/* PUT */
export function Put<T>(url, data): Promise<any> {
    return ax
        .put(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            handleError(err)
            throw err
        })
}
/* PATCH */
export function Patch<T>(url, data): Promise<any> {
    return ax
        .patch(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            handleError(err)
            throw err
        })
}
/* DELETE */
export function Delete<T>(url, data): Promise<any> {
    return ax
        .delete(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            handleError(err)
            throw err
        })
}

