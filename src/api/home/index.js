import http from '@/api/request'

function getBanner(params) {
    return http('get', '/banner', params)
}
function getPersonalized(params) {
    return http('get', '/personalized', params)
}
function getPrivatecontent(params) {
    return http('get', '/personalized/privatecontent', params)
}
function getPrivatecontentList(params) {
    return http('get', '/personalized/privatecontent/list', params)
}

export {
    getBanner,
    getPersonalized,
    getPrivatecontent,
    getPrivatecontentList
}