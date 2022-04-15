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
function CommitItem(props) {
    const navigate = useNavigate()
    const toDetail = () => {
        if (!props.showPlayer) {
            navigate('/commit', {state: {id: props.data.id}})
            return
        }
        props.showPlayer(true)
    }
    const [isLiked, setIsLiked] = useState(false)
    const [state, setState] = useState({
        likedCount: props.likedCount
    })
    const { beReplied, ...params } = props
    return <div className={`music-commit-item tl ${params.className}`}>
    <div className="top flexbox-h align-c just-between">
        <div className="avatar">
            <Image style={{borderRadius: '100%'}} width={40} height={40} src={props.user?.avatarUrl} />
        </div>
        <div className="userinfo flex4 flexbox-h">
            <div className="text flexbox-v">
                <div className="nickname">{props.user?.nickname}</div>
                <div className="time">{new Date(props.time).toLocaleString()?.split(' ')[0]?.split('/')?.join('-')}</div>
            </div>
            <div onClick={() => {
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
                </div>
        </div>
    </div>
    <div className="bottom">
        <div className="content">{props.content?.trim().replace(/\s*/g, '')}</div>
        {beReplied?.length && !props.hideRepeat ? <div className="repeat" onClick={() => props.setShowRepeat && props.setShowRepeat(true)}>{beReplied?.length}条回复 <RightOutline /> </div> : null}
    </div>
</div>
}
export default CommitItem