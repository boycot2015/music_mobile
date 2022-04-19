import http from '@/api/request'

function getPlaylist(params) {
    return http('get', '/top/playlist', params)
}
function getToplist(params) {
    return http('get', '/toplist', params)
}
function getCatlist(params) {
    return http('get', '/playlist/catlist', params)
}
export {
    getPlaylist,
    getCatlist,
    getToplist
}