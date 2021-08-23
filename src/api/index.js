import {deleteOne, get, post, updateOne} from './http'

//  判断管理员是否可以成功登录
export const getLoginStatus = (params) => post(`music/admin/login/status`, params)

export const addSinger = (params) => post(`/music/singer/add`, params)

export const getAllSinger = () => get(`/music/singer/getAllSinger`, null)

export const deleteSinger = (id) =>deleteOne (`/music/singer/delete/${id}`)

export const updateSinger = (params) => post(`/music/singer/update`, params)

