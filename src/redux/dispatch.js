import { changeSong, showPlayer, setIsPlay, setSongs, setUser, setIds } from './action';
import { getSongUrl } from '@/api/song';
import { Toast } from 'antd-mobile';

export function mapDispatchToProps(dispatch) {
    const onChangeSong = async (id) => {
        const song = await getSongUrl({id}).then(result => result.data[0]).catch(err => console.log(err))
        // 歌曲权限不足时，URL为空
        if (!song || !song.url) {
            Toast.show('此歌曲无权播放╮(￣▽￣"")╭')
            return false
        }
        dispatch(changeSong(song));
        return true;
    }

    const onSetSongs = ({ songs, ids }) => {
        dispatch(setSongs(songs));
        ids && dispatch(setIds(ids));
        // onChangeSong(songs[0].id);
    }

    const onChangeShowStatus = (status) => {
        dispatch(showPlayer(!status))
    }

    const onPauseOrPlay = (status) => {
        dispatch(setIsPlay(status))
    }

    const onSetUser = (status) => {
        dispatch(setUser(status))
    }

    return {
        // 当前播放歌曲
        onChangeSong,
        // 设置播放列表
        onSetSongs,
        //  展示歌曲列表
        onChangeShowStatus,
        // 播放或暂停
        onPauseOrPlay,
        // 用户登录或注销
        onSetUser
    }
}

export function mapStateToProps(state) {
    return {
        showStatus: state.showStatus,
        song: state.song,
        songs: state.songs,
        ids: state.ids,
        isPlay: state.isPlay,
        user: state.user
    }
}