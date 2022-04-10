import http from '@/api/request'

function getPlaylistDetail(params) {
    return http('get', '/playlist/detail', params)
}
function getSongDetail(params) {
    return http('get', '/song/detail', params)
}
// http://music.api.boycot.top/playlist/detail?id=2364025740&type=1
// http://music.api.boycot.top/song/detail?ids=
export {
    getPlaylistDetail,
    getSongDetail
}