import http from '@/api/request'

function getPlaylist(params) {
    return http('get', '/top/playlist', params)
}
function getCatlist(params) {
    return http('get', '/playlist/catlist', params)
}
export {
    getPlaylist,
    getCatlist
}