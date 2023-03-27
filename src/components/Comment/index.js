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
import UserItem from '../UserItem'
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'
import { useState } from 'react'
function CommitItem(props) {
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false)
    const [state, setState] = useState({
        likedCount: props.likedCount
    })
    const { beReplied, ...params } = props
    return <div className={`music-commit-item tl ${params.className}`}>
    <UserItem {...props}></UserItem>
    <div className="bottom">
        {props.content ? <div className="content">{props.content?.trim().replace(/\s*/g, '') || '该评论已被删除'}</div> : <span style={{color: 'var(--color-ccc)'}}>该评论已被删除</span>}
        {beReplied?.length && !props.hideRepeat ? <div className="repeat" onClick={() => props.setShowRepeat && props.setShowRepeat(true)}>{beReplied?.length}条回复 <RightOutline /> </div> : null}
    </div>
</div>
}
export default CommitItem