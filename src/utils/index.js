
function calculateDaysBetweenDates(begin, end) {

}


/**
 * 格式化数字为 万、亿
 * @param {*} num 数字
 * @returns 格式化后的字符串
 */
export const formatNum = (num, fix = 0) => {
    if (num > 10000) {
        return (num / 10000).toFixed(fix) + '万'
    }
    if (num > 100000000) {
        return (num / 100000000).toFixed(fix) + '亿'
    }
    return num
}
/**
 * 禁用页面缩放
 */
 export const disabledScale = () => {
    const keyCodeMap = {
        // 91: true, // command
        61: true,
        107: true, // 数字键盘 +
        109: true, // 数字键盘 -
        173: true, // 火狐 - 号
        187: true, // +
        189: true // -
    }
    // 覆盖ctrl||command + ‘+’/‘-’
    document.onkeydown = function (event) {
        const e = event || window.event
        const ctrlKey = e.ctrlKey || e.metaKey
        if (ctrlKey && keyCodeMap[e.keyCode]) {
            e.preventDefault()
        } else if (e.detail) { // Firefox
            event.returnValue = false
        }
    }
    // 覆盖鼠标滑动
    document.body.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                e.preventDefault()
                return false
            }
            if (e.deltaY > 0) {
                e.preventDefault()
                return false
            }
        }
    }, { passive: false })
}

/**
 * 格式化时间
 * @param {*} time 格式化时间字符串，单位 s
 * @returns 00:00:00
 */
export const formatSongTime = (time) => {
    let min = Math.round(time) > 59 ? (Math.round(time / 60) < 10 ? ('0' + parseInt(time / 60)) : Math.round(time / 60)) : '00'
    let second = parseInt(time % 60) < 10 ? ('0' + parseInt(time % 60)) : parseInt(time % 60)
    second = second === 60 ? '00' : second
    return min + ':' + second
}