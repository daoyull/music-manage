import {get, post} from './http'

//  判断管理员是否可以成功公路
export const getLoginStatus = (params) => post(`music/admin/login/status`, params)

export const getLoginStatus1 = (params) => get(`admin/login/status`, params)
