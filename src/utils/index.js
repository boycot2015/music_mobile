
/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
 export const debounce = (func, wait, immediate) => {
    let timer;
    return function () {
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) func.apply(this, args)
        } else {
            timer = setTimeout(function() {
                func.apply(this, args)
            }, wait);
        }
    }
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

/**
 * 动画函数
 * @param {*} obj dom对象
 * @param {*} json 属性
 * @param {*} interval 调用间隔
 * @param {*} sp 步长
 * @param {*} fn 回调
 */
export const animate = (ele, target, attr, type) => {
    // 先清定时器
    clearInterval(ele.timer)
    function getStyle(obj, arr) {
      if (obj.currentStyle) {
        return obj.currentStyle[arr];  //针对ie
      } else {
        return document.defaultView.getComputedStyle(obj, null)[arr];
      }
    }
    ele.timer = setInterval(function () {
        // 四部
        // 1.获取步长
        let leader = 0
        if (type === 1) {
            leader = ele[attr]
        } else {
            leader = parseInt(getStyle(ele, attr)) || 0// 获取值可能含有px，我们只取数字部分parseInt()
        }
        let step = (target - leader) / 50
        // 2.二次加工步长
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        leader = leader + step
        // 3.赋值
        !type && (ele.style[attr] = leader + 'px')
        type && (ele[attr] = leader)
        // 4.清除定时器
        // console.log(target - leader, step, ele[attr])
        // Math.abs(target - leader) ||  target === leader
        if (target === leader) {
            !type && (ele.style[attr] = target + 'px')
            type === 1 && (ele[attr] = target)
            clearInterval(ele.timer)
        }
    }, 10)
}