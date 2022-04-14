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
import { DotLoading, Image, NavBar } from 'antd-mobile'

import Actions from './modules/actions';
import CustomSlider from './modules/slider';
import Footer from './modules/footer';
import Lyric from './modules/lyric';
import {
    DownOutline
} from 'antd-mobile-icons'
function Player(props) {
    // console.log(props, 'props');
    const { song, songs, showStatus, isPlay, onChangeShowStatus } = props;
    const [loading, setLoading] = useState(true)
    const [showLyric, setShowLyric] = useState(false)
    const [state, setState] = useState({
        coverDetail: { ...songs.filter(el => song.id === el.id)[0] },
        lyric: [],
        playUrl: '',
        playlists: [],
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
            setShowLyric(false)
            getPlayLyric({ id: song.id }).then(lyricRes => {
                if (lyricRes.code === 200) {
                    setLoading(false)
                    let lyricList = lyricRes.lrc?.lyric?.split('\n') || []
                    let lyric = lyricList.map((el, i) => {
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
                props.onChangeShowStatus && props.onChangeShowStatus(true)
                props.setPlayer && props.setPlayer(false)
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
        <div className="player-content flexbox-v align-c">
            {!showLyric ? <div onClick={() => setShowLyric(!showLyric)} className="img-cover flexbox-v align-c just-c">
                <Image width={250} height={250} className={`img ${!isPlay ? 'pause' : ''}`} src={(coverDetail.al)?.picUrl} />
            </div> : <Lyric lyric={state.lyric} {...props} onClick={() => setShowLyric(!showLyric)} >
            </Lyric>}
            <Actions />
            <CustomSlider
            {...props}
            audio={props.audio}
            />
        </div>
        <Footer audio={props.audio} {...props} />
    </div> : <DotLoading style={{'color': 'var(--color-white)'}} />
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);