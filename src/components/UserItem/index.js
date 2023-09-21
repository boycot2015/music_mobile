import { Image, Popup, List } from 'antd-mobile'
import './style.less'
import {
    LikeOutline,
    RightOutline,
} from 'antd-mobile-icons'
import {
    LikeFilled,
    LikeOutlined
} from '@ant-design/icons'
// <LikeFilled />

import {
    useNavigate,
    useLocation,
} from 'react-router-dom'
import { useState } from 'react'
function UserItem(props) {
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false)
    const [state, setState] = useState({
        likedCount: props.likedCount
    })
    const { beReplied, style, ...params } = props
    return <div className="userinfo-content flexbox-h align-c just-between" style={{...style}}>
        <div className="avatar">
            <Image style={{borderRadius: '100%'}} width={40} height={40} src={props.user?.avatarUrl || props.avatarUrl} />
        </div>
        <div className="userinfo flex4 flexbox-h">
            <div className="text flexbox-v">
                <div className="nickname">{props.user?.nickname || props?.nickname}</div>
                {props.time && <div className="time">{props.timeStr || new Date(props.time).toLocaleString()?.split(' ')[0]?.split('/')?.join('-')}</div>}
            </div>
            {state.likedCount >= 0 && <div onClick={() => {
                setIsLiked(!isLiked)
                setState({
                    ...state,
                    likedCount: !isLiked ? ++state.likedCount : --state.likedCount
                })
            }} className="liked-count flexbox-h align-c">
                {state.likedCount ? <span style={{marginRight: 5}}>{state.likedCount}</span> : null}
                {isLiked ? <LikeFilled style={{
                    color: 'var(--adm-color-primary)'
                }} fontSize={18} /> : <LikeOutlined fontSize={18} />}
            </div>}
        </div>
    </div>
}
export default UserItem