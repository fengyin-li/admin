
import axios from "axios";
import {BASE_URL} from '../utils/config'
 
axios.defaults.timeout = 30000;
axios.defaults.baseURL = BASE_URL;
 
/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = window.localStorage.getItem('token')
        config.headers = {
            "Content-Type": "application/json; charset=utf-8",
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.status && response.status === 200) {
            return response.data
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        console.log("请求出错：", error);
        return Promise.reject(error);
    }
);
 
/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, data) {
    return axios.get(url, {params: data || {}})
}
 
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 
export function post(url, data) {
    return axios.post(url, data)
}