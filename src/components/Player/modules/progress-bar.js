import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline
} from 'antd-mobile-icons'
import { Slider } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
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
    const formatTime = (time) => {
        time = parseInt(time)
        let str = '00:00:00'
        if (time < 60) {
            str = '00:00:' +  (time < 10 ? '0' + time : time)
        } else if (time >= 60 && time < 360) {
           str = '00:' + (parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)) + ':' + (time % 60 < 10 ? '0' + time % 60 : time % 60)
        } else if (time >= 360) {
            let hours =  parseInt(time / 360) < 10 ? '0' + parseInt(time / 360) : parseInt(time / 360)
            let mins =  parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)
            str = hours + ':' + mins + ':' + (time % 60 < 10 ? '0' + time % 60 : time % 60)
        }
        return str
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
            {formatTime(state.currentTime)}
            </span>
            <span className='flex1 tr'>
            {formatTime(state.duration)}
            </span>
            </div>
    </div>
}
export default CustomProgressBar