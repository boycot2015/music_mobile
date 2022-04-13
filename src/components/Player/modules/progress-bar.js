import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline
} from 'antd-mobile-icons'
import { Slider } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { formatSongTime } from '@/utils'
function CustomProgressBar(props) {
    // console.log(props, 'CustomProgressBar');
    const [state, setState] = useState({
        currentTime: props.currentTime,
        duration: props.duration,
        audioLoading: false,
    });
    const onChangeTime = (val, auto) => {
        const audio = props.audio.current;
        if (audio) {
            !auto && (audio.currentTime = val);
            setState({ ...state, ...props });
        }
    }
    useEffect(() => {
        onChangeTime(props.currentTime, true)
    }, [props.currentTime])
    return <div className="progress-bar">
        <Slider
        value={state.currentTime}
        step={0.01}
        min={0}
        max={state.duration}
        onChange={value => {
            onChangeTime(value)
        }}
        style={{
          '--track-width': '2px',
          '--fill-color': 'var(--adm-color-primary)'
        }}
        />
        <div className="time flexbox-h align-c">
            <span className='flex1 tl'>
            {formatSongTime(state.currentTime)}
            </span>
            <span className='flex1 tr'>
            {formatSongTime(state.duration)}
            </span>
            </div>
    </div>
}
export default CustomProgressBar