import { useEffect, useRef, useState } from 'react'
import {
    getPlayLyric,
    getComment,
    getSimiPlaylist,
    getSimiSong,
    getSongUrl
} from '@/api/song'
import './style.less'
import { Popup, Button, DotLoading, Image, NavBar } from 'antd-mobile'
import {
    useNavigate,
    useLocation
  } from 'react-router-dom'
import Actions from './modules/actions';
import CustomProgressBar from './modules/progress-bar';
import Lyric from './modules/lyric';
import PlayList from '@/pages/song';

import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    DownOutline,
    HistogramOutline,
    DownFill,
    UnorderedListOutline,
    LoopOutline,
    PlayOutline
} from 'antd-mobile-icons'
function Player(props) {
    console.log(props, 'props');
    const audioRef = useRef()
    const location = useLocation()
    const { state: query } = location
    const [loading, setLoading] = useState(true)
    const [showLyric, setShowLyric] = useState(false)
    const [showPlayer, setShowPlayer] = useState(true)
    const [isPlay, setIsPlay] = useState(true)
    const [showPlayList, setShowPlayList] = useState(false)
    const [state, setState] = useState({
        coverDetail: { },
        lyric: [],
        playUrl: '',
        playlists: [],
        playerIcons: [{
            key: 'order',
            icon: () => <LoopOutline />,
            title: '循环播放'
        },
        {
            icon: () => <DownFill />,
            key: 'prev',
            className: 'prev-icon',
            title: '上一首'
        },
        {
            icon: (isPlay) => !isPlay ? <PlayOutline /> : '||',
            key: 'play',
            className: 'play-icon',
            title: '播放/暂停'
        },
        {
            icon: () => <DownFill />,
            key: 'next',
            className: 'next-icon',
            title: '下一首'
        },
        {
            icon: () => <UnorderedListOutline />,
            key: 'list',
            className: 'list-icon',
            title: '播放列表'
        }]
    })
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            setShowPlayer(true)
            setShowLyric(false)
            getPlayLyric({ id: props.id }).then(lyricRes => {
                if (lyricRes.code === 200) {
                    getSongUrl({ id: props.id }).then(res => {
                        setLoading(false)
                        if (res.code === 200) {
                            let lyricList = lyricRes.lrc?.lyric?.split('\n') || []
                            console.log(lyricRes, lyricList, 'lyricRes');
                            let lyric = lyricList.map(el => ({
                                time: el.split(' ')[0]?.split(']')[0]?.split('[')[1]?.split(':')[1],
                                text: el.replace(/\s*/g, "").split(']')[1]
                            })).filter(el => el.text)
                            setState({
                                ...state,
                                lyric,
                                playUrl: res?.data[0]?.url
                            })
                        }
                    })
                    setLoading(false)
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [props.id])
    const handlePlay = (type) => {
        switch (type.key) {
            case 'play':
                Play()
                break;
                case 'order':
                changeOrder()
                break;
                case 'prev':
                case 'next':
                    Play(type.key)
                break;
                case 'list':
                    setShowPlayList(!showPlayList)
                break;
            default:
                break;
        }
    }
    const Play = (val) => {
        if (val) {
            let currentIndex = state.playlists.findIndex(el => el.id === state.coverDetail.id)
            setIsPlay(true)
            audioRef.current.play()
            if (currentIndex) {
                setState({
                    ...state,
                    coverDetail: val === 'prev' ? state.playlists[currentIndex - 1] : state.playlists[currentIndex + 1]
                })
            } else {
                setIsPlay(false)
                audioRef.current.pause()
            }
            return
        }
        setIsPlay(!isPlay)
        isPlay ? audioRef.current.pause() : audioRef.current.play()
    }
    const changeOrder = () => {

    }

    return !loading ? <div  className="player music-main flexbox-v align-c">
        <div
            className="mask"
            style={{
                backgroundImage: `url(${(props.al)?.picUrl})`
            }}>
        </div>
        <div className="player-header">
            <NavBar
            back={null}
            left={<DownOutline style={{fontSize: 26}} onClick={() => {
                props.setPlayer && props.setPlayer(false)
                setShowPlayer(false)
                setState({
                    ...state,
                    coverDetail: {}
                })
            }} />}
            backArrow={false}>
                <p className="name">
                    {props.name}
                </p>
                <p className="singer">
                    {(props.ar)?.map(el => el.name).join('/')}
                </p>
            </NavBar>
        </div>
        <div className="player-content flex4 flexbox-v align-c">
            {!showLyric ? <div onClick={() => setShowLyric(!showLyric)} className="flex4 img-cover flexbox-v align-c just-c">
                <Image width={250} height={250} className='img' src={(props.al)?.picUrl} />
            </div> : <Lyric lyric={state.lyric} onClick={() => setShowLyric(!showLyric)} >
            </Lyric>}
            <Actions />
            <CustomProgressBar />
            <audio src={state.playUrl} ref={audioRef} autoPlay></audio>
        </div>
        <div className="player-footer flex1 flexbox-h align-c just-c">
            {state.playerIcons.map(item => (
                <div className={`${item.className} icon ${isPlay ? 'play' : ''}`} onClick={() => handlePlay(item)} key={item.title} title={item.title}>
                    {item.icon(isPlay)}
                </div>
            ))}
        </div>
        <Popup
            visible={showPlayList}
            destroyOnClose
            onMaskClick={() => {
                setShowPlayList(false)
          }}>
            <PlayList {...query}
            style={{maxHeight: 500, overflowY: 'auto', padding: '20px 0', textAlign: 'center'}}
            setPlayer={(val) => setShowPlayList(val)}
            setPlayList={(show, val, playlists) => {
                audioRef.current.pause()
                props.setPlayList && props.setPlayList(state.playlists)
                setShowPlayList(false)
            }} />
        </Popup>
    </div> : <DotLoading style={{'color': 'var(--color-white)'}} />
}
export default Player