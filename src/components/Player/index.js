import { useEffect, useState } from 'react'
import {
    getPlayLyric,
    getComment,
    getSimiPlaylist,
    getSimiSong,
    getSongUrl
} from '@/api/song'
import './style.less'
import { Grid, Button, DotLoading, Image, NavBar, ProgressBar } from 'antd-mobile'
import {
    useNavigate,
    useLocation
  } from 'react-router-dom'
import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    DownOutline,
    CloseOutline,
    DownFill,
    UnorderedListOutline,
    LoopOutline,
    PlayOutline
} from 'antd-mobile-icons'
function Player(props) {
    console.log(props, 'props');
    const location = useLocation()
    const { state: query } = location
    const [loading, setLoading] = useState(true)
    const [showLyric, setShowLyric] = useState(false)
    const [state, setState] = useState({
        coverDetail: {},
        lyric: [],
        playUrl: ''
    })
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getPlayLyric({ id: props.id }).then(lyricRes => {
                if (lyricRes.code === 200) {
                    getSongUrl({ id: props.id }).then(res => {
                        setLoading(false)
                        if (res.code === 200) {
                            let lyricList = lyricRes.lrc?.lyric?.split('\n') || []
                            let lyric = lyricList.map(el => ({
                                time: el.split(' ')[0]?.split(']')[0]?.split('[')[1]?.split(':')[1],
                                text: el.split(' ')[1]
                            })).filter(el => el.time && el.text)
                            setState({
                                ...state,
                                lyric,
                                playUrl: lyric.playlist,
                                playlists: res.songs
                            })
                        }
                    })
                    setLoading(false)
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [])
    return !loading ? <div  className="player flexbox-v align-c">
        <div
            className="mask"
            style={{
                backgroundImage: `url(${props.al?.picUrl})`
            }}>
            </div>
            <div className="player-header">
            <NavBar
            back={null}
            left={<DownOutline style={{fontSize: 26}} onClick={() => props.setPlayer && props.setPlayer(false)} />}
            backArrow={false}>
                <p className="name">
                    {props.name}
                </p>
                <p className="singer">
                    {props.ar?.map(el => el.name).join('/')}
                </p>
            </NavBar>
                </div>
        <div className="player-content flex4 flexbox-v align-c" onClick={() => setShowLyric(!showLyric)}>
            {!showLyric ? <div  className="flex4 img-cover flexbox-h align-c just-c">
                <Image  className='img' src={props.al?.picUrl} />
            </div> : <div className="lyric tc flexbox-v align-c just-c flex4">
                {
                    state.lyric.map(el =>
                    <div className="lyric-item" key={el.text}>
                        {el.text}
                    </div>
                    )
                }
            </div>}
            <div className="actions flex1 flexbox-h align-c">
                <div className="icon">
                    <HeartOutline />
                </div>
                <div className="icon">
                    <ArrowDownCircleOutline />
                </div>
                <div className="icon">
                    <MessageOutline />
                </div>
                <div className="icon">
                    <MoreOutline />
                </div>
            </div>
            <div className="progress-bar">
                <ProgressBar
                percent={50}
                style={{
                  '--track-width': '2px',
                  '--fill-color': 'var(--adm-color-primary)'
                }}
                />
            </div>
        </div>
        <div className="player-footer flex1 flexbox-h align-c just-c">
            <div className="icon">
                <LoopOutline />
            </div>
            <div className='prev-icon icon'>
                <DownFill />
            </div>
            <div className='play-icon icon'>
                <PlayOutline />
            </div>
            <div className='next-icon icon'>
                <DownFill />
            </div>
            <div className='list-icon icon'>
                <UnorderedListOutline />
            </div>
        </div>
    </div> : <DotLoading style={{'color': 'var(--color-white)'}} />
}
export default Player