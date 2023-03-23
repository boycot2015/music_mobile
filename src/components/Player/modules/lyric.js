import { formatSongTime, animate } from '@/utils'
import { useEffect, useRef, useState } from 'react'
function Actions(props) {
    const [state, setState] = useState({
        currentLyric: props.lyric[0]
    })
    const lyricRef = useRef(null)
    useEffect(() => {
        let currentTime = formatSongTime(props.currentTime)
        props.lyric.map((el, index) => {
            if (currentTime === el.time) {
                setState({
                    currentLyric: el
                })
                // let scrollHeight = lyricRef.current.parentNode.offsetHeight
                let topIndex = 6
                let offsetHeight = (lyricRef.current.children[0].offsetHeight + 9)
                let scrollTop = 0
                scrollTop = (index - topIndex) * offsetHeight
                if (index < topIndex) {
                    scrollTop = 0
                }
                animate(lyricRef.current, scrollTop, 'scrollTop', 1)
            }
        })
    }, [props.currentTime])
    const { currentLyric } = state
    return <div className="lyric-section flexbox-v tc" onClick={(e) => props.onClick(e)}>
        <div ref={lyricRef} className={`lyric flexbox-v tc ${props.lyric.length < 5 ? 'align-c just-c' : ''}`}>
            {
                props.lyric.length ? props.lyric.map((el, index) =>
                <div className={`lyric-item ${currentLyric.time === el.time ? 'active' : ''}`} key={index}>
                    {el.text}
                </div>
                ) : <div className="lyric-item">
                纯音乐，请欣赏~
            </div>
            }
        </div>
    </div>
}
export default Actions