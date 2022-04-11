import http from '@/api/request'
// http://music.api.boycot.top/playlist/detail?id=2364025740&type=1
// http://music.api.boycot.top/song/detail?ids=
function getPlaylistDetail(params) {
    return http('get', '/playlist/detail', params)
}
function getSongDetail(params) {
    return http('get', '/song/detail', params)
}
function getPlayLyric(params) {
    return http('get', '/lyric', params)
}
function getComment(params) {
    return http('get', '/comment/music', params)
}
function getSimiPlaylist(params) {
    return http('get', '/simi/playlist', params)
}
function getSimiSong(params) {
    return http('get', '/simi/song', params)
}
function getSongUrl(params = {id: ''}) {
    return http('get', 'song/url', params)
}

export {
    getPlaylistDetail,
    getSongDetail,
    getPlayLyric,
    getComment,
    getSimiPlaylist,
    getSimiSong,
    getSongUrl
}