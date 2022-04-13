import { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import {
    getPlayLyric,
    getComment,
    getSimiPlaylist,
    getSimiSong,
    getSongUrl
} from '@/api/song'
import './style.less'
import { Popup, Toast, DotLoading, Image, NavBar } from 'antd-mobile'
import {
    useNavigate,
    useLocation
  } from 'react-router-dom'
import Actions from './modules/actions';
import CustomProgressBar from './modules/progress-bar';
import Lyric from './modules/lyric';
import PlayList from '@/pages/song';
import { formatSongTime } from '@/utils'
import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    DownOutline,
    DownFill,
    UnorderedListOutline,
    LoopOutline,
    PlayOutline
} from 'antd-mobile-icons'
import {
    PauseOutlined,
    StepBackwardFilled,
    StepForwardFilled
} from '@ant-design/icons'
function Player(props) {
    // console.log(props, 'props');
    const { onPauseOrPlay } = props;
    const { song, songs, showStatus, isPlay, onChangeShowStatus } = props;
    const currentSong = songs.find(item => item.id === song.id);
    const audioRef = useRef()
    const location = useLocation()
    const { state: query } = location
    const [loading, setLoading] = useState(true)
    const [showLyric, setShowLyric] = useState(false)
    const [showPlayer, setShowPlayer] = useState(true)
    const [showPlayList, setShowPlayList] = useState(false)
    const [state, setState] = useState({
        coverDetail: { ...songs.filter(el => song.id === el.id)[0] },
        lyric: [],
        playUrl: '',
        playlists: [],
        playerIcons: [{
            key: 'order',
            icon: <LoopOutline />,
            title: '循环播放'
        },
        {
            icon: <StepBackwardFilled />,
            key: 'prev',
            className: 'prev-icon',
            title: '上一首'
        },
        {
            icon: '',
            key: 'play',
            className: 'play-icon',
            title: '播放/暂停'
        },
        {
            icon: <StepForwardFilled />,
            key: 'next',
            className: 'next-icon',
            title: '下一首'
        },
        {
            icon: <UnorderedListOutline />,
            key: 'list',
            className: 'list-icon',
            title: '播放列表'
        }],
        audioData: {
            volume: 0.5,
            showVolume: false,
            duration: 0,
            currentTime: 0,
        }
    })
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            setShowPlayer(true)
            setShowLyric(false)
            getPlayLyric({ id: song.id }).then(lyricRes => {
                if (lyricRes.code === 200) {
                    setLoading(false)
                    let lyricList = lyricRes.lrc?.lyric?.split('\n') || []
                    let lyric = lyricList.map((el, i) => {
                        // let time = el.split(' ')[0]?.split(']')[0]?.split('[')[1]?.split(':') || ''
                        // let tempTime = time.length > 2 ? (parseInt(time[0]) * 360 + parseInt(time[1]) * 60 + parseInt(time[2])) : (parseInt(time[0]) * 60) + parseInt(time[1])
                        // return {
                        //     time: formatSongTime(tempTime),
                        //     text: el.replace(/\s*/g, "").split(']')[1]
                        // }
                            const obj = {}
                            el = (el && el.split(']')) || ''
                            if (i > 0 && el && el[1] && !el[1].includes('[')) {
                                let timeStr = el[0].split('[')[1]
                                timeStr = timeStr.split(':')
                                timeStr[1] = Math.round(timeStr[1]) + ''
                                timeStr[1] = timeStr[1] < 10 ? '0' + timeStr[1] : timeStr[1]
                                timeStr = timeStr.join(':')
                                obj.time = timeStr
                                obj.text = el[1]
                            }
                            return obj
                    }).filter(el => el.text)
                    setState({
                        ...state,
                        coverDetail: { ...songs.filter(el => song.id === el.id)[0] },
                        lyric
                    })
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [song.url])
    const initAudio = () => {
        let audio = audioRef.current;
        if (!audio) return
        // 结束-自动播放下一首
        audio.onended = () => {
            onStepSong();
        }
        // 暂停
        audio.onpause = () => {
            onPauseOrPlay(false);
        }
        // 播放
        audio.onplay = () => {
            setState({
                ...state,
                audioData: {
                    ...state.audioData,
                    currentTime: audio.currentTime,
                    duration: audio.duration
                }
            });
            audio.volume = state.audioData.volume
            onPauseOrPlay(true);
        }
        // timeupdate Event
        audio.ontimeupdate = () => {
            setState({
                ...state,
                audioData: {
                    ...state.audioData,
                    currentTime: audio.currentTime,
                    duration: audio.duration,
                }
            });
        }
    }
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
            onStepSong('', val === 'next')
        } else {
            isPlay ? audioRef.current.pause() : audioRef.current.play()
        }
    }
    const changeOrder = () => {

    }
    const onStepSong =  (currentSongIndex, next = true) => {
        // * 赋值则递归调用，否则进行初始化操作
        if (!currentSongIndex) {
            currentSongIndex = songs.findIndex((item) => item.id === song.id);
        }
        const step = next ? 1 : -1;
        const nextSong = songs[currentSongIndex + step];
        // 超出数组边界
        if (!nextSong) return Toast.show('没歌放了喔(⊙_⊙)');
        props.onChangeSong(nextSong.id)
        .then(res => {
            if (res) {
                setState({
                    ...state,
                    coverDetail: nextSong
                })
                audioRef.current.play()
            } else {
                // * 无权播放歌曲 继续播放下一首/上一首
                onStepSong(++currentSongIndex, next);
            }
            })
    }
    const { coverDetail } = state
    return !loading ? <div  className="player music-main flexbox-v align-c">
        <div
            className="mask"
            style={{
                backgroundImage: `url(${(coverDetail.al)?.picUrl})`
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
                    {coverDetail.name}
                </p>
                <p className="singer">
                    {(coverDetail.ar)?.map(el => el.name).join('/')}
                </p>
            </NavBar>
        </div>
        <div className="player-content flex4 flexbox-v align-c">
            {!showLyric ? <div onClick={() => setShowLyric(!showLyric)} className="flex4 img-cover flexbox-v align-c just-c">
                <Image width={250} height={250} className={`img ${!isPlay ? 'pause' : ''}`} src={(coverDetail.al)?.picUrl} />
            </div> : <Lyric lyric={state.lyric} {...state.audioData} onClick={() => setShowLyric(!showLyric)} >
            </Lyric>}
            <Actions />
            <CustomProgressBar
            audio={audioRef}
            {...state.audioData}
            />
            <audio src={song.url} onCanPlay={initAudio} ref={audioRef} autoPlay></audio>
        </div>
        <div className="player-footer flexbox-h align-c just-c">
            {state.playerIcons.map(item => (
                <div className={`${item.className} icon ${isPlay ? 'play' : ''}`} onClick={() => handlePlay(item)} key={item.title} title={item.title}>
                    {item.icon || (!isPlay ? <PlayOutline /> : <PauseOutlined />)}
                </div>
            ))}
        </div>
        <Popup
            visible={showPlayList}
            onMaskClick={() => {
                setShowPlayList(false)
          }}>
            <PlayList {...query}
            style={{maxHeight: 500, overflowY: 'auto', padding: '20px 0', textAlign: 'center'}}
            setPlayer={(val) => setShowPlayList(val)}
            setPlayList={(show, val, playlists) => {
                setShowPlayList(false)
                audioRef.current.pause()
                props.setPlayList && props.setPlayList(state.playlists)
            }} />
        </Popup>
    </div> : <DotLoading style={{'color': 'var(--color-white)'}} />
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);