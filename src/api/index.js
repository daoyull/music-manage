import {deleteOne, get, post, updateOne} from './http'

//  判断管理员是否可以成功登录
export const getLoginStatus = (params) => post(`music/admin/login/status`, params)

export const addSinger = (params) => post(`/music/singer/add`, params)

export const getAllSinger = () => get(`/music/singer/getAllSinger`, null)

export const deleteSinger = (id) =>deleteOne (`/music/singer/delete/${id}`)

export const updateSinger = (params) => post(`/music/singer/update`, params)

export const getSongTable  = () => get(`/music/song/selectAllSong`,null)

export const getNameById = (id) =>get(`/music/song/selectNameById/${id}`)

export const addSong = (params) =>post(`/music/song/addSong`,params)

export const deleteSong = (id) =>deleteOne (`/music/song/delete/${id}`)

export const updateSong = (params) => post(`/music/song/update`, params)

export const getSongListTable = () => get(`/music/song-list/getAllSongListTable`, null)

export const getAllType = () => get(`/music/type/getAllType`, null)

export const addSongList = (params) =>post(`/music/song-list/addSongList`,params)

export const deleteSongList = (id) =>deleteOne (`/music/song-list/delete/${id}`)

export const updateSongList = (params) => post(`/music/song-list/updateSongList`, params)

export const addListSong = (parms) => post(`/music/list-song/add`,parms)

export const getAllUser = () => get(`/music/consumer/getAll`, null)

export const updateUser = (params) => post(`/music/consumer/updateUser`, params)

export const deleteUser = (id) =>deleteOne (`/music/consumer/delete/${id}`)
