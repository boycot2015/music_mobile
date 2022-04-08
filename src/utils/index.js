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