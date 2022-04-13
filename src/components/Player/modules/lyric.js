import { formatSongTime } from '@/utils'
function Actions(props) {
    let currentTime = formatSongTime(props.currentTime)
    const setActiveItem = (el, index) => {
        let isCanPlay = currentTime < props.lyric[0].time
        return isCanPlay || currentTime === el.time ? 'active' : ''
    }
        return <div className="lyric-cover flex4 flexbox-v tc" onClick={(e) => props.onClick(e)}>
        <div className={`lyric flexbox-v tc ${props.lyric.length < 5 && 'align-c just-c'}`}>
                {
                    props.lyric.length ? props.lyric.map((el, index) =>
                    <div className={`lyric-item ${currentTime === el.time ? 'active' : ''}`} key={index}>
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