import {
    Route,
    Routes,
    BrowserRouter as Router,
    Navigate
  } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import routes from '../routes'
import Header from './Header'
import Footer from './Footer'
import Player from '@/components/Player'
import FixedPlayer from '@/components/Player/modules/footer'

import './layout.less'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { Popup, Toast } from 'antd-mobile'
import { connect } from 'react-redux'

function Layout(props) {
    const audioRef = useRef()
    const [state, setState] = useState({
        audioData: {
            volume: 0.5,
            currentTime: 0,
            duration: 0
        }
    })
    const { isPlay, songs, song, onPauseOrPlay } = props
    const [showPlayer, setShowPlayer] = useState(props.showStatus)
    const { pathname } = window.location
    const currentRoute = routes.filter(el => el.key === pathname)[0]
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
            })
            onPauseOrPlay(true);
        }
        // timeupdate Event
        audio.ontimeupdate = () => {
            setState({
                ...state,
                audioData: {
                    ...state.audioData,
                    currentTime: audio.currentTime,
                    duration: audio.duration
                }
            })
        }
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
                // audioRef.current.play()
            } else {
                // * 无权播放歌曲 继续播放下一首/上一首
                onStepSong(++currentSongIndex, next);
            }
        })
    }
    useEffect(() => {
        setShowPlayer(props.showStatus)
    }, [props.showStatus])
  return (
    <Router initialEntries={['/home']}>
        <div className="music-main">
            <Header { ...songs.filter(el => song.id === el.id)[0] } { ...song } />
            <div className={'music-body'} style={{
                height: `calc(100vh - ${(currentRoute && currentRoute.showPlayer) || pathname === '/' ? '165px' : '112px'})`
            }}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/home'} />} />
                    {routes.map(el => <Route key={el.key} path={el.key} element={el.element}>
                    </Route>)}
                </Routes>
            </div>
            {((currentRoute && currentRoute.showPlayer) || pathname === '/') && <FixedPlayer {...state.audioData} audio={audioRef.current} hidePlayer={currentRoute && !currentRoute.showPlayer} setPlayer={(val) => {
                setShowPlayer(val);
            }} className={`fixed ${(currentRoute && currentRoute.hideTabBar) || pathname === '/' ? 'fixed-bottom' : ''}`} />}
            <Footer />
            <Popup
                forceRender
                visible={showPlayer}
                onMaskClick={() => {
                    setShowPlayer(false)
            }}>
                <Player audio={audioRef.current} {...state.audioData} setPlayer={(val) => setShowPlayer(val)} />
            </Popup>
            <audio src={song.url} onCanPlay={initAudio} ref={audioRef} autoPlay></audio>
        </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
