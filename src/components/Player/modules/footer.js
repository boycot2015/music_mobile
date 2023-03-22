import React, { useEffect, createRef, useState } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import './footer.less'
import {
    LoopOutline,
    PlayOutline,
    CloseOutline
} from 'antd-mobile-icons'
import {
    PauseOutlined,
    StepBackwardFilled,
    StepForwardFilled,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import {
    useLocation
  } from 'react-router-dom'
import { Toast, Image, Popup } from 'antd-mobile'
import PlayList from '@/components/PlayList'
const Footer = (props, ref) => {
    const { isPlay, songs, song, ids, onPauseOrPlay, audio } = props
    const [showPlayList, setShowPlayList] = useState(false)
    const location = useLocation()
    const { state: query } = location
    const playListRef = createRef(null)
    const currentSongDetail = songs.filter(el => el.id === song.id)[0]
    const [state, setState] = useState({
        playerIcons: [{
            key: 'order',
            className: 'loop-icon',
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
            icon: <MenuUnfoldOutlined />,
            key: 'list',
            className: 'list-icon',
            title: '播放列表'
        }],
        playlists: songs
    })
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
                    setShowPlayList(true)
                    if (ids.includes(song.id)) {
                        playListRef?.current?.fetchSongs(true)
                    }
                    // console.log(playListRef.current, 'props.ids-----2');
                break;
            default:
                break;
        }
    }
    const Play = (val) => {
        if (!props.audio) {
            return
        }
        if (val) {
            onStepSong('', val === 'next')
        } else {
            isPlay ?  props.audio.pause() :  props.audio.play()
        }
    }
    const changeOrder = () => {
        Toast.show('建设中~')
    }
    const onStepSong =  (currentSongIndex, next = true) => {
        if (!songs.length) return Toast.show('没歌放了喔(⊙_⊙)');
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
            if (!res) {
                // * 无权播放歌曲 继续播放下一首/上一首
                onStepSong(++currentSongIndex, next);
            }
        })
    }
    return <div className={`player-footer flexbox-h align-c just-between ${props.className ? props.className : ''}`}>
        {props.className && props.className.includes('fixed') && <div className="img" onClick={() => song.url && props.onChangeShowStatus(false)}>
            <Image width={42} height={42} src={currentSongDetail?.al?.picUrl}/>
            </div>}
    {state.playerIcons.map(item => (
        <div className={`${item.className} icon ${isPlay ? 'play' : ''}`} onClick={() => handlePlay(item)} key={item.title} title={item.title}>
            {item.icon || (!isPlay ? <PlayOutline /> : <PauseOutlined />)}
        </div>
    ))}
    {!!songs.length && <Popup
        visible={showPlayList}
        forceRender
        destroyOnClose={true}
        bodyStyle={{
            borderRadius: '10px 10px 0 0'
        }}
        onMaskClick={() => {
            setShowPlayList(false)
        }}>
            <h3 className='title clearfix' style={{
                padding: '15px',
                fontSize: 18,
                margin: 0,
                borderBottom: '1px solid #e8e8e8'
            }}>播放列表
            <CloseOutline
            onClick={() => {
                setShowPlayList(false)
            }}
            style={{
                fontSize: 20,
            }} className='fr' />
            </h3>
        <PlayList
        ids={props.ids}
        ref={playListRef}
        setShowPlayList={() => setShowPlayList(false)}
        style={{maxHeight: 500, overflowY: 'auto', padding: '20px 0', textAlign: 'center'}}
        />
    </Popup>}
</div>
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);